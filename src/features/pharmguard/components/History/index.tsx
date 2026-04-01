import { useState, useMemo, type ReactNode } from 'react';
import { Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Intervention } from '../../types';
import { ERROR_CATEGORIES, SEVERITY_META, SEVERITY_OPTIONS } from '../../lib/constants';

interface HistoryProps {
  interventions: Intervention[];
  onClearAll: () => Promise<boolean>;
}

const PAGE_SIZE = 20;

const ERROR_DISPLAY_NAMES: Record<string, string> = {};
ERROR_CATEGORIES.forEach((cat) => {
  ERROR_DISPLAY_NAMES[cat.value] = cat.label;
});

const SEVERITY_DISPLAY_NAMES: Record<string, string> = {};
SEVERITY_OPTIONS.forEach((opt) => {
  SEVERITY_DISPLAY_NAMES[opt.value] = opt.label.split(' — ')[0];
});

export function History({ interventions, onClearAll }: HistoryProps) {
  const [filterText, setFilterText] = useState('');
  const [filterError, setFilterError] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [page, setPage] = useState(1);
  const [clearing, setClearing] = useState(false);

  const filtered = useMemo(() => {
    return interventions.filter((i) => {
      if (filterError && i.error_category !== filterError) return false;
      if (filterSeverity && i.severity_potential !== filterSeverity) return false;
      if (filterText) {
        const searchStr = [
          i.drug_name,
          i.medical_condition,
          i.pharmacy_site,
          i.pharmacist_id,
          i.error_category,
          i.practice_setting,
          i.clinical_notes,
          i.prescriber_response
        ].join(' ').toLowerCase();
        if (!searchStr.includes(filterText.toLowerCase())) return false;
      }
      return true;
    });
  }, [interventions, filterText, filterError, filterSeverity]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handleClearAll = async () => {
    if (!confirm('Delete ALL logged interventions? This cannot be undone.')) return;
    setClearing(true);
    await onClearAll();
    setClearing(false);
  };

  const getSeverityBadge = (severity: string | null) => {
    if (!severity) return '—';
    const meta = SEVERITY_META[severity];
    if (!meta) return severity;

    const tierClass = {
      'ab': 'bg-[#E8E8F0] text-[#3D3B52]',
      'cd': 'bg-[#D8E8FF] text-[#1B3460]',
      'ef': 'bg-[#FDF5E6] text-[#B07018] border border-[#B07018]',
      'ghi': 'bg-[#FAEAEA] text-[#B81818] border border-[#B81818]'
    }[meta.tier] || '';

    return (
      <span className={`inline-block font-mono text-[0.65rem] font-bold px-1.5 py-0.5 tracking-wide ${tierClass}`}>
        {SEVERITY_DISPLAY_NAMES[severity] || severity}
      </span>
    );
  };

  const formatDateTime = (dt: string) => {
    if (!dt) return '—';
    return dt.replace('T', ' ').slice(0, 16);
  };

  const renderField = (label: string, value: ReactNode) => (
    <div className="min-w-0">
      <div className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-[#888099]">{label}</div>
      <div className="mt-1 font-mono text-[0.72rem] text-[#1A1825] break-words">{value}</div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 mb-3 sm:mb-3.5 sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888099]" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => { setFilterText(e.target.value); setPage(1); }}
            placeholder="Search drug, condition, site..."
            className="
              w-full font-mono text-[0.7rem] sm:text-[0.75rem] px-3 py-2 pl-9
              border-2 border-[#1A1825] bg-[#F4EFE5] outline-none
              focus:shadow-[2px_2px_0_#1A1825]
            "
          />
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={filterError}
            onChange={(e) => { setFilterError(e.target.value); setPage(1); }}
            className="
              font-mono text-[0.68rem] sm:text-[0.72rem] px-2 sm:px-2.5 py-2 pr-6 sm:pr-7 flex-1 sm:flex-none min-w-0
              border-2 border-[#1A1825] bg-[#F4EFE5] outline-none cursor-pointer
              appearance-none bg-no-repeat bg-[right_6px_center] sm:bg-[right_8px_center]
              bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%231A1825%27/%3E%3C/svg%3E')]
            "
          >
            <option value="">All Errors</option>
            {ERROR_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            value={filterSeverity}
            onChange={(e) => { setFilterSeverity(e.target.value); setPage(1); }}
            className="
              font-mono text-[0.68rem] sm:text-[0.72rem] px-2 sm:px-2.5 py-2 pr-6 sm:pr-7 flex-1 sm:flex-none min-w-0
              border-2 border-[#1A1825] bg-[#F4EFE5] outline-none cursor-pointer
              appearance-none bg-no-repeat bg-[right_6px_center] sm:bg-[right_8px_center]
              bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%231A1825%27/%3E%3C/svg%3E')]
            "
          >
            <option value="">All Severity</option>
            {SEVERITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label.split(' — ')[0]}</option>
            ))}
          </select>
          <button
            onClick={handleClearAll}
            disabled={clearing || interventions.length === 0}
            className="
              font-mono text-[0.6rem] sm:text-[0.65rem] px-2.5 sm:px-3 py-2
              border-2 border-[#1A1825] bg-[#FAEAEA] text-[#B81818]
              cursor-pointer tracking-wide font-bold flex items-center gap-1 sm:gap-1.5 whitespace-nowrap
              hover:bg-[#B81818] hover:text-white
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Clear All</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>
      </div>

      <div className="xl:hidden space-y-3">
        {paged.length === 0 ? (
          <div className="bg-white/50 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825]">
            <div className="text-center py-8 sm:py-12 px-4 sm:px-6 font-serif text-[#888099] italic text-[0.85rem] sm:text-[0.9rem]">
              <span className="text-[2rem] sm:text-[2.5rem] block mb-2 sm:mb-3 opacity-40">📋</span>
              {interventions.length === 0
                ? 'No interventions logged yet. Use the Log tab to document your first entry.'
                : 'No matches for current filters.'}
            </div>
          </div>
        ) : (
          paged.map((intervention, idx) => {
            const cost = intervention.cost_avoidance || 0;
            return (
              <div
                key={intervention.id}
                className="w-full min-w-[80%] bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] p-4"
              >
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-[#DDD5C0] pb-3">
                  <div>
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-[#888099]">
                      Entry #{startIndex + idx + 1}
                    </div>
                    <div className="mt-1 font-mono text-sm font-bold text-[#1A1825]">
                      {intervention.drug_name || '—'}
                    </div>
                  </div>
                  <div className="shrink-0">{getSeverityBadge(intervention.severity_potential)}</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-3">
                  {renderField('Date / Time', formatDateTime(intervention.datetime))}
                  {renderField('Site', intervention.pharmacy_site || '—')}
                  {renderField('RPh', intervention.pharmacist_id || '—')}
                  {renderField(
                    'Error',
                    <span className="inline-block bg-[#1A1825] px-1.5 py-0.5 text-[0.62rem] tracking-wide text-white">
                      {ERROR_DISPLAY_NAMES[intervention.error_category] || intervention.error_category || '—'}
                    </span>
                  )}
                  {renderField('Setting', intervention.practice_setting || '—')}
                  {renderField('Probability', intervention.probability_ade ?? '—')}
                  {renderField(
                    'Cost Avoidance',
                    <span
                      style={{
                        color: cost > 4000 ? '#1A6B38' : cost > 0 ? '#B07018' : '#888099',
                        fontWeight: cost > 0 ? 700 : 400
                      }}
                    >
                      {cost > 0 ? `$${cost.toLocaleString()}` : '—'}
                    </span>
                  )}
                  {renderField('Time', intervention.time_spent_minutes || '—')}
                  {renderField(
                    'Response',
                    intervention.prescriber_response?.replace(/_/g, ' ') || '—'
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="hidden xl:block bg-white/50 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] overflow-x-auto -mx-3 sm:mx-0">
        <table className="w-full border-collapse font-mono text-[0.65rem] sm:text-[0.7rem] min-w-[900px]">
          <thead>
            <tr className="bg-[#1A1825] text-white">
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">#</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10 whitespace-nowrap">Date / Time</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Site</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">RPh</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Drug</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Error</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Setting</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Severity</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10">Prob.</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10 whitespace-nowrap">Cost</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase border-r border-white/10 whitespace-nowrap">Time</th>
              <th className="px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-bold tracking-wide text-[0.55rem] sm:text-[0.6rem] uppercase">Response</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={12}>
                  <div className="text-center py-8 sm:py-12 px-4 sm:px-6 font-serif text-[#888099] italic text-[0.85rem] sm:text-[0.9rem]">
                    <span className="text-[2rem] sm:text-[2.5rem] block mb-2 sm:mb-3 opacity-40">📋</span>
                    {interventions.length === 0
                      ? 'No interventions logged yet. Use the Log tab to document your first entry.'
                      : 'No matches for current filters.'}
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((intervention, idx) => {
                const cost = intervention.cost_avoidance || 0;
                return (
                  <tr key={intervention.id} className="hover:bg-[#EAF0FD]">
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1] text-[#888099]">
                      {startIndex + idx + 1}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1] text-[0.6rem] sm:text-[0.65rem] whitespace-nowrap">
                      {formatDateTime(intervention.datetime)}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1] max-w-[100px] truncate" title={intervention.pharmacy_site || ''}>
                      {intervention.pharmacy_site?.slice(0, 14) || '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]">
                      {intervention.pharmacist_id || '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1] font-semibold max-w-[120px] truncate" title={intervention.drug_name || ''}>
                      {intervention.drug_name?.slice(0, 16) || '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]">
                      <span className="inline-block font-mono text-[0.58rem] sm:text-[0.62rem] px-1 sm:px-1.5 py-0.5 bg-[#1A1825] text-white tracking-wide">
                        {ERROR_DISPLAY_NAMES[intervention.error_category] || intervention.error_category || '—'}
                      </span>
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1] max-w-[100px] truncate" title={intervention.practice_setting || ''}>
                      {intervention.practice_setting?.slice(0, 14) || '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]">
                      {getSeverityBadge(intervention.severity_potential)}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]">
                      {intervention.probability_ade ?? '—'}
                    </td>
                    <td
                      className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]"
                      style={{
                        color: cost > 4000 ? '#1A6B38' : cost > 0 ? '#B07018' : '#888099',
                        fontWeight: cost > 0 ? 700 : 400
                      }}
                    >
                      {cost > 0 ? `$${cost.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-r border-[#EAE3D1]">
                      {intervention.time_spent_minutes || '—'}
                    </td>
                    <td className="px-2 sm:px-2.5 py-1.5 sm:py-2 border-b border-[#EAE3D1] max-w-[120px] truncate" title={intervention.prescriber_response || ''}>
                      {intervention.prescriber_response?.replace(/_/g, ' ')?.slice(0, 18) || '—'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 pt-3 border-t border-[#DDD5C0]">
          <div className="font-mono text-[0.6rem] sm:text-[0.65rem] text-[#888099]">
            Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} of {filtered.length}
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="
                font-mono text-[0.6rem] sm:text-[0.65rem] px-2 sm:px-2.5 py-1 font-bold
                border-2 border-[#1A1825] bg-[#F4EFE5] cursor-pointer
                hover:bg-[#1B3460] hover:text-white hover:border-[#1B3460]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F4EFE5] disabled:hover:text-[#1A1825] disabled:hover:border-[#1A1825]
                flex items-center gap-0.5 sm:gap-1
              "
            >
              <ChevronLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <span className="hidden sm:flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => totalPages <= 7 || Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages)
                .map((p, idx, arr) => {
                  const showEllipsis = idx > 0 && arr[idx - 1] !== p - 1;
                  return (
                    <span key={p} className="flex items-center">
                      {showEllipsis && <span className="px-1.5 font-mono text-[0.65rem]">...</span>}
                      <button
                        onClick={() => setPage(p)}
                        className={`
                          font-mono text-[0.65rem] px-2.5 py-1 font-bold
                          border-2 cursor-pointer
                          ${p === currentPage
                            ? 'bg-[#1B3460] text-white border-[#1B3460]'
                            : 'border-[#1A1825] bg-[#F4EFE5] hover:bg-[#1B3460] hover:text-white hover:border-[#1B3460]'
                          }
                        `}
                      >
                        {p}
                      </button>
                    </span>
                  );
                })}
            </span>
            <span className="sm:hidden font-mono text-[0.6rem] px-2 py-1 text-[#888099]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="
                font-mono text-[0.6rem] sm:text-[0.65rem] px-2 sm:px-2.5 py-1 font-bold
                border-2 border-[#1A1825] bg-[#F4EFE5] cursor-pointer
                hover:bg-[#1B3460] hover:text-white hover:border-[#1B3460]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F4EFE5] disabled:hover:text-[#1A1825] disabled:hover:border-[#1A1825]
                flex items-center gap-0.5 sm:gap-1
              "
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
