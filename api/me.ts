// /api/me.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const cookie = req.headers.cookie || '';
    const token = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('crxq_token='))?.split('=')[1];
    if (!token) return res.status(401).json({ error: 'No session' });

    const { payload } = await jwtVerify(token, JWT_SECRET, { issuer: 'clinicalrxq', audience: 'member' });

    return res.status(200).json({
      memberId: payload.sub,
      email: payload.email,
      exp: payload.exp
    });
  } catch {
    return res.status(401).json({ error: 'Invalid session' });
  }
}
