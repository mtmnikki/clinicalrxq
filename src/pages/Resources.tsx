/**
 * Members-only Resource Library page (ID-first logic)
 * Populates from:
 *  - Clinical Program Resources (attachments available)
 *  - General Resources (attachments available)
 * Uses Table IDs and Field IDs only (no formulas).
 * - Uses listAllRecords for transparent pagination.
 * - Resolves linked record IDs → names for Resource Types and Category.
 * - All filtering/partitioning uses IDs; names are only for display.
 * - Shows loading skeletons and empty states for smoother UX.
 * - Adds breadcrumb navigation anchored at Dashboard.
 */

import { useEffect, useMemo, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Download, FileText as FileTextIcon, Video as VideoIcon, Filter, X, SortAsc } from 'lucide-react';

import { listAllRecords, AirtableRecord, getAttachmentArray } from '../lib/airtable';
import { FIELD_IDS, TABLE_IDS } from '../config/airtableConfig';
import SafeText from '../components/common/SafeText';
import Breadcrumbs from '../components/common/Breadcrumbs';

/**
 * UI model for resources displayed in the grid (ID-first)
 */
type ResourceUI = {
  id: string;
  title: string;
  // Logic keys (IDs)
  typeId?: string;
  categoryId?: string;
  // Display names (resolved)
  typeName?: string;
  categoryName?: string;
  // Misc
  description?: string;
  dateAdded?: string;
  size?: string;
  url?: string; // present for both tables when attachment exists
  source: 'asset' | 'additional';
};

/**
 * In-memory lookup maps for linked tables
 */
type LookupMaps = {
  typeNameById: Map<string, string>;
  categoryNameById: Map<string, string>;
};

/**
 * Single resource skeleton card for loading state
 */
function ResourceCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

/**
 * Build lookup maps for Resource Types and Category tables (ID → primary name)
 */
async function buildLookups(): Promise<LookupMaps> {
  const [types, cats] = await Promise.all([
    listAllRecords<Record<string, unknown>>({
      tableId: TABLE_IDS.resourceTypes,
      pageSize: 100,
      fields: [FIELD_IDS.resourceTypes.name],
    }),
    listAllRecords<Record<string, unknown>>({
      tableId: TABLE_IDS.categories,
      pageSize: 100,
      fields: [FIELD_IDS.categories.name],
    }),
  ]);

  const typeNameById = new Map<string, string>();
  for (const t of types) {
    const name = String(t.fields[FIELD_IDS.resourceTypes.name] || '');
    typeNameById.set(t.id, name);
  }

  const categoryNameById = new Map<string, string>();
  for (const c of cats) {
    const name = String(c.fields[FIELD_IDS.categories.name] || '');
    categoryNameById.set(c.id, name);
  }

  return { typeNameById, categoryNameById };
}

/**
 * Safely extract a single linked record ID from a field value (take first if array)
 */
function getFirstLinkedId(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    if (value.length === 0) return undefined;
    const v = value[0];
    return typeof v === 'string' ? v : undefined;
  }
  return typeof value === 'string' ? value : undefined;
}

/**
 * Resources page with search, filters, sorting and pagination-safe data fetching
 * - Uses ID-first logic; names are resolved via lookups for display.
 */
