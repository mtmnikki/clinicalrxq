/**
 * Programs listing page (Airtable-free)
 * - Replaces Airtable-backed program list with local, static data to keep the UI working.
 */

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'react-router';

/** Local program item shape */
interface LocalProgram {
  /** Unique id/slug for navigation */
  id: string;
  /** Program display name */
  name: string;
  /** Short summary for the card */
  summary: string;
}

/** Minimal local dataset */
const LOCAL_PROGRAMS: LocalProgram[] = [
  {
    id: 'mtmtft',
    name: 'MTM The Future Today',
    summary: 'Team-based Medication Therapy Management with proven ROI.',
  },
  {
    id: 'timemymeds',
    name: 'TimeMyMeds Sync',
    summary: 'Appointment-based care via medication synchronization.',
  },
  {
    id: 'hba1c',
    name: 'HbA1c Testing',
    summary: 'Training and resources for A1c point-of-care testing.',
  },
  {
    id: 'tnt',
    name: 'Test & Treat Services',
    summary: 'Flu, Strep, COVID-19 testing and treatment workflows.',
  },
];

export default function Programs() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Programs</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCAL_PROGRAMS.map((p) => (
          <Card key={p.id} className="h-full">
            <CardHeader>
              <CardTitle className="text-base">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{p.summary}</p>
              <Link
                to={`/program/${encodeURIComponent(p.id)}`}
                className="text-sm text-primary underline underline-offset-4"
              >
                View details →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
