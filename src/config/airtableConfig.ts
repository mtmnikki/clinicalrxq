/**
 * Airtable configuration (Base ID, Table IDs, Field IDs) and token retrieval
 * - CORRECTED to match the user's provided schema.
 * - We strictly use Table IDs and Field IDs for API calls.
 */

export const AIRTABLE_BASE_ID = 'applrV1CPpt6GuK2d' as const;

/**
 * DEV ONLY FALLBACK PAT — for preview convenience. Replace/remove before production.
 * You can override at runtime via:
 * localStorage.setItem('AIRTABLE_PAT', 'your_pat_here')
 * or inject:
 * window.__AIRTABLE_PAT__ = 'your_pat_here'
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
 * Table IDs (from schema)
 */
export const TABLE_IDS = {
  programs: 'tblCTUDN0EQWo1jAl',
  programAssets: 'tblv2zjkV56qi7sAG',
  additionalResources: 'tblILyb6MLSNnuatA',
  members: 'tblsxymfQsAnyg5OU',
  assetTags: 'tbl9kv0Kqe9McE9Yk',
  resourceTypes: 'tblkijrEI0c3PFQTl',
  categories: 'tblORRjkAJXQTaSN8',
} as const;

/**
 * Field IDs grouped by table (CORRECTED based on schema)
 */
export const FIELD_IDS = {
  programs: {
    name: 'fldcA9E0TK9mq3W7I',          // programName
    description: 'fldLOY6tn3gpumgOY',   // programDescription
    assetsLink: 'fldoE57JDMA4HV1M0',    // Clinical Program Assets
    level: 'fldS5Yug9jIbGYY5I',         // Experience_Level
    photo: 'fldvmCsjZMJlDUhLW',         // Program Photo
    summary: 'fld1LEc2OrpuTLcv3',       // Program Summary
    sortOrder: 'fldRzkc9e3EeVMtS6',     // Sort Order
  },
  programAssets: {
    fileName: 'fldWT6d38iUXQodCM',      // Clinical Program Asset File Name
    assetType: 'fldGO6zeMsv360Eqd',     // Resource Type
    programLink: 'fldOSOCiH17yJAVRK',   // Clinical Program
    file: 'fldgb17ZX1YPDwv4A',          // File
    docCategory: 'flduFALyi44YYTwnk',   // Documentation Form Category
    docSubcategory: 'fldG4VMqUdV1nAMql',// Documentation Form Subcategory
    programSortLookup: 'fldNEAQpCM6Is0Ynm', // Clinical Program Sort Order
  },
  additionalResources: {
    category: 'fldWWBYmUN4RUVDpC',      // Category
    type: 'fldKxm2MOiCuWPsTy',          // Resource Type
    fileName: 'fldsvKDnR7O8Xidkp',      // Additional Resource File Name
    attachment: 'fldLt3X7SdMX0hvXF',    // Additional Resource File
  },
  members: {
    username: 'fldxleZ40yO5YZcn',       // username
    email: 'fldIlVo3Jao2S2yNu',         // Email Address
    passwordHash: 'fldm5mYvdmlB0rYMy',  // passwordHash
  },
  resourceTypes: {
    name: 'fldcqlx5D0uTBihCB',          // Resource Type (primary)
  },
  categories: {
    name: 'fldpJOf0nnAputAjU',          // Category Name (primary)
  },
} as const;
