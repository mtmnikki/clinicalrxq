/**
 * Program detail page (ID-first, display-name-second)
 * - Logic unchanged: ID-first classification with name-normalization fallback, alphabetical organization.
 * - Visual updates per request:
 *   • Hero/header: restore glassmorphism centered container with blur and semi-transparent background.
 *   • Tabs content: centered wrapper with max width 70vw (responsive on mobile).
 *   • Training: compact, not full-width, tidy responsive grid.
 *   • Documentation Forms: restore file icons and arrow indicators (no "Expand" text).
 *   • Additional Resources: remove accordions; show grouped sections with headings and item cards.
 */

import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ArrowLeft,
  Download,
  FileText,
  PlayCircle,
  ChevronDown,
  FolderOpen,
} from 'lucide-react';

import {
  listAllRecords,
  listRecords,
  getRecord,
  AirtableRecord,
  getAttachmentArray,
} from '../lib/airtable';
import { FIELD_IDS, TABLE_IDS } from '../config/airtableConfig';
import SafeText from '../components/common/SafeText';
import Breadcrumbs from '../components/common/Breadcrumbs';

/** Loose Airtable field models */
type ProgramRecordFields = Record<string, unknown>;
type AssetRecordFields = Record<string, unknown>;
type TypeRecordFields = Record<string, unknown>;
type CategoryRecordFields = Record<string, unknown>;

/** UI model for the program header */
interface ProgramUI {
  id: string;
  title: string;
  description?: string;
  level?: string;
  photoUrl?: string;
}

/** UI model for a single asset (normalized) */
interface AssetUI {
  id: string;
  name: string;
  url?: string;

  /** Linked IDs used for logic */
  typeId?: string;
  categoryId?: string;

  /** Resolved display names */
  typeName?: string;
  categoryName?: string;

  /** Optional subcategory (singleSelect) for forms */
  subcategory?: string;

  /** Sort index from lookup (optional) */
  sortIndex?: number;
}

/** UI model for a training module row */
interface ModuleUI {
  id: string;
  title: string;
  url?: string;
  categoryName?: string;
}

/**
 * Explicit mapping: Resource Type IDs → tabs (ID-first).
 * - Fill these arrays with record IDs from the Resource Types table (tblkijrEI0c3PFQTl) to override name-based fallback.
 */
const RESOURCE_TYPE_BUCKETS: {
  training: string[];
  protocols: string[];
  forms: string[];
} = {
  training: [
    // e.g., 'recTrainingModuleTypeId', 'recVideoTypeId'
  ],
  protocols: [
    // e.g., 'recManualTypeId', 'recProtocolTypeId', 'recSOPTypeId'
  ],
  forms: [
    // e.g., 'recDocumentationFormsTypeId'
  ],
};

/**
 * Desired order for documentation form categories (name-based display order).
 */
const DOC_CATEGORY_ORDER = [
  'CMR Forms',
  'General Forms',
  'Medical Conditions Flowsheets',
  'Outcomes TIP Forms',
  'Prescriber Communication Forms',
];

/**
 * Convert a string into a normalized key for robust comparison (names-only; IDs remain ground-truth for logic).
 */
function normalizeKey(input: string | undefined): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Resolve program by slug or record ID (recXXXXXXXX).
 */
async function resolveProgram(param: string): Promise<AirtableRecord<ProgramRecordFields> | null> {
  if (!param) return null;
  if (param.startsWith('rec')) {
    try {
      const rec = await getRecord<ProgramRecordFields>({
        tableId: TABLE_IDS.programs,
        recordId: param,
        fields: [
          FIELD_IDS.programs.name,
          FIELD_IDS.programs.description,
          FIELD_IDS.programs.summary,
          FIELD_IDS.programs.level,
          FIELD_IDS.programs.photo,
        ],
      });
      return rec;
    } catch {
      return null;
    }
  }

  const res = await listRecords<ProgramRecordFields>({
    tableId: TABLE_IDS.programs,
    pageSize: 100,
    fields: [
      FIELD_IDS.programs.name,
      FIELD_IDS.programs.description,
      FIELD_IDS.programs.summary,
      FIELD_IDS.programs.level,
      FIELD_IDS.programs.photo,
    ],
  });

  // Slug match on Program_Name
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  return (
    res.records.find((r) => slugify(String(r.fields[FIELD_IDS.programs.name] || '')) === param) ||
    null
  );
}

