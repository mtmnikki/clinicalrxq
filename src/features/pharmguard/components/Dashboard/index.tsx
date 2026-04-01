import { useMemo } from 'react';
import { KPICard } from './KPICard';
import { BarChart } from './BarChart';
import { SeverityGrid } from './SeverityGrid';
import type { Intervention } from '../../types';
import { ERROR_CATEGORIES, PRESCRIBER_RESPONSES } from '../../lib/constants';

interface DashboardProps {
  interventions: Intervention[];
}

const BAR_COLORS = [
  '#1B3460', '#254FA0', '#1A6B38', '#B07018', '#B81818',
  '#0A6B72', '#6B3A8A', '#3E7A30', '#7A4B18', '#B84080'
];

const ERROR_DISPLAY_NAMES: Record<string, string> = {};
ERROR_CATEGORIES.forEach((cat) => {
  ERROR_DISPLAY_NAMES[cat.value] = cat.label;
});

const RESPONSE_DISPLAY_NAMES: Record<string, string> = {};
PRESCRIBER_RESPONSES.forEach((resp) => {
  RESPONSE_DISPLAY_NAMES[resp.value] = resp.label;
});

export function Dashboard({ interventions }: DashboardProps) {
  const stats = useMemo(() => {
    const total = interventions.length;
    const totalCost = interventions.reduce((sum, i) => sum + (i.cost_avoidance || 0), 0);
    const avgTime = total > 0
      ? Math.round(interventions.reduce((sum, i) => sum + (i.time_spent_minutes || 0), 0) / total)
      : 0;
    const highRisk = interventions.filter((i) =>
      ['temporary_harm', 'hospitalization', 'permanent_harm', 'life_sustaining', 'death'].includes(i.severity_potential || '')
    ).length;

    return { total, totalCost, avgTime, highRisk };
  }, [interventions]);

  const errorData = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      const key = i.error_category || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count], idx) => ({
        label: ERROR_DISPLAY_NAMES[key] || key,
        count,
        color: BAR_COLORS[idx % BAR_COLORS.length]
      }));
  }, [interventions]);

  const severityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      if (i.severity_potential) {
        counts[i.severity_potential] = (counts[i.severity_potential] || 0) + 1;
      }
    });
    return counts;
  }, [interventions]);

  const classData = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      if (i.medication_class) {
        counts[i.medication_class] = (counts[i.medication_class] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([key, count], idx) => ({
        label: key.length > 18 ? key.slice(0, 17) + '...' : key,
        count,
        color: BAR_COLORS[idx % BAR_COLORS.length]
      }));
  }, [interventions]);

  const outcomeData = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      if (i.prescriber_response) {
        counts[i.prescriber_response] = (counts[i.prescriber_response] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count], idx) => {
        let color = BAR_COLORS[idx % BAR_COLORS.length];
        if (key === 'changed_medication') color = '#1A6B38';
        else if (key === 'cancelled') color = '#B07018';
        else if (key === 'refused_change' || key === 'did_not_respond') color = '#B81818';

        return {
          label: RESPONSE_DISPLAY_NAMES[key] || key,
          count,
          color
        };
      });
  }, [interventions]);

  const siteData = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      const site = i.pharmacy_site || 'Unknown';
      counts[site] = (counts[site] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([label, count], idx) => ({
        label,
        count,
        color: BAR_COLORS[idx % BAR_COLORS.length]
      }));
  }, [interventions]);

  const settingData = useMemo(() => {
    const counts: Record<string, number> = {};
    interventions.forEach((i) => {
      if (i.practice_setting) {
        counts[i.practice_setting] = (counts[i.practice_setting] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([label, count], idx) => ({
        label,
        count,
        color: BAR_COLORS[idx % BAR_COLORS.length]
      }));
  }, [interventions]);

  return (
    <div>
      <div className="font-serif text-[0.8rem] sm:text-[0.88rem] text-[#888099] italic mb-4 sm:mb-5 pb-3 sm:pb-3.5 border-b border-dashed border-[#DDD5C0]">
        Aggregate surveillance metrics across all connected sites — updated in real time.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
        <KPICard
          label="Total Interventions"
          value={stats.total}
          subtitle="All sites, all time"
          color="blue"
        />
        <KPICard
          label="Cost Avoidance"
          value={stats.totalCost}
          subtitle="Nesbit model estimate"
          color="green"
          isDollar
        />
        <KPICard
          label="Avg. Time / Intervention"
          value={stats.avgTime}
          subtitle="minutes per event"
          color="amber"
        />
        <KPICard
          label="High-Risk Events"
          value={stats.highRisk}
          subtitle="Potential harm events"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3.5">
        <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
          <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span>Error Type Distribution</span>
            <span className="font-normal tracking-normal text-[#888099]">count by category</span>
          </div>
          <BarChart
            data={errorData}
            emptyMessage="No data logged yet. Submit an intervention to populate charts."
          />
        </div>

        <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
          <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span>Severity Distribution</span>
            <span className="font-normal tracking-normal text-[#888099]">potential if uncaught</span>
          </div>
          <SeverityGrid counts={severityCounts} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3.5">
        <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
          <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0]">
            Top Medication Classes Involved
          </div>
          <BarChart data={classData} />
        </div>

        <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
          <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0]">
            Prescriber Response Distribution
          </div>
          <BarChart data={outcomeData} />
        </div>
      </div>

      <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5 mb-2.5 sm:mb-3.5">
        <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span>Interventions by Pharmacy Site</span>
          <span className="font-normal tracking-normal text-[#888099]">multi-site aggregation</span>
        </div>
        {siteData.length <= 1 && interventions.length > 0 ? (
          <div>
            <BarChart data={siteData} />
            <div className="font-mono text-[0.6rem] sm:text-[0.65rem] text-[#888099] mt-2 italic">
              Aggregate view activates when multiple pharmacy sites log entries.
            </div>
          </div>
        ) : (
          <BarChart
            data={siteData}
            emptyMessage="No data yet. Once multiple sites log entries, site comparison will appear here."
          />
        )}
      </div>

      <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
        <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0]">
          Errors by Prescriber Practice Setting
        </div>
        <BarChart data={settingData} />
      </div>
    </div>
  );
}
