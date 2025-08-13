// /api/logout.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', 'crxq_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax; Secure');
  res.status(200).json({ ok: true });
}
