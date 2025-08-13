// /api/login.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import Airtable from 'airtable';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';

// Environment variables for Airtable configuration
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_MEMBERS_TABLE_ID = process.env.AIRTABLE_MEMBERS_TABLE_ID;
const AIRTABLE_EMAIL_FIELD_ID = process.env.AIRTABLE_EMAIL_FIELD_ID;
const AIRTABLE_PW_HASH_FIELD_ID = process.env.AIRTABLE_PW_HASH_FIELD_ID;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Helper to check if subscription is active
function isActive(subscriptionStatus: any, subEnd: any) {
  const status = (typeof subscriptionStatus === 'string') ? subscriptionStatus : '';
  if (status !== 'Active') return false;
  if (!subEnd) return true; // no end date = active
  const end = new Date(subEnd as string);
  end.setHours(23, 59, 59, 999);
  return end.getTime() >= Date.now();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for required environment variables
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_MEMBERS_TABLE_ID || !AIRTABLE_EMAIL_FIELD_ID || !AIRTABLE_PW_HASH_FIELD_ID) {
    return res.status(500).json({ error: 'Server configuration error. Missing Airtable variables.' });
  }

  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const emailLc = email.trim().toLowerCase();
    const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

    // Find user by email using the specific Field ID
    const records = await base.table(AIRTABLE_MEMBERS_TABLE_ID).select({
      maxRecords: 1,
      filterByFormula: `LOWER({${AIRTABLE_EMAIL_FIELD_ID}}) = "${emailLc.replace(/"/g, '\\"')}"`,
      // Request only the fields we need
      fields: [AIRTABLE_PW_HASH_FIELD_ID, 'subscriptionStatus', 'subscriptionEnd']
    }).firstPage();

    if (!records.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const memberRecord = records[0];
    const hash = (memberRecord.get(AIRTABLE_PW_HASH_FIELD_ID) || '') as string;
    
    if (!hash) {
      return res.status(401).json({ error: 'Account not configured for login' });
    }

    const isPasswordValid = await compare(password, hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Enforce subscription state using CORRECTED field names
    const status = memberRecord.get('subscriptionStatus');
    const subEnd = memberRecord.get('subscriptionEnd');
    if (!isActive(status, subEnd)) {
      return res.status(403).json({ error: 'Subscription inactive or expired' });
    }

    // Update Last Login (non-fatal if it fails)
    try {
      await base.table(AIRTABLE_MEMBERS_TABLE_ID).update(memberRecord.id, { 'Last Login': new Date().toISOString() });
    } catch (updateError) {
      console.warn('Failed to update Last Login time:', updateError);
    }

    // Issue JWT
    const token = await new SignJWT({ sub: memberRecord.id, email: emailLc })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer('clinicalrxq')
      .setAudience('member')
      .setExpirationTime('1h')
      .sign(JWT_SECRET);

    // Set HttpOnly cookie
    res.setHeader('Set-Cookie', `crxq_token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`);

    return res.status(200).json({ memberId: memberRecord.id, email: emailLc });

  } catch (e: any) {
    console.error('Login API error:', e);
    return res.status(500).json({ error: e?.message || 'A server error occurred' });
  }
}
