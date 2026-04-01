import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ERROR_CATEGORIES, PRESCRIBER_RESPONSES, SEVERITY_OPTIONS } from '../lib/constants';
import type { Database } from '../../../types/supabase';

type KPIRow = Database['public']['Views']['intervention_kpis']['Row'];
type ErrorRow = Database['public']['Views']['intervention_errors']['Row'];
type SeverityRow = Database['public']['Views']['intervention_severity']['Row'];
type DrugClassRow = Database['public']['Views']['intervention_drug_classes']['Row'];
type ResponseRow = Database['public']['Views']['intervention_responses']['Row'];
type SiteRow = Database['public']['Views']['intervention_by_site']['Row'];
type SettingRow = Database['public']['Views']['intervention_by_setting']['Row'];

interface ChartDatum {
  label: string;
  count: number;
  color: string;
}

interface DashboardData {
  stats: {
    total: number;
    totalCost: number;
    avgTime: number;
    highRisk: number;
  };
  errorData: ChartDatum[];
  severityCounts: Record<string, number>;
  classData: ChartDatum[];
  outcomeData: ChartDatum[];
  siteData: ChartDatum[];
  settingData: ChartDatum[];
}

const BAR_COLORS = [
  '#1B3460', '#254FA0', '#1A6B38', '#B07018', '#B81818',
  '#0A6B72', '#6B3A8A', '#3E7A30', '#7A4B18', '#B84080',
];

const ERROR_DISPLAY_NAMES: Record<string, string> = {};
ERROR_CATEGORIES.forEach((cat) => {
  ERROR_DISPLAY_NAMES[cat.value] = cat.label;
});

const RESPONSE_DISPLAY_NAMES: Record<string, string> = {};
PRESCRIBER_RESPONSES.forEach((resp) => {
  RESPONSE_DISPLAY_NAMES[resp.value] = resp.label;
});

const SEVERITY_KEYS = SEVERITY_OPTIONS.map((opt) => opt.value);

function mapCountRows<T extends { count: number | null }>(
  rows: T[] | null,
  getLabel: (row: T) => string,
  colorPicker?: (label: string, idx: number) => string
): ChartDatum[] {
  return (rows || [])
    .map((row, idx) => {
      const label = getLabel(row);
      return {
        label,
        count: row.count || 0,
        color: colorPicker ? colorPicker(label, idx) : BAR_COLORS[idx % BAR_COLORS.length],
      };
    })
    .filter((row) => row.count > 0);
}

export function useInterventionDashboard() {
  const [data, setData] = useState<DashboardData>({
    stats: { total: 0, totalCost: 0, avgTime: 0, highRisk: 0 },
    errorData: [],
    severityCounts: Object.fromEntries(SEVERITY_KEYS.map((key) => [key, 0])),
    classData: [],
    outcomeData: [],
    siteData: [],
    settingData: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        kpiResult,
        errorResult,
        severityResult,
        classResult,
        responseResult,
        siteResult,
        settingResult,
      ] = await Promise.all([
        supabase.from('intervention_kpis').select('*').single(),
        supabase.from('intervention_errors').select('*').order('count', { ascending: false }),
        supabase.from('intervention_severity').select('*').order('count', { ascending: false }),
        supabase.from('intervention_drug_classes').select('*').order('count', { ascending: false }),
        supabase.from('intervention_responses').select('*').order('count', { ascending: false }),
        supabase.from('intervention_by_site').select('*').order('count', { ascending: false }),
        supabase.from('intervention_by_setting').select('*').order('count', { ascending: false }),
      ]);

      const results = [kpiResult, errorResult, severityResult, classResult, responseResult, siteResult, settingResult];
      const failed = results.find((result) => result.error);
      if (failed?.error) {
        throw failed.error;
      }

      const kpis = (kpiResult.data as KPIRow | null) || null;
      const severityCounts = Object.fromEntries(SEVERITY_KEYS.map((key) => [key, 0])) as Record<string, number>;
      ((severityResult.data as SeverityRow[] | null) || []).forEach((row) => {
        if (row.severity) {
          severityCounts[row.severity] = row.count || 0;
        }
      });

      setData({
        stats: {
          total: kpis?.total_interventions || 0,
          totalCost: kpis?.total_cost_avoidance || 0,
          avgTime: kpis?.avg_time_min ? Math.round(kpis.avg_time_min) : 0,
          highRisk: kpis?.high_risk_count || 0,
        },
        errorData: mapCountRows(
          errorResult.data as ErrorRow[] | null,
          (row) => ERROR_DISPLAY_NAMES[row.error_category || ''] || row.error_category || 'Unknown'
        ),
        severityCounts,
        classData: mapCountRows(
          classResult.data as DrugClassRow[] | null,
          (row) => {
            const label = row.drug_class || 'Unknown';
            return label.length > 18 ? `${label.slice(0, 17)}...` : label;
          }
        ).slice(0, 8),
        outcomeData: mapCountRows(
          responseResult.data as ResponseRow[] | null,
          (row) => RESPONSE_DISPLAY_NAMES[row.prescriber_response || ''] || row.prescriber_response || 'Unknown',
          (label, idx) => {
            if (label === RESPONSE_DISPLAY_NAMES.changed_medication) return '#1A6B38';
            if (label === RESPONSE_DISPLAY_NAMES.cancelled) return '#B07018';
            if (
              label === RESPONSE_DISPLAY_NAMES.refused_change ||
              label === RESPONSE_DISPLAY_NAMES.did_not_respond
            ) {
              return '#B81818';
            }
            return BAR_COLORS[idx % BAR_COLORS.length];
          }
        ),
        siteData: mapCountRows(
          siteResult.data as SiteRow[] | null,
          (row) => row.pharmacy_site || 'Unknown'
        ),
        settingData: mapCountRows(
          settingResult.data as SettingRow[] | null,
          (row) => row.practice_setting || 'Unknown'
        ),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { ...data, loading, error, refetch: fetchDashboard };
}
