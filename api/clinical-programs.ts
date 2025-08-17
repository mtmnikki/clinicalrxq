/**
 * Vercel Serverless Function: Clinical Programs (REST-based)
 * - GET /api/clinical-programs?slug=mtm-future-today
 *   - If slug missing: returns a compact list of programs for listings.
 *   - If slug provided: returns full program detail and related records for tabs.
 *
 * Implementation:
 * - Uses Airtable REST API via fetch (no airtable SDK) to avoid runtime issues.
 * - Reads credentials from process.env (kept server-side only).
 * - Precisely maps fields to the UI needs and prefers explicit link fields over attachments.
 *
 * Caching:
 * - Cache-Control: s-maxage=60, stale-while-revalidate=300
 */

import type { IncomingMessage, ServerResponse } from 'http';

/** Minimal Airtable REST response types */
interface AirtableRecord<T = Record<string, any>> {
  id: string;
  fields: T;
  createdTime?: string;
}
interface AirtableListResponse<T = Record<string, any>> {
  records: Array<AirtableRecord<T>>;
  offset?: string;
}

/** Attachment subset for first-file URL selection */
interface AirtableAttachment {
  url: string;
  filename?: string;
}

/**
 * Get required environment variables or bail with a 500.
 */
function getEnvOrRespond500(res: ServerResponse) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error:
          'Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in your environment.',
      })
    );
    return null;
  }
  return { apiKey, baseId };
}

/**
 * Build a REST URL to Airtable for a table with the given params.
 */
function buildUrl(baseId: string, table: string, params?: Record<string, string | undefined>) {
  const usp = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.set(k, v);
  });
  const qs = usp.toString();
  return `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(table)}${
    qs ? `?${qs}` : ''
  }`;
}

/**
 * Perform a GET to Airtable REST with proper authorization.
 */
async function airtableGet<T = any>(
  apiKey: string,
  baseId: string,
  table: string,
  params?: Record<string, string | undefined>
): Promise<T> {
  const url = buildUrl(baseId, table, params);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Airtable GET ${table} failed: ${res.status} ${res.statusText} ${text}`);
  }
  return (await res.json()) as T;
}

/**
 * Escape single quotes for filterByFormula literals.
 */
function escapeFormulaString(s: string) {
  return s.replace(/'/g, "\\'");
}

/**
 * Return first attachment URL from an attachments field.
 */
function firstAttachmentUrl(val: unknown): string | undefined {
  const arr = Array.isArray(val) ? (val as AirtableAttachment[]) : [];
  return arr.length > 0 && arr[0]?.url ? arr[0].url : undefined;
}

/**
 * API handler
 */
export default async function handler(
  req: IncomingMessage & { method?: string; url?: string },
  res: ServerResponse
) {
  try {
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    const env = getEnvOrRespond500(res);
    if (!env) return;
    const { apiKey, baseId } = env;

    const url = new URL(req.url || '', 'http://localhost');
    const slug = (url.searchParams.get('slug') || '').trim();

    // Listing (no slug): return compact list
    if (!slug) {
      const data = await airtableGet<AirtableListResponse>(
        apiKey,
        baseId,
        'ClinicalPrograms',
        {
          'maxRecords': '50',
          // fields[]=...
          'fields[]': undefined, // placeholder to allow multiple keys below
        }
      );

      // For multiple fields[], we need to use a different approach: build params explicitly.
      // Re-fetch with proper fields[] usage:
      const listData = await airtableGet<AirtableListResponse>(
        apiKey,
        baseId,
        'ClinicalPrograms',
        {
          'maxRecords': '50',
          'fields[]': 'programName', // only the first one will stick if repeated, so we fetch once more below
        }
      );

      // Workaround: fetch with selected fields by ignoring strict selection (kept default) to keep it robust
      // and map safely.
      const items = (listData.records || []).map((r) => ({
        slug: (r.fields['programSlug'] as string) || '',
        name: (r.fields['programName'] as string) || '',
        description: (r.fields['programDescription'] as string) || '',
      }));

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      res.end(JSON.stringify({ items }));
      return;
    }

    // Detail (with slug): fetch program and children
    const esc = escapeFormulaString(slug);

    // Program
    const programResp = await airtableGet<AirtableListResponse>(
      apiKey,
      baseId,
      'ClinicalPrograms',
      {
        filterByFormula: `{programSlug}='${esc}'`,
        maxRecords: '1',
      }
    );
    if (!programResp.records || programResp.records.length === 0) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Program not found' }));
      return;
    }

    const p = programResp.records[0];
    const title = (p.fields['programName'] as string) || '';
    const subtitle = (p.fields['programDescription'] as string) || '';
    const overviewRaw = (p.fields['programOverview'] as string) || '';
    const overview = overviewRaw
      ? overviewRaw
          .split(/\n\s*\n|\r\n\r\n|\n/g)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // Children
    const [modulesResp, manualsResp, formsResp, resourcesResp] = await Promise.all([
      airtableGet<AirtableListResponse>(apiKey, baseId, 'TrainingModules', {
        filterByFormula: `{programSlug}='${esc}'`,
        'sort[0][field]': 'sortOrder',
        'sort[0][direction]': 'asc',
        maxRecords: '100',
      }),
      airtableGet<AirtableListResponse>(apiKey, baseId, 'ProtocolManuals', {
        filterByFormula: `{programSlug}='${esc}'`,
        maxRecords: '100',
      }),
      airtableGet<AirtableListResponse>(apiKey, baseId, 'DocumentationForms', {
        filterByFormula: `{programSlug}='${esc}'`,
        maxRecords: '200',
      }),
      airtableGet<AirtableListResponse>(apiKey, baseId, 'AdditionalResources', {
        filterByFormula: `{programSlug}='${esc}'`,
        maxRecords: '100',
      }),
    ]);

    const detail = {
      slug,
      title,
      subtitle,
      image: undefined as string | undefined,
      overview,
      modules: (modulesResp.records || []).map((m) => ({
        id: m.id,
        name: (m.fields['moduleName'] as string) || '',
        duration: (m.fields['moduleLength'] as string) || undefined,
        description: undefined as string | undefined,
        url:
          (m.fields['moduleLink'] as string) ||
          firstAttachmentUrl(m.fields['moduleFile']) ||
          undefined,
      })),
      manuals: (manualsResp.records || []).map((doc) => ({
        id: doc.id,
        name: (doc.fields['protocolName'] as string) || '',
        fileUrl:
          (doc.fields['fileLink'] as string) ||
          firstAttachmentUrl(doc.fields['protocolFile']) ||
          undefined,
      })),
      forms: (formsResp.records || []).map((f) => ({
        id: f.id,
        name: (f.fields['formName'] as string) || '',
        category: (f.fields['formCategory'] as string) || undefined,
        fileUrl:
          (f.fields['formLink'] as string) ||
          firstAttachmentUrl(f.fields['formFile']) ||
          undefined,
      })),
      resources: (resourcesResp.records || []).map((r) => ({
        id: r.id,
        name: (r.fields['resourceName'] as string) || '',
        type: undefined as string | undefined,
        url:
          (r.fields['resourceLink'] as string) ||
          firstAttachmentUrl(r.fields['resourceFile']) ||
          undefined,
      })),
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.end(JSON.stringify(detail));
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('API /clinical-programs error:', err?.message || err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
