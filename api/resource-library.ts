/**
 * Vercel Serverless Function: Resource Library
 * - GET /api/resource-library?cat=handouts|clinical|billing&q=...
 * - Aggregates across Airtable tables into a unified library:
 *   - PatientHandouts     -> category "handouts"
 *   - ClinicalGuidelines  -> category "clinical"
 *   - MedicalBillingResources -> category "billing"
 *
 * Security:
 * - Reads AIRTABLE_API_KEY and AIRTABLE_BASE_ID from environment. Never expose to client.
 */

import type { IncomingMessage, ServerResponse } from 'http';
const Airtable = require('airtable');

interface AirtableAttachment {
  url: string;
  filename?: string;
}

function firstAttachmentUrl(attachments: unknown): string | undefined {
  const list = (attachments as AirtableAttachment[]) || [];
  if (Array.isArray(list) && list.length > 0 && list[0]?.url) return list[0].url;
  return undefined;
}

function getQuery(req: any): Record<string, string | undefined> {
  const url = new URL(req.url || '', 'http://localhost');
  const params: Record<string, string | undefined> = {};
  url.searchParams.forEach((v, k) => (params[k] = v));
  return params;
}

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  try {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        error: 'Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in your Vercel project.',
      }));
      return;
    }

    const { cat, q } = getQuery(req);
    const filterCat = (cat || '').toLowerCase();
    const qlc = (q || '').toLowerCase();
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

    // Helper: fetch one table mapped to a category
    async function fetchTable(table: string, nameField: string, fileField: string, linkField?: string) {
      const records = await base(table)
        .select({
          fields: [nameField, fileField, linkField || ''],
          pageSize: 100,
        })
        .all();
      return records.map((r: any) => {
        const name = (r.get(nameField) as string) || '';
        const link = (linkField ? (r.get(linkField) as string) : undefined) || firstAttachmentUrl(r.get(fileField));
        return { id: r.id, name, url: link };
      });
    }

    const results: Array<{ id: string; name: string; category: 'handouts' | 'clinical' | 'billing'; url?: string }> = [];

    // Decide which tables to query based on category filter
    const doHandouts = !filterCat || filterCat === 'handouts';
    const doClinical = !filterCat || filterCat === 'clinical';
    const doBilling = !filterCat || filterCat === 'billing';

    const [handouts, clinical, billing] = await Promise.all([
      doHandouts ? fetchTable('PatientHandouts', 'handoutName', 'handoutFile') : Promise.resolve([]),
      doClinical ? fetchTable('ClinicalGuidelines', 'guidelineName', 'guidelineFile', 'guidelineLink') : Promise.resolve([]),
      doBilling ? fetchTable('MedicalBillingResources', 'billingresourceName', 'billingresourceFile') : Promise.resolve([]),
    ]);

    handouts.forEach((r) => results.push({ ...r, category: 'handouts' }));
    clinical.forEach((r) => results.push({ ...r, category: 'clinical' }));
    billing.forEach((r) => results.push({ ...r, category: 'billing' }));

    // Simple client-side text filter
    const filtered = qlc
      ? results.filter((r) => `${r.name} ${r.category}`.toLowerCase().includes(qlc))
      : results;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ items: filtered }));
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('API /resource-library error:', err?.message || err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
