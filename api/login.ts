// /api/login.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID!);
const MEM = process.env.AIRTABLE_MEMBERS_TABLE || 'Members';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Airtable formulas use double quotes for strings.
// Escape any double quotes in the email just in case.
const esc = (s: string) => s.replace(/"/g, '\\"');

function isActive(subscriptionStatus: any, subEnd: any) {
  const status = (typeof subscriptionStatus === 'string') ? subscriptionStatus : '';
  if (status !== 'Active') return false;
  if (!subEnd) return true; // no end date = active
  const end = new Date(subEnd as string);
  end.setHours(23, 59, 59, 999);
  return end.getTime() >= Date.now();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

    const emailLc = email.trim().toLowerCase();

    // Find by Email Address (case-insensitive)
    const records = await base.table(MEM).select({
      maxRecords: 1,
      filterByFormula: `LOWER({Email Address}) = "${esc(emailLc)}"`
    }).firstPage();

    if (!records.length) return res.status(401).json({ error: 'Invalid credentials' });

    const m = records[0];
    const hash = (m.get('passwordHash') || '') as string;
    if (!hash) return res.status(401).json({ error: 'Account not configured' });

    const ok = await compare(password, hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // Enforce subscription state
    const status = m.get('Subscription Status');
    const subEnd = m.get('Subscription End');
    if (!isActive(status, subEnd)) {
      return res.status(403).json({ error: 'Subscription inactive or expired' });
    }

    // Update Last Login (non-fatal if it fails)
    try {
      await base.table(MEM).update(m.id, { 'Last Login': new Date().toISOString() });
    } catch {}

    // Issue JWT
    const token = await new SignJWT({ sub: m.id, email: emailLc })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer('clinicalrxq')
      .setAudience('member')
      .setExpirationTime('1h')
      .sign(JWT_SECRET);

    // HttpOnly cookie (note: Secure cookies require HTTPS; test on deployed site)
    res.setHeader('Set-Cookie', `crxq_token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`);

    return res.status(200).json({ memberId: m.id, email: emailLc });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
