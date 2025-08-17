/**
 * Program detail page with hero + tabbed content (Airtable-backed with fallback)
 * - Uses AppShell + MemberSidebar so the member nav persists.
 * - Tabs: Overview, Training Modules, Protocol Manuals, Documentation Forms, Additional Resources.
 * - Data source:
 *   1) Try Airtable via /api/clinical-programs?slug=...
 *   2) Fallback to small local dataset if API not configured or request fails.
 */

import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router';
import AppShell from '../components/layout/AppShell';
import MemberSidebar from '../components/layout/MemberSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ArrowRight, Download, FileText, ListChecks, BookOpen, ClipboardList, FolderOpen } from 'lucide-react';
import type { ProgramDetailData } from '../services/airtable/client';
import { fetchProgramDetail } from '../services/airtable/client';

/** Tab ids for detail sections */
type ProgramTab = 'overview' | 'modules' | 'manuals' | 'forms' | 'resources';

/**
 * Local fallback dataset (Airtable-free)
 * - Only used when the API is not configured.
 */
const FALLBACK: Record<string, ProgramDetailData> = {
  'timemymeds': {
    slug: 'timemymeds',
    title: 'TimeMyMeds',
    subtitle: 'Create predictable appointment schedules that enable clinical service delivery.',
    image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/3fad5680-47c5-4d96-a5aa-27e6413c9071.jpg',
    overview: [
      'TimeMyMeds transforms reactive dispensing into proactive, appointment-based care.',
      'By synchronizing patients, your team gains protected time to deliver billable clinical services.',
    ],
    modules: [
      { id: 'tmm-1', name: 'Introduction to Sync', duration: '12m', description: 'Core principles and practice impact' },
      { id: 'tmm-2', name: 'Patient Enrollment & Segmentation', duration: '18m' },
      { id: 'tmm-3', name: 'Technician Workflow & Scheduling', duration: '22m' },
      { id: 'tmm-4', name: 'Clinic Day Playbook', duration: '16m' },
    ],
    manuals: [
      { id: 'tmm-m-1', name: 'Sync Operations SOP', fileUrl: '#' },
      { id: 'tmm-m-2', name: 'Monthly Call Script', fileUrl: '#' },
    ],
    forms: [
      { id: 'tmm-f-1', name: 'Patient Enrollment Form', category: 'General', fileUrl: '#' },
      { id: 'tmm-f-2', name: 'Monthly Check-in Template', category: 'Follow-up', fileUrl: '#' },
    ],
    resources: [
      { id: 'tmm-r-1', name: 'Sync Schedule Template', type: 'sheet', url: '#' },
      { id: 'tmm-r-2', name: 'Prescriber Outreach Email', type: 'doc', url: '#' },
    ],
  },
  'mtm-future-today': {
    slug: 'mtm-future-today',
    title: 'MTM The Future Today',
    subtitle: 'Team-based Medication Therapy Management with proven protocols and technician workflows.',
    image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/215cb0b1-ea88-4d9b-bd54-d59ca65e90be.jpg',
    overview: [
      'Practice-based MTM that operationalizes the pharmacist’s clinical expertise.',
      'Technicians drive the process; pharmacists focus on interventions and outcomes.',
    ],
    modules: [
      { id: 'mtm-1', name: 'CMR Foundations', duration: '20m' },
      { id: 'mtm-2', name: 'Technician-Led Intake', duration: '15m' },
      { id: 'mtm-3', name: 'Pharmacist Intervention Playbook', duration: '25m' },
    ],
    manuals: [
      { id: 'mtm-m-1', name: 'CMR Interview Guide', fileUrl: '#' },
      { id: 'mtm-m-2', name: 'TIP Opportunity Map', fileUrl: '#' },
    ],
    forms: [
      { id: 'mtm-f-1', name: 'CMR Pharmacist Form', category: 'CMR', fileUrl: '#' },
      { id: 'mtm-f-2', name: 'Technician Checklist', category: 'Tech Ops', fileUrl: '#' },
    ],
    resources: [
      { id: 'mtm-r-1', name: 'Prescriber Communication Forms', type: 'doc', url: '#' },
      { id: 'mtm-r-2', name: 'Outcomes Tracking Sheet', type: 'sheet', url: '#' },
    ],
  },
  'test-and-treat': {
    slug: 'test-and-treat',
    title: 'Test and Treat: Strep, Flu, COVID',
    subtitle: 'Point-of-care testing and treatment with streamlined protocols and documentation.',
    image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/27239c5e-aff0-4c6a-92da-428ea6e7b4f4.jpg',
    overview: [
      'Deploy CLIA-waived testing within a pharmacy workflow built for speed and safety.',
      'Includes standing orders, patient intake, result documentation, and billing guidance.',
    ],
    modules: [
      { id: 'tnt-1', name: 'POCT Safety & CLIA Basics', duration: '14m' },
      { id: 'tnt-2', name: 'Strep/Flu/COVID Testing Workflow', duration: '21m' },
      { id: 'tnt-3', name: 'Treatment & Documentation', duration: '19m' },
    ],
    manuals: [
      { id: 'tnt-m-1', name: 'POCT SOP', fileUrl: '#' },
      { id: 'tnt-m-2', name: 'Standing Orders Template', fileUrl: '#' },
    ],
    forms: [
      { id: 'tnt-f-1', name: 'Patient Intake & Consent', category: 'Consent', fileUrl: '#' },
      { id: 'tnt-f-2', name: 'Result Documentation', category: 'Record', fileUrl: '#' },
    ],
    resources: [
      { id: 'tnt-r-1', name: 'Treatment Algorithms', type: 'pdf', url: '#' },
      { id: 'tnt-r-2', name: 'Billing Codes Cheat Sheet', type: 'pdf', url: '#' },
    ],
  },
  'hba1c-testing': {
    slug: 'hba1c-testing',
    title: 'HbA1c Testing',
    subtitle: 'Integrated diabetes management with point-of-care A1c testing and follow-up.',
    image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/6f04907b-165f-42e1-a27e-146289b2806c.jpg',
    overview: [
      'Embed A1c testing into a comprehensive diabetes care workflow.',
      'Improve patient outcomes through protocolized communication with providers.',
    ],
    modules: [
      { id: 'a1c-1', name: 'A1c POC Setup & Calibration', duration: '10m' },
      { id: 'a1c-2', name: 'Patient Workflow & Education', duration: '15m' },
      { id: 'a1c-3', name: 'Documentation & Billing', duration: '16m' },
    ],
    manuals: [
      { id: 'a1c-m-1', name: 'A1c Testing SOP', fileUrl: '#' },
      { id: 'a1c-m-2', name: 'Provider Communication Guide', fileUrl: '#' },
    ],
    forms: [
      { id: 'a1c-f-1', name: 'A1c Consent Form', category: 'Consent', fileUrl: '#' },
      { id: 'a1c-f-2', name: 'Result Note to Provider', category: 'Communication', fileUrl: '#' },
    ],
    resources: [
      { id: 'a1c-r-1', name: 'Patient Handout: What is A1c?', type: 'pdf', url: '#' },
      { id: 'a1c-r-2', name: 'CPT Codes Overview', type: 'pdf', url: '#' },
    ],
  },
  'oral-contraceptives': {
    slug: 'oral-contraceptives',
    title: 'Oral Contraceptives',
    subtitle: 'Practice-based service from intake to prescribing and documentation.',
    image: 'https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/3a9362fa-5601-4132-8b72-d23693adb04e.jpg',
    overview: [
      'Enable pharmacist-initiated prescribing under state protocols.',
      'Simplify intake, screening, prescribing decisions, and documentation.',
    ],
    modules: [
      { id: 'oc-1', name: 'Intake & Screening', duration: '12m' },
      { id: 'oc-2', name: 'Decision Support & Prescribing', duration: '20m' },
      { id: 'oc-3', name: 'Follow-up & Record Keeping', duration: '14m' },
    ],
    manuals: [
      { id: 'oc-m-1', name: 'Standing Order Template', fileUrl: '#' },
      { id: 'oc-m-2', name: 'Screening Protocol', fileUrl: '#' },
    ],
    forms: [
      { id: 'oc-f-1', name: 'Patient Screening Form', category: 'Screening', fileUrl: '#' },
      { id: 'oc-f-2', name: 'Prescribing Record', category: 'Record', fileUrl: '#' },
    ],
    resources: [
      { id: 'oc-r-1', name: 'Patient Counseling Handout', type: 'pdf', url: '#' },
      { id: 'oc-r-2', name: 'Billing Guide', type: 'pdf', url: '#' },
    ],
  },
};

