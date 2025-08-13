/**
 * Minimal Airtable REST client using fetch, with Table ID and Field ID usage.
 * - Uses returnFieldsByFieldId=true to return fields keyed by Field IDs.
 * - Reads PAT from localStorage (see getAirtableToken).
 * - Provides helpers to list records, get a single record, list by IDs, and aggregate paginated results.
 */

import { AIRTABLE_BASE_ID, getAirtableToken } from '../config/airtableConfig';

/** Basic Airtable list response typed generically by fields object shape keyed by Field IDs */
export interface AirtableRecord<TFields = Record<string, unknown>> {
  id: string;
  createdTime: string;
  fields: TFields;
}

interface ListResponse<TFields> {
  records: AirtableRecord<TFields>[];
  offset?: string;
}

/**
 * Build Airtable API URL for a table
 */
function buildTableUrl(
  tableId: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  const sp = new URLSearchParams();
  // Always return fields keyed by Field IDs
  sp.set('returnFieldsByFieldId', 'true');
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) sp.append(k, String(v));
    });
  }
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}?${sp.toString()}`;
}

/**
 * Build Airtable API URL for a single record
 */
function buildRecordUrl(
  tableId: string,
  recordId: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  const sp = new URLSearchParams();
  sp.set('returnFieldsByFieldId', 'true');
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) sp.append(k, String(v));
    });
  }
  const query = sp.toString();
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableId}/${recordId}?${query}`;
}

/**
 * Perform an authorized request to Airtable.
 */
async function airtableFetch<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const token = getAirtableToken();
  if (!token) {
    throw new Error('Airtable PAT not found. Set it with localStorage.setItem("AIRTABLE_PAT", "your_pat").');
  }
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Airtable error ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/**
 * List records from a table. Supports pagination via offset.
 * Use returnFieldsByFieldId=true so fields are keyed by Field IDs.
 */
export async function listRecords<TFields = Record<string, unknown>>(opts: {
  tableId: string;
  pageSize?: number;
  offset?: string;
  filterByFormula?: string;
  fields?: string[]; // Note: with returnFieldsByFieldId=true, Airtable accepts Field IDs here
  view?: string;
  sort?: { field: string; direction?: 'asc' | 'desc' }[];
}): Promise<ListResponse<TFields>> {
  const params: Record<string, string> = {};
  if (opts.pageSize) params['pageSize'] = String(opts.pageSize);
  if (opts.offset) params['offset'] = String(opts.offset);
  if (opts.filterByFormula) params['filterByFormula'] = opts.filterByFormula;
  if (opts.view) params['view'] = opts.view;
  if (opts.sort && opts.sort.length) {
    opts.sort.forEach((s, i) => {
      params[`sort[${i}][field]`] = s.field;
      if (s.direction) params[`sort[${i}][direction]`] = s.direction;
    });
  }

  // Build URL first
  let url = buildTableUrl(opts.tableId, params);
  // Append fields[]=... (Field IDs) if provided
  if (opts.fields?.length) {
    const append = opts.fields.map((f) => `fields[]=${encodeURIComponent(f)}`).join('&');
    url = `${url}&${append}`;
  }

  return airtableFetch<ListResponse<TFields>>(url);
}

/**
 * Fetch multiple records by their record IDs using a filterByFormula OR(RECORD_ID()='id1', ...)
 */
export async function listRecordsByIds<TFields = Record<string, unknown>>(opts: {
  tableId: string;
  recordIds: string[];
  fields?: string[];
}): Promise<ListResponse<TFields>> {
  if (!opts.recordIds.length) return { records: [] };
  const formula = `OR(${opts.recordIds.map((id) => `RECORD_ID()='${id}'`).join(',')})`;
  return listRecords<TFields>({
    tableId: opts.tableId,
    filterByFormula: formula,
    fields: opts.fields,
    pageSize: 100,
  });
}

/**
 * Get a single record by Record ID using Airtable's GET record endpoint.
 * More efficient and idiomatic than using filterByFormula for a single id.
 */
export async function getRecord<TFields = Record<string, unknown>>(opts: {
  tableId: string;
  recordId: string;
  fields?: string[];
}): Promise<AirtableRecord<TFields>> {
  let url = buildRecordUrl(opts.tableId, opts.recordId);
  // Add fields[]=... if provided
  if (opts.fields?.length) {
    const append = opts.fields.map((f) => `fields[]=${encodeURIComponent(f)}`).join('&');
    url = `${url}&${append}`;
  }
  return airtableFetch<AirtableRecord<TFields>>(url);
}

/**
 * List all records across pages (transparent pagination).
 * Optional maxRecords to cap total returned count.
 */
export async function listAllRecords<TFields = Record<string, unknown>>(opts: {
  tableId: string;
  pageSize?: number;
  maxRecords?: number;
  filterByFormula?: string;
  fields?: string[];
  view?: string;
  sort?: { field: string; direction?: 'asc' | 'desc' }[];
}): Promise<AirtableRecord<TFields>[]> {
  const pageSize = Math.min(Math.max(opts.pageSize || 100, 1), 100);
  let offset: string | undefined = undefined;
  const out: AirtableRecord<TFields>[] = [];

  // Loop through pages until offset ends or maxRecords reached
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await listRecords<TFields>({
      tableId: opts.tableId,
      pageSize,
      offset,
      filterByFormula: opts.filterByFormula,
      fields: opts.fields,
      view: opts.view,
      sort: opts.sort,
    });
    out.push(...res.records);
    if (opts.maxRecords && out.length >= opts.maxRecords) {
      return out.slice(0, opts.maxRecords);
    }
    if (!res.offset) break;
    offset = res.offset;
  }
  return out;
}

/**
 * POST-based listRecords for cases where the query string might exceed length limits
 * (e.g., very long filterByFormula). Mirrors Airtable's /listRecords POST.
 */
export async function listRecordsPOST<TFields = Record<string, unknown>>(opts: {
  tableId: string;
  body: {
    pageSize?: number;
    maxRecords?: number;
    offset?: string;
    filterByFormula?: string;
    view?: string;
    sort?: { field: string; direction?: 'asc' | 'desc' }[];
    fields?: string[];
    cellFormat?: 'json' | 'string';
    timeZone?: string;
    userLocale?: string;
    returnFieldsByFieldId?: boolean;
  };
}): Promise<ListResponse<TFields>> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${opts.tableId}/listRecords`;
  const bodyWithIds = {
    returnFieldsByFieldId: true,
    ...opts.body,
  };
  return airtableFetch<ListResponse<TFields>>(url, {
    method: 'POST',
    body: JSON.stringify(bodyWithIds),
  });
}

/**
 * Utility to safely read an attachment array (id, url, filename are guaranteed per Airtable note).
 */
export type SimpleAttachment = { id: string; url: string; filename: string };

/**
 * Safely extract attachment objects from a field value.
 */
export function getAttachmentArray(fieldValue: unknown): SimpleAttachment[] {
  if (!Array.isArray(fieldValue)) return [];
  return fieldValue
    .map((a) => {
      if (a && typeof a === 'object') {
        const id = (a as any).id as string | undefined;
        const url = (a as any).url as string | undefined;
        const filename = (a as any).filename as string | undefined;
        if (id && url && filename) return { id, url, filename };
      }
      return null;
    })
    .filter(Boolean) as SimpleAttachment[];
}