/**
 * Build ID → name maps for Resource Types and Categories.
 */
async function buildLookups() {
  const [types, cats] = await Promise.all([
    listAllRecords<TypeRecordFields>({
      tableId: TABLE_IDS.resourceTypes,
      pageSize: 100,
      fields: [FIELD_IDS.resourceTypes.name],
    }),
    listAllRecords<CategoryRecordFields>({
      tableId: TABLE_IDS.categories,
      pageSize: 100,
      fields: [FIELD_IDS.categories.name],
    }),
  ]);

  const typeNameById = new Map<string, string>();
  types.forEach((t) => {
    const name = String(t.fields[FIELD_IDS.resourceTypes.name] || '');
    typeNameById.set(t.id, name);
  });

  const categoryNameById = new Map<string, string>();
  cats.forEach((c) => {
    const name = String(c.fields[FIELD_IDS.categories.name] || '');
    categoryNameById.set(c.id, name);
  });

  return { typeNameById, categoryNameById };
}

/**
 * Build bucket sets by ID, using explicit override if present, otherwise name-based normalization fallback.
 */
function buildBucketSetsById(typeNameById: Map<string, string>) {
  const explicit = {
    training: new Set(RESOURCE_TYPE_BUCKETS.training),
    protocols: new Set(RESOURCE_TYPE_BUCKETS.protocols),
    forms: new Set(RESOURCE_TYPE_BUCKETS.forms),
  };

  const anyExplicit =
    explicit.training.size > 0 || explicit.protocols.size > 0 || explicit.forms.size > 0;

  const derived = {
    training: new Set<string>(),
    protocols: new Set<string>(),
    forms: new Set<string>(),
  };

  if (!anyExplicit) {
    for (const [id, name] of typeNameById.entries()) {
      const key = normalizeKey(name);

      // Training bucket: "Training Module" and "Video" (and safe synonyms)
      if (
        key.includes('training-module') ||
        key === 'video' ||
        key.includes('-video') ||
        key.includes('training') ||
        key.includes('module')
      ) {
        derived.training.add(id);
        continue;
      }

      // Manuals & Protocols bucket: manuals, protocols, SOPs
      if (key.includes('manual') || key.includes('protocol') || key === 'sop' || key.includes('sop')) {
        derived.protocols.add(id);
        continue;
      }

      // Documentation Forms bucket
      if (
        key === 'documentation-forms' ||
        key === 'documentation-form' ||
        key === 'forms' ||
        key.includes('form')
      ) {
        derived.forms.add(id);
        continue;
      }
    }
  }

  const training = anyExplicit ? explicit.training : derived.training;
  const protocols = anyExplicit ? explicit.protocols : derived.protocols;
  const forms = anyExplicit ? explicit.forms : derived.forms;

  const allTypeIds = new Set(Array.from(typeNameById.keys()));
  const unionKnown = new Set<string>([...training, ...protocols, ...forms]);
  const additional = new Set<string>(Array.from(allTypeIds).filter((id) => !unionKnown.has(id)));

  return { training, protocols, forms, additional };
}

/**
 * ProgramDetail component
 * - Fetches program + assets and renders partitioned tabs with accordions and alphabetical ordering.
 * - Visual/UX conforms to the requirements listed at the top of the file.
 */
