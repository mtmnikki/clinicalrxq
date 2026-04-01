import { KPICard } from './KPICard';
import { BarChart } from './BarChart';
import { SeverityGrid } from './SeverityGrid';
import { useInterventionDashboard } from '../../hooks/useInterventionDashboard';

export function Dashboard() {
  const {
    stats,
    errorData,
    severityCounts,
    classData,
    outcomeData,
    siteData,
    settingData,
    loading,
    error,
  } = useInterventionDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#1B3460] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 border-[#B81818] bg-[#FAEAEA] px-4 py-6 font-mono text-sm text-[#B81818]">
        Failed to load dashboard data: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="font-serif text-[0.8rem] sm:text-[0.88rem] text-[#888099] italic mb-4 sm:mb-5 pb-3 sm:pb-3.5 border-b border-dashed border-[#DDD5C0]">
        Aggregate surveillance metrics across all connected sites — updated in real time.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
        <KPICard label="Total Interventions" value={stats.total} subtitle="All sites, all time" color="blue" />
        <KPICard label="Cost Avoidance" value={stats.totalCost} subtitle="Nesbit model estimate" color="green" isDollar />
        <KPICard label="Avg. Time / Intervention" value={stats.avgTime} subtitle="minutes per event" color="amber" />
        <KPICard label="High-Risk Events" value={stats.highRisk} subtitle="Potential harm events" color="red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3.5">
        <div className="bg-white/60 border-2 border-[#1A1825] shadow-[3px_3px_0_#1A1825] sm:shadow-[4px_4px_0_#1A1825] p-3 sm:p-5">
          <div className="font-mono text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.1em] sm:tracking-[0.13em] uppercase text-[#3D3B52] mb-3 sm:mb-4 pb-2 border-b border-[#DDD5C0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span>Error Type Distribution</span>
            <span className="font-normal tracking-normal text-[#888099]">count by category</span>
          </div>
          <BarChart data={errorData} emptyMessage="No data logged yet. Submit an intervention to populate charts." />
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
        {siteData.length <= 1 && stats.total > 0 ? (
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