export default function Resources() {
  const [resources, setResources] = useState<ResourceUI[] | null>(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCatId, setActiveCatId] = useState<string | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'Relevance' | 'Name' | 'Type' | 'Category'>('Relevance');

  // Lookup maps (ID → name)
  const [typeNameById, setTypeNameById] = useState<Map<string, string>>(new Map());
  const [categoryNameById, setCategoryNameById] = useState<Map<string, string>>(new Map());

  /**
   * Load resources and lookup tables in parallel, normalize to ID-first model
   */
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setIsLoading(true);
        setError('');

        // Fetch lookups and records in parallel
        const [lookups, assetsRes, addlRes] = await Promise.all([
          buildLookups(),
          listAllRecords<Record<string, any>>({
            tableId: TABLE_IDS.programAssets,
            pageSize: 100,
            fields: [
              FIELD_IDS.programAssets.fileName,
              FIELD_IDS.programAssets.assetType, // linked to Resource Types
              FIELD_IDS.programAssets.file,
              FIELD_IDS.programAssets.docCategory, // linked to Category
              FIELD_IDS.programAssets.docSubcategory, // singleSelect (for later if needed)
            ],
          }),
          listAllRecords<Record<string, any>>({
            tableId: TABLE_IDS.additionalResources,
            pageSize: 100,
            fields: [
              FIELD_IDS.additionalResources.fileName,
              FIELD_IDS.additionalResources.type, // linked to Resource Types
              FIELD_IDS.additionalResources.category, // linked to Category
              FIELD_IDS.additionalResources.attachment,
            ],
          }),
        ]);

        if (!mounted) return;

        setTypeNameById(lookups.typeNameById);
        setCategoryNameById(lookups.categoryNameById);

        // Normalize Program Assets (Clinical Program Resources)
        const assetItems: ResourceUI[] = assetsRes.map((r: AirtableRecord<Record<string, any>>) => {
          const title = (r.fields[FIELD_IDS.programAssets.fileName] as string) || 'Untitled';
          const typeId = getFirstLinkedId(r.fields[FIELD_IDS.programAssets.assetType]);
          const categoryId = getFirstLinkedId(r.fields[FIELD_IDS.programAssets.docCategory]);
          const url = getAttachmentArray(r.fields[FIELD_IDS.programAssets.file])[0]?.url;

          return {
            id: r.id,
            title,
            typeId,
            categoryId,
            typeName: typeId ? lookups.typeNameById.get(typeId) : undefined,
            categoryName: categoryId ? lookups.categoryNameById.get(categoryId) : undefined,
            url,
            source: 'asset',
          };
        });

        // Normalize Additional Resources (General Resources)
        const addlItems: ResourceUI[] = addlRes.map((r: AirtableRecord<Record<string, any>>) => {
          const title = (r.fields[FIELD_IDS.additionalResources.fileName] as string) || 'Additional Resource';
          const typeId = getFirstLinkedId(r.fields[FIELD_IDS.additionalResources.type]);
          const categoryId = getFirstLinkedId(r.fields[FIELD_IDS.additionalResources.category]);
          const url = getAttachmentArray(r.fields[FIELD_IDS.additionalResources.attachment])[0]?.url;

          return {
            id: r.id,
            title,
            typeId,
            categoryId,
            typeName: typeId ? lookups.typeNameById.get(typeId) : undefined,
            categoryName: categoryId ? lookups.categoryNameById.get(categoryId) : undefined,
            url,
            source: 'additional',
          };
        });

        setResources([...assetItems, ...addlItems]);
      } catch (e: any) {
        setError(e?.message || 'Failed to load resources');
        setResources(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Build Category filter options from data (ID-first; display name second)
   */
  const categoryOptions = useMemo(() => {
    const base: Array<{ id: 'All' | string; name: string }> = [{ id: 'All', name: 'All' }];
    if (!resources) return base;

    const pairs = new Map<string, string>(); // id -> name
    for (const r of resources) {
      if (r.categoryId) {
        const display = r.categoryName || r.categoryId;
        if (!pairs.has(r.categoryId)) pairs.set(r.categoryId, display);
      }
    }
    const arr = Array.from(pairs.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return base.concat(arr);
  }, [resources]);

  // Static fallback data if Airtable is not available
  const fallback: ResourceUI[] = [
    {
      id: '1',
      title: 'Drug Interaction Reference Guide',
      typeId: undefined,
      categoryId: undefined,
      typeName: 'PDF',
      categoryName: 'Reference',
      source: 'asset',
    },
    {
      id: '2',
      title: 'Patient Counseling Checklist',
      typeId: undefined,
      categoryId: undefined,
      typeName: 'PDF',
      categoryName: 'Tools',
      source: 'asset',
    },
  ];

  const data = resources ?? fallback;

  /**
   * Compute filtered and sorted list based on query, category and sortBy
   * - Filtering uses IDs where available (categoryId).
   * - Sorting by Type/Category uses resolved names (typeName/categoryName).
   */
  const filtered = useMemo(() => {
    let list = data;

    // Filter by category ID
    if (activeCatId !== 'All') {
      list = list.filter((r) => r.categoryId === activeCatId);
    }

    // Filter by query (title, type name, category name)
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((r) => {
        const titleMatch = r.title.toLowerCase().includes(q);
        const typeMatch = (r.typeName || '').toLowerCase().includes(q);
        const catMatch = (r.categoryName || '').toLowerCase().includes(q);
        return titleMatch || typeMatch || catMatch;
      });
    }

    // Sort
    if (sortBy === 'Name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Type') {
      list = [...list].sort(
        (a, b) => (a.typeName || '').localeCompare(b.typeName || '') || a.title.localeCompare(b.title)
      );
    } else if (sortBy === 'Category') {
      list = [...list].sort(
        (a, b) => (a.categoryName || '').localeCompare(b.categoryName || '') || a.title.localeCompare(b.title)
      );
    } // Relevance = original order

    return list;
  }, [data, query, activeCatId, sortBy]);

  /**
   * Reset filters back to defaults
   */
  function resetFilters() {
    setQuery('');
    setActiveCatId('All');
    setSortBy('Relevance');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Resource Library' },
            ]}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
          <p className="text-gray-600">Access exclusive training materials, guides, and tools</p>
          {error && <p className="text-sm text-red-600 mt-2"><SafeText value={error} /> — showing example data</p>}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
              {query && (
                <button
                  aria-label="Clear search"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category filter pills (ID-first) */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-500" />
              {categoryOptions.map((c) => (
                <Button
                  key={c.id}
                  variant={activeCatId === c.id ? 'default' : 'outline'}
                  size="sm"
                  className={activeCatId === c.id ? '' : 'bg-transparent'}
                  onClick={() => setActiveCatId(c.id)}
                >
                  <SafeText value={c.name} />
                </Button>
              ))}
            </div>

            {/* Sort control */}
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                aria-label="Sort resources"
              >
                <option value="Relevance">Sort: Relevance</option>
                <option value="Name">Sort: Name (A–Z)</option>
                <option value="Type">Sort: Type</option>
                <option value="Category">Sort: Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty state when filters eliminate all items */}
        {!isLoading && filtered.length === 0 && (
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No resources match your filters</h3>
              <p className="text-sm text-gray-600 mb-4">
                Try clearing the search or selecting a different category.
              </p>
              <Button variant="outline" className="bg-transparent" onClick={resetFilters}>
                Reset filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {isLoading
            ? [...Array(6)].map((_, i) => <ResourceCardSkeleton key={i} />)
            : filtered.map((r) => (
                <Card key={r.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      {r.typeName?.toLowerCase() === 'video' ? (
                        <VideoIcon className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <FileTextIcon className="h-4 w-4 text-cyan-400" />
                      )}
                      <SafeText value={r.title} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Badge variant="secondary">
                          <SafeText value={r.categoryName || 'General'} />
                        </Badge>
                      </span>
                      <span><SafeText value={r.typeName || '—'} /></span>
                    </div>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="bg-transparent w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" className="bg-transparent w-full" disabled>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