export default function ProgramDetail() {
  const { id: routeParam } = useParams<{ id: string }>();

  const [program, setProgram] = useState<ProgramUI | null>(null);
  const [assets, setAssets] = useState<AssetUI[]>([]);
  const [typeNameById, setTypeNameById] = useState<Map<string, string>>(new Map());
  const [categoryNameById, setCategoryNameById] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'training' | 'protocols' | 'forms' | 'resources'>(
    'overview'
  );

  /** Load program + lookups + assets */
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError('');

        const pr = await resolveProgram(routeParam || '');
        if (!mounted) return;

        if (!pr) {
          setProgram(null);
          setAssets([]);
          setError('Program not found. Open this page from Programs or Member Content.');
          setLoading(false);
          return;
        }

        const title = String(pr.fields[FIELD_IDS.programs.name] || 'Program');
        const description =
          String(pr.fields[FIELD_IDS.programs.summary] || '') ||
          String(pr.fields[FIELD_IDS.programs.description] || '');
        const photoUrl = getAttachmentArray(pr.fields[FIELD_IDS.programs.photo])[0]?.url;
        const levelRaw = pr.fields[FIELD_IDS.programs.level];
        const level =
          Array.isArray(levelRaw) && levelRaw.length
            ? String((levelRaw[0] as any)?.name || levelRaw[0] || '')
            : typeof levelRaw === 'string'
            ? levelRaw
            : undefined;

        setProgram({
          id: pr.id,
          title,
          description,
          level,
          photoUrl,
        });

        // Build lookup maps
        const { typeNameById, categoryNameById } = await buildLookups();
        if (!mounted) return;
        setTypeNameById(typeNameById);
        setCategoryNameById(categoryNameById);

        // Load program assets
        const allAssets = await listAllRecords<AssetRecordFields>({
          tableId: TABLE_IDS.programAssets,
          pageSize: 100,
          fields: [
            FIELD_IDS.programAssets.fileName,
            FIELD_IDS.programAssets.file,
            FIELD_IDS.programAssets.programLink,
            FIELD_IDS.programAssets.assetType,
            FIELD_IDS.programAssets.docCategory,
            FIELD_IDS.programAssets.docSubcategory,
            FIELD_IDS.programAssets.programSortLookup,
          ],
        });

        if (!mounted) return;

        const linkedToThis = allAssets.filter((r) => {
          const links = r.fields[FIELD_IDS.programAssets.programLink];
          return Array.isArray(links) ? links.includes(pr.id) : false;
        });

        const normalized: AssetUI[] = linkedToThis.map((r) => {
          const name = String(r.fields[FIELD_IDS.programAssets.fileName] || 'File');
          const url = getAttachmentArray(r.fields[FIELD_IDS.programAssets.file])[0]?.url;

          const typeIdsRaw = r.fields[FIELD_IDS.programAssets.assetType];
          const typeId =
            Array.isArray(typeIdsRaw) && typeIdsRaw.length
              ? String(typeIdsRaw[0])
              : typeof typeIdsRaw === 'string'
              ? typeIdsRaw
              : undefined;

          const categoryIdsRaw = r.fields[FIELD_IDS.programAssets.docCategory];
          const categoryId =
            Array.isArray(categoryIdsRaw) && categoryIdsRaw.length
              ? String(categoryIdsRaw[0])
              : typeof categoryIdsRaw === 'string'
              ? categoryIdsRaw
              : undefined;

          const subcategoryRaw = r.fields[FIELD_IDS.programAssets.docSubcategory];
          const subcategory =
            Array.isArray(subcategoryRaw) && subcategoryRaw.length
              ? String((subcategoryRaw[0] as any)?.name || subcategoryRaw[0])
              : typeof subcategoryRaw === 'string'
              ? subcategoryRaw
              : undefined;

          const sortIndexRaw = r.fields[FIELD_IDS.programAssets.programSortLookup];
          let sortIndex: number | undefined;
          if (Array.isArray(sortIndexRaw) && sortIndexRaw.length) {
            const n = Number(sortIndexRaw[0]);
            sortIndex = Number.isNaN(n) ? undefined : n;
          } else if (typeof sortIndexRaw === 'number') {
            sortIndex = sortIndexRaw;
          } else if (typeof sortIndexRaw === 'string') {
            const n = Number(sortIndexRaw);
            sortIndex = Number.isNaN(n) ? undefined : n;
          }

          return {
            id: r.id,
            name,
            url,
            typeId,
            categoryId,
            typeName: typeId ? typeNameById.get(typeId) : undefined,
            categoryName: categoryId ? categoryNameById.get(categoryId) : undefined,
            subcategory,
            sortIndex,
          };
        });

        // Stable default sort by program-defined sort index then file name
        normalized.sort((a, b) => {
          const ai = a.sortIndex ?? Number.MAX_SAFE_INTEGER;
          const bi = b.sortIndex ?? Number.MAX_SAFE_INTEGER;
          if (ai !== bi) return ai - bi;
          return a.name.localeCompare(b.name);
        });

        setAssets(normalized);
      } catch (e: any) {
        setError(e?.message || 'Failed to load program details');
        setProgram(null);
        setAssets([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [routeParam]);

  /**
   * Compute bucket sets by ID (explicit override or derived via name normalization).
   */
  const bucketSets = useMemo(() => buildBucketSetsById(typeNameById), [typeNameById]);

  /**
   * Partition assets by bucket (ID-first classification).
   */
  const partition = useMemo(() => {
    const training: AssetUI[] = [];
    const protocols: AssetUI[] = [];
    const forms: AssetUI[] = [];
    const additional: AssetUI[] = [];

    for (const a of assets) {
      const tId = a.typeId;
      if (!tId) {
        additional.push(a);
        continue;
      }
      if (bucketSets.training.has(tId)) {
        training.push(a);
      } else if (bucketSets.protocols.has(tId)) {
        protocols.push(a);
      } else if (bucketSets.forms.has(tId)) {
        forms.push(a);
      } else if (bucketSets.additional.has(tId)) {
        additional.push(a);
      } else {
        additional.push(a);
      }
    }

    // Alphabetical organization within partitions
    training.sort((a, b) => a.name.localeCompare(b.name));
    protocols.sort((a, b) => a.name.localeCompare(b.name));
    forms.sort((a, b) => a.name.localeCompare(b.name));
    additional.sort((a, b) => a.name.localeCompare(b.name));

    return { training, protocols, forms, additional };
  }, [assets, bucketSets]);

  /**
   * Build modules list from training assets (ID-based) and alpha sort by title.
   */
  const modules: ModuleUI[] = useMemo(
    () =>
      partition.training
        .map((a) => ({
          id: a.id,
          title: a.name,
          url: a.url,
          categoryName: a.categoryName,
        }))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [partition.training]
  );

  /**
   * For Documentation Forms:
   * - Group by Category (ID-first), display names resolved for UI
   * - Sort categories by desired order then alphabetically
   * - For “Prescriber Communication Forms” category, add nested grouping by Subcategory (alpha)
   */
  const formsGrouped = useMemo(() => {
    const prescriberCommCategoryId =
      Array.from(categoryNameById.entries()).find(
        ([, name]) => normalizeKey(name) === normalizeKey('Prescriber Communication Forms')
      )?.[0] || null;

    const byCategory = new Map<string, AssetUI[]>();
    for (const a of partition.forms) {
      const catId = a.categoryId || 'unknown';
      if (!byCategory.has(catId)) byCategory.set(catId, []);
      byCategory.get(catId)!.push(a);
    }

    const categories = Array.from(byCategory.entries()).map(([catId, items]) => {
      const name = categoryNameById.get(catId) || 'Other';
      items.sort((a, b) => a.name.localeCompare(b.name));
      return { catId, name, items };
    });

    categories.sort((a, b) => {
      const ia = DOC_CATEGORY_ORDER.indexOf(a.name);
      const ib = DOC_CATEGORY_ORDER.indexOf(b.name);
      if (ia === -1 && ib === -1) return a.name.localeCompare(b.name);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

    const withNested = categories.map((c) => {
      if (prescriberCommCategoryId && c.catId === prescriberCommCategoryId) {
        const bySub = new Map<string, AssetUI[]>();
        for (const a of c.items) {
          const sub = a.subcategory || 'General';
          if (!bySub.has(sub)) bySub.set(sub, []);
          bySub.get(sub)!.push(a);
        }
        const subs = Array.from(bySub.entries())
          .map(([sub, items]) => ({ sub, items: items.sort((a, b) => a.name.localeCompare(b.name)) }))
          .sort((a, b) => a.sub.localeCompare(b.sub));
        return { ...c, subs };
      }
      return c;
    });

    return withNested;
  }, [partition.forms, categoryNameById]);

  /**
   * Additional Resources grouped by Resource Type (ID-first), sorted alphabetically.
   * Note: No accordion — render as sections with headings + list of item cards.
   */
  const additionalByType = useMemo(() => {
    const groups = new Map<string, { typeId: string; typeName: string; items: AssetUI[] }>();
    for (const a of partition.additional) {
      const tId = a.typeId || 'unknown';
      const tName = (tId && typeNameById.get(tId)) || 'Other';
      if (!groups.has(tId)) {
        groups.set(tId, { typeId: tId, typeName: tName, items: [] });
      }
      groups.get(tId)!.items.push(a);
    }
    const arr = Array.from(groups.values());
    arr.forEach((g) => g.items.sort((a, b) => a.name.localeCompare(b.name)));
    arr.sort((a, b) => a.typeName.localeCompare(b.typeName));
    return arr;
  }, [partition.additional, typeNameById]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden">
        {/* Soft gradient background (kept) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-cyan-700 to-teal-500" />
        {/* Subtle overlay texture (optional image could be placed here) */}
        <div className="relative z-10 px-6 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs
              variant="light"
              items={[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Clinical Programs', to: '/member-content' },
                { label: program?.title || 'Program' },
              ]}
              className="mb-6"
            />

            {/* Centered glass card */}
            <div className="mx-auto max-w-3xl text-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                <SafeText value={program?.title || 'Program'} />
              </h1>
              {program?.description ? (
                <p className="text-white/90 mt-3 sm:mt-4">
                  <SafeText value={program.description} />
                </p>
              ) : null}

              <div className="mt-6">
                <Link to="/member-content">
                  <Button
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-cyan-600"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Programs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs and content wrapper constrained to 70vw on desktop */}
      <div className="px-4 py-8">
        <div className="w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] mx-auto">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
            <TabsList className="flex flex-wrap gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="protocols">Manuals &amp; Protocols</TabsTrigger>
              <TabsTrigger value="forms">Documentation Forms</TabsTrigger>
              <TabsTrigger value="resources">Additional Resources</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>About this Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {program?.description ? (
                      <p className="text-gray-700 leading-relaxed">
                        <SafeText value={program.description} />
                      </p>
                    ) : (
                      <p className="text-gray-500">No description available.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Level:</span> <span>{program?.level || '—'}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Assets:</span> <span>{assets.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Training: compact grid, not oversized, not full spanning width */}
            <TabsContent value="training" className="mt-6">
              {modules.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-sm text-gray-600">
                    No training items found for this program.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map((m, idx) => (
                    <Card key={m.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500 mb-0.5">Module {idx + 1}</div>
                          <div className="font-semibold text-sm truncate">
                            <SafeText value={m.title} />
                          </div>
                          {m.categoryName ? (
                            <div className="text-xs text-gray-500 mt-0.5">
                              <SafeText value={m.categoryName} />
                            </div>
                          ) : null}
                        </div>
                        {m.url ? (
                          <a href={m.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300">
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Open
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" variant="outline" className="bg-transparent" disabled>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Unavailable
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Manuals & Protocols */}
            <TabsContent value="protocols" className="mt-6">
              {partition.protocols.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-sm text-gray-600">
                    No manuals or protocol resources.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {partition.protocols.map((a) => (
                    <Card key={a.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-cyan-500" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-sm break-words">
                              <SafeText value={a.name} />
                            </div>
                            {a.typeName ? (
                              <div className="text-xs text-gray-500 mt-0.5">
                                <SafeText value={a.typeName} />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {a.url ? (
                          <a href={a.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" size="sm" className="bg-transparent" disabled>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Documentation Forms: restore icons and arrow indicators, centered wrapper already applied */}
            <TabsContent value="forms" className="mt-6">
              {formsGrouped.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-sm text-gray-600">No documentation forms.</CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {formsGrouped.map((group) => {
                    const hasNested = Array.isArray((group as any).subs);
                    return (
                      <details
                        key={group.catId}
                        className="group rounded-lg border border-gray-200 bg-white open:shadow-md"
                      >
                        <summary className="cursor-pointer list-none select-none px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                            <span className="font-semibold">
                              <SafeText value={group.name} />
                            </span>
                            <Badge variant="secondary">
                              {hasNested
                                ? (group as any).subs.reduce((sum: number, s: any) => sum + s.items.length, 0)
                                : group.items.length}{' '}
                              items
                            </Badge>
                          </div>
                          {/* Arrow indicator (rotates on open) */}
                          <ChevronDown className="h-5 w-5 text-gray-600 transition-transform group-open:rotate-180" />
                        </summary>

                        <div className="px-4 pb-4">
                          {hasNested ? (
                            <div className="space-y-3">
                              {(group as any).subs.map((sub: { sub: string; items: AssetUI[] }) => (
                                <details key={sub.sub} className="group rounded-md border border-gray-200 bg-white">
                                  <summary className="cursor-pointer list-none select-none px-3 py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <FolderOpen className="h-4 w-4 text-cyan-500" />
                                      <span className="font-medium text-sm">
                                        <SafeText value={sub.sub} />
                                      </span>
                                      <Badge variant="secondary" className="text-xs">
                                        {sub.items.length} items
                                      </Badge>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-600 transition-transform group-open:rotate-180" />
                                  </summary>
                                  <div className="px-3 pb-3">
                                    <div className="space-y-2">
                                      {sub.items.map((a) => (
                                        <Card key={a.id} className="hover:shadow-sm transition-shadow">
                                          <CardContent className="p-3 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0">
                                              <div className="w-7 h-7 bg-cyan-50 rounded-lg flex items-center justify-center">
                                                <FileText className="h-4 w-4 text-cyan-600" />
                                              </div>
                                              <div className="min-w-0">
                                                <div className="font-medium text-sm break-words">
                                                  <SafeText value={a.name} />
                                                </div>
                                              </div>
                                            </div>
                                            {a.url ? (
                                              <a href={a.url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="sm" className="bg-transparent">
                                                  <Download className="h-4 w-4 mr-2" />
                                                  Download
                                                </Button>
                                              </a>
                                            ) : (
                                              <Button variant="outline" size="sm" className="bg-transparent" disabled>
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                              </Button>
                                            )}
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                </details>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {group.items.map((a) => (
                                <Card key={a.id} className="hover:shadow-sm transition-shadow">
                                  <CardContent className="p-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-7 h-7 bg-cyan-50 rounded-lg flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-cyan-600" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="font-medium text-sm break-words">
                                          <SafeText value={a.name} />
                                        </div>
                                      </div>
                                    </div>
                                    {a.url ? (
                                      <a href={a.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" size="sm" className="bg-transparent">
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </Button>
                                      </a>
                                    ) : (
                                      <Button variant="outline" size="sm" className="bg-transparent" disabled>
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                      </Button>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </details>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Additional Resources: grouped by type (no accordion), centered wrapper already applied */}
            <TabsContent value="resources" className="mt-6">
              {additionalByType.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-sm text-gray-600">No additional resources.</CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {additionalByType.map((group) => (
                    <div key={group.typeId} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500" />
                        <h3 className="font-semibold">
                          <SafeText value={group.typeName} />
                        </h3>
                        <Badge variant="secondary">{group.items.length} items</Badge>
                      </div>
                      <div className="space-y-2">
                        {group.items.map((a) => (
                          <Card key={a.id} className="hover:shadow-sm transition-shadow">
                            <CardContent className="p-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                                  <FileText className="h-4 w-4 text-teal-600" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-medium text-sm break-words">
                                    <SafeText value={a.name} />
                                  </div>
                                </div>
                              </div>
                              {a.url ? (
                                <a href={a.url} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </a>
                              ) : (
                                <Button variant="outline" size="sm" className="bg-transparent" disabled>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
