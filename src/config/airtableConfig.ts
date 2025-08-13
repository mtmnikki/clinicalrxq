/**
 * Airtable configuration (Base ID, Table IDs, Field IDs) and token retrieval
 * - We strictly use Table IDs and Field IDs for API calls.
 * - For ProgramDetail, we avoid formulas by requiring an Airtable record ID in the route param.
 * - Attachment URLs from Airtable expire (~2 hours) and should not be persisted.
 */

export const AIRTABLE_BASE_ID = 'applrV1CPpt6GuK2d' as const;

/**
 * DEV ONLY FALLBACK PAT — for preview convenience. Replace/remove before production.
 * You can override at runtime via:
 *   localStorage.setItem('AIRTABLE_PAT', 'your_pat_here')
 * or inject:
 *   window.__AIRTABLE_PAT__ = 'your_pat_here'
 */
const DEV_FALLBACK_PAT =
  'paty7PGh33w7u2pqE.7f7fc23fb5560974eabf76ca6c14ec488deefc603e0b72fae3342e9668f190c5';

/**
 * Read Airtable PAT at runtime with safe fallbacks.
 */
export function getAirtableToken(): string | null {
  try {
    const ls = localStorage.getItem('AIRTABLE_PAT');
    if (ls && typeof ls === 'string' && ls.trim()) return ls.trim();
  } catch {
    // ignore
  }
  // @ts-expect-error optional window injection
  if (typeof window !== 'undefined' && window.__AIRTABLE_PAT__) {
    // @ts-expect-error optional window injection
    return String(window.__AIRTABLE_PAT__);
  }
  return DEV_FALLBACK_PAT || null;
}

/**
 * Table IDs (provided)
 */
export const TABLE_IDS = {
  programs: 'tblCTUDN0EQWo1jAl',             // Clinical Programs
  programAssets: 'tblv2zjkV56qi7sAG',        // Clinical Program Assets (a.k.a. Clinical Program Resources)
  additionalResources: 'tblILyb6MLSNnuatA',  // Additional Resources
  members: 'tblsxymfQsAnyg5OU',              // Members (not used in UI here)
  assetTags: 'tbl9kv0Kqe9McE9Yk',            // Asset Tags (not used in UI here)

  // New: Linked lookup tables used for ID→name resolution
  resourceTypes: 'tblkijrEI0c3PFQTl',        // Resource Types
  categories: 'tblORRjkAJXQTaSN8',           // Category
} as const;

/**
 * Field IDs grouped by table
 */
export const FIELD_IDS = {
  programs: {
    name: 'fldcA9E0TK9mq3W7I',                // Program_Name (singleLineText)
    description: 'fldLOY6tn3gpumgOY',         // Program_Description (multilineText)
    assetsLink: 'fldoE57JDMA4HV1M0',          // Clinical Program Assets (links)
    level: 'fldS5Yug9jIbGYY5I',               // Experience_Level (multiSelect)
    photo: 'fldvmCsjZMJlDUhLW',               // Program Photo (attachments)
    totalResourcesRollup: 'fldhz2EQvfaWv7wMb',// Total Resources (rollup)
    summary: 'fld1LEc2OrpuTLcv3',             // Program Summary (aiText)
    needsAnalysis: 'fldGiZUckwFyDyiAb',       // Resource Needs Analysis (aiText)
    assetTagsLink: 'fldCOwKQ4b4QKuQdZ',       // Asset Tags (links)
    sortOrder: 'fldRzkc9e3EeVMtS6',           // Sort Order (number)
  },
  programAssets: {
    fileName: 'fldWT6d38iUXQodCM',            // Clinical Program Asset File Name (text)
    assetType: 'fldGO6zeMsv360Eqd',           // Resource Type (linked records → Resource Types)
    programLink: 'fldOSOCiH17yJAVRK',         // Clinical Program (links)
    file: 'fldgb17ZX1YPDwv4A',                // File (attachments)
    docCategory: 'flduFALyi44YYTwnk',         // Documentation Form Category (linked record → Category)
    docSubcategory: 'fldG4VMqUdV1nAMql',      // Documentation Form Subcategory (singleSelect)
    assetTagsLink: 'fldnXwQVfswSXvbHk',       // Asset Tags (links)
    programSortLookup: 'fldNEAQpCM6Is0Ynm',   // Clinical Program Sort Order (lookup)
  },
  additionalResources: {
    category: 'fldWWBYmUN4RUVDpC',            // Category (linked record → Category)
    type: 'fldKxm2MOiCuWPsTy',                // Resource Type (linked record → Resource Types)
    fileName: 'fldsvKDnR7O8Xidkp',            // Additional Resource File Name (text)
    assetTagsLink: 'flduAZqYLef59WMjN',       // Asset Tags (links)
    attachment: 'fldLt3X7SdMX0hvXF',          // Additional Resource File (attachments)
  },

  // New: Primary fields for lookup tables
  resourceTypes: {
    name: 'fldcqlx5D0uTBihCB',                // Resource Type (primary)
  },
  categories: {
    name: 'fldpJOf0nnAputAjU',                // Category Name (primary)
  },
} as const;
