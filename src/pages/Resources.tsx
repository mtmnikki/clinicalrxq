/**
 * Resources Library page (Airtable-backed with fallback) with AppShell
 * - Data flow:
 *   1) Try fetching unified resources via /api/resource-library.
 *   2) Fallback to local static items if API is not configured or request fails.
 * - Tabs mirrored to our categories mapping from Airtable tables.
 */

import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AppShell from '../components/layout/AppShell';
import MemberSidebar from '../components/layout/MemberSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Download, AlertCircle } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { fetchResourceLibrary, type ResourceLibraryItem } from '../services/airtable/client';

/** Available filter tabs mapped to category values */
const TABS: { key: 'all' | ResourceLibraryItem['category']; label: string }[] = [
  { key: 'all', label: 'All Resources' },
  { key: 'handouts', label: 'Patient Handouts' },
  { key: 'clinical', label: 'Clinical Resources' },
  { key: 'billing', label: 'Medical Billing' },
];

/** Map query string "cat" to a tab key */
function fromQuery(cat: string | null): (typeof TABS)[number]['key'] {
  const c = (cat || '').toLowerCase();
  return c === 'handouts' || c === 'clinical' || c === 'billing' ? (c as any) : 'all';
}

/** Local fallback items when the API is not available */
const FALLBACK: ResourceLibraryItem[] = [
  { id: 'res-1', name: 'Hypertension Management Algorithm', category: 'clinical', url: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/42e458ac-7d4e-461a-97a1-1f8e186def2e.jpg' },
  { id: 'res-2', name: 'A1c Result CPT Code Billing', category: 'billing', url: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/056013bb-8d36-4796-8607-1d1923ded32d.jpg' },
  { id: 'res-3', name: 'My Blood Sugar Log', category: 'handouts', url: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/d7fe161e-f401-44c2-95ef-d201ff49dd4b.jpg' },
  { id: 'res-4', name: 'Flu Treatment - Peds', category: 'clinical', url: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/74fa0923-8c48-499f-9b17-9b3bca2e6e32.jpg' },
];

export default function Resources() {
  const location = useLocation();
  const navigate = useNavigate();

  /** Initialize from URL (?cat=handouts|clinical|billing) */
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>(() =>
    fromQuery(new URLSearchParams(location.search).get('cat'))
  );
  const [query, setQuery] = useState<string>('');
  const [items, setItems] = useState<ResourceLibraryItem[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /** Keep activeTab synced when the URL changes externally */
  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const next = fromQuery(qs.get('cat'));
    setActiveTab(next);
  }, [location.search]);

  /** Load from API with fallback */
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setApiError(null);
      try {
        const { items: data } = await fetchResourceLibrary(
          activeTab === 'all' ? undefined : { cat: activeTab }
        );
        if (!mounted) return;
        setItems(data);
      } catch (e: any) {
        if (!mounted) return;
        setApiError('Airtable API not configured. Showing example items.');
        setItems(FALLBACK);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    // Re-fetch when tab changes (server filters per category)
  }, [activeTab]);

  /** Update the URL when tab changes from the UI */
  function handleChangeTab(next: (typeof TABS)[number]['key']) {
    setActiveTab(next);
    const qs = new URLSearchParams(location.search);
    if (next === 'all') {
      qs.delete('cat');
    } else {
      qs.set('cat', next);
    }
    navigate({ search: qs.toString() ? `?${qs.toString()}` : '' }, { replace: false });
  }

  /** Filter by search query on the client */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) => `${r.name} ${r.category}`.toLowerCase().includes(q));
  }, [items, query]);

  /** AppShell sticky header */
  const header = (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-4">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Resource Library' },
        ]}
      />
      <div className="mt-2 text-2xl font-bold">Resource Library</div>
      <div className="text-sm text-gray-600">
        Explore patient handouts, clinical guidelines, and medical billing resources
      </div>
    </div>
  );

  return (
    <AppShell sidebar={<MemberSidebar />} header={header}>
      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Button
            key={t.key}
            variant={activeTab === t.key ? undefined : 'outline'}
            className={activeTab === t.key ? '' : 'bg-transparent'}
            onClick={() => handleChangeTab(t.key)}
            size="sm"
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search by name, description, or type..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* API warning (if any) */}
      {apiError ? (
        <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-[13px] text-amber-800">
          <AlertCircle className="mt-0.5 h-4 w-4" />
          <div>{apiError}</div>
        </div>
      ) : null}

      <div className="mb-3 text-sm text-slate-600">
        {loading ? 'Loading…' : `${filtered.length} result(s)`}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <Card key={r.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{r.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="text-xs text-slate-500">Category: {r.category}</div>
              <div>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" variant="outline" className="bg-transparent" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    No file
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