/** Build a safe initial tab from the URL (?tab=...) */
function getInitialTab(search: string): ProgramTab {
  const qs = new URLSearchParams(search);
  const t = (qs.get('tab') || '').toLowerCase();
  switch (t) {
    case 'overview':
    case 'modules':
    case 'manuals':
    case 'forms':
    case 'resources':
      return t as ProgramTab;
    default:
      return 'overview';
  }
}

export default function ProgramDetail() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  /** Resolve slug from URL */
  const slug = (params as any)?.id as string | undefined;

  /** Remote data state */
  const [data, setData] = useState<ProgramDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /** Fetch data: try Airtable, else fallback */
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const detail = await fetchProgramDetail(slug);
        if (!mounted) return;
        setData(detail);
      } catch (e: any) {
        // Fallback to local dataset
        const fb = FALLBACK[slug];
        if (fb) {
          setData(fb);
        } else {
          setError('not-found');
          setData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  /** Initial tab from query */
  const initialTab = getInitialTab(location.search);

  /** Update querystring when switching tabs (keeps deep-links shareable) */
  function onTabChange(next: string) {
    const qs = new URLSearchParams(location.search);
    if (next && next !== 'overview') {
      qs.set('tab', next);
    } else {
      qs.delete('tab');
    }
    navigate({ search: qs.toString() ? `?${qs.toString()}` : '' }, { replace: true });
  }

  /** Header content for AppShell (loading-safe) */
  const header = (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-4">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'Clinical Programs' },
          { label: data?.title || (slug ? slug : 'Loading…') },
        ]}
      />
      <div className="mt-2 text-2xl font-bold">{data?.title || 'Loading…'}</div>
      <div className="text-sm text-gray-600">{data?.subtitle || (loading ? 'Fetching program detail…' : '')}</div>
    </div>
  );

  // Guarded not found state
  if (!loading && (error === 'not-found' || !data)) {
    return (
      <AppShell sidebar={<MemberSidebar />} header={header}>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-xl">We couldn’t find that program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">
              Make sure you’re using one of the supported program links from the sidebar.
            </p>
            <Link to="/dashboard">
              <Button variant="outline" className="bg-transparent">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </AppShell>
    );
  }

  return (
    <AppShell sidebar={<MemberSidebar />} header={header}>
      {/* Hero Section */}
      <section className="relative mb-6 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-300 opacity-90" />
        <div className="relative z-10 grid gap-6 p-6 text-white md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold">{data?.title || 'Loading…'}</div>
            <div className="mt-1 text-sm text-white/90">{data?.subtitle || '—'}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">Team-based</Badge>
              <Badge variant="secondary">Practice-proven</Badge>
              <Badge variant="secondary">Updated</Badge>
            </div>
          </div>
          <div className="hidden items-center justify-end md:flex">
            {data?.image ? (
              <img src={data.image} className="object-cover h-24 w-36 rounded-lg ring-1 ring-white/30" />
            ) : (
              <img src="https://pub-cdn.sider.ai/u/U03VH4NVNOE/web-coder/687655a5b1dac45b18db4f5c/resource/6c0beab0-9c48-4a61-8626-92bd6e792588.jpg" className="object-cover h-24 w-36 rounded-lg ring-1 ring-white/30" />
            )}
          </div>
        </div>
      </section>

      {/* Loading skeleton */}
      {loading ? (
        <Card>
          <CardContent className="p-6 text-sm text-slate-600">Loading program content…</CardContent>
        </Card>
      ) : null}

      {/* Tabbed content */}
      {!loading && data ? (
        <Tabs defaultValue={initialTab} onValueChange={onTabChange}>
          <div className="mb-3 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Training Modules</TabsTrigger>
              <TabsTrigger value="manuals">Protocol Manuals</TabsTrigger>
              <TabsTrigger value="forms">Documentation Forms</TabsTrigger>
              <TabsTrigger value="resources">Additional Resources</TabsTrigger>
            </TabsList>
            <Link to="/resources">
              <Button variant="outline" size="sm" className="bg-transparent">
                Browse Resource Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-3">
            {data.overview.length === 0 ? (
              <Card><CardContent className="p-4 text-[13px] text-slate-600">No overview provided.</CardContent></Card>
            ) : (
              data.overview.map((p, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-0.5 h-4 w-4 text-cyan-600" />
                      <p className="text-[13px] text-slate-700">{p}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Training Modules */}
          <TabsContent value="modules">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {data.modules.map((m) => (
                <Card key={m.id} className="hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-blue-600" />
                      {m.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-[12px] text-slate-500">
                      {m.duration ? `Duration: ${m.duration}` : 'Self-paced'}
                    </div>
                    {m.description ? (
                      <div className="mt-1 text-[13px] text-slate-700">{m.description}</div>
                    ) : null}
                    {m.url ? (
                      <div className="mt-2">
                        <a href={m.url} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="mr-2 h-4 w-4" />
                            Open
                          </Button>
                        </a>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Protocol Manuals */}
          <TabsContent value="manuals">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {data.manuals.map((doc) => (
                <Card key={doc.id} className="hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-emerald-600" />
                      {doc.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button size="sm" variant="outline" className="bg-transparent" disabled={!doc.fileUrl}>
                      <Download className="mr-2 h-4 w-4" />
                      {doc.fileUrl ? (
                        <a href={doc.fileUrl} target="_blank" rel="noreferrer">Download</a>
                      ) : (
                        'Unavailable'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documentation Forms */}
          <TabsContent value="forms">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {data.forms.map((f) => (
                <Card key={f.id} className="hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      {f.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-[12px] text-slate-500">
                      {f.category ? `Category: ${f.category}` : 'Form'}
                    </div>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="bg-transparent" disabled={!f.fileUrl}>
                        <Download className="mr-2 h-4 w-4" />
                        {f.fileUrl ? (
                          <a href={f.fileUrl} target="_blank" rel="noreferrer">Download</a>
                        ) : (
                          'Unavailable'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Additional Resources */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {data.resources.map((r) => (
                <Card key={r.id} className="hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-cyan-600" />
                      {r.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-[12px] text-slate-500">Type: {r.type ?? 'resource'}</div>
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="bg-transparent" disabled={!r.url}>
                        <Download className="mr-2 h-4 w-4" />
                        {r.url ? <a href={r.url} target="_blank" rel="noreferrer">Open</a> : 'Unavailable'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : null}
    </AppShell>
  );
}
