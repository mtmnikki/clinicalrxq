import { SEVERITY_META } from '../../lib/constants';

interface SeverityGridProps {
  counts: Record<string, number>;
}

const SEVERITY_ORDER = [
  'no_harm_admin',
  'reached_no_harm',
  'monitoring_required',
  'temporary_harm',
  'hospitalization',
  'permanent_harm',
  'life_sustaining',
  'death'
];

const SEVERITY_SHORT_LABELS: Record<string, string> = {
  'no_harm_admin': 'Admin',
  'reached_no_harm': 'No Harm',
  'monitoring_required': 'Monitor',
  'temporary_harm': 'Temp Harm',
  'hospitalization': 'Hospital',
  'permanent_harm': 'Permanent',
  'life_sustaining': 'Life-Sust.',
  'death': 'Death'
};

export function SeverityGrid({ counts }: SeverityGridProps) {
  if (Object.values(counts).every((v) => v === 0)) {
    return (
      <div className="text-center py-8 sm:py-12 px-4 sm:px-6 font-serif text-[#888099] italic text-[0.85rem] sm:text-[0.9rem] border-2 border-dashed border-[#DDD5C0]">
        No data yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
      {SEVERITY_ORDER.map((key) => {
        const meta = SEVERITY_META[key];
        const count = counts[key] || 0;

        return (
          <div
            key={key}
            className="border-2 border-[#1A1825] p-1.5 sm:p-2.5 text-center"
            style={{
              backgroundColor: meta?.bg || '#E8E8F0',
              borderColor: count > 0 ? (meta?.color || '#ddd') : '#ddd'
            }}
          >
            <span
              className="font-mono text-[0.65rem] sm:text-[0.75rem] font-bold block leading-none"
              style={{ color: meta?.color || '#888' }}
            >
              {SEVERITY_SHORT_LABELS[key]}
            </span>
            <span className="font-sans text-[0.5rem] sm:text-[0.55rem] text-[#888099] block mt-0.5">
              {meta?.label?.split(' ')[0] || ''}
            </span>
            <span
              className="font-mono text-base sm:text-xl font-bold block mt-0.5 sm:mt-1"
              style={{ color: count > 0 ? (meta?.color || '#bbb') : '#bbb' }}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
