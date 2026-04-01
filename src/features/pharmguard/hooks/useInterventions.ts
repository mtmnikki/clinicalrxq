import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Intervention, InterventionFormData } from '../types';
import { NESBIT_COSTS } from '../lib/constants';
import type { Database } from '../../../types/supabase';

type InterventionRow = Database['public']['Tables']['interventions']['Row'];
type InterventionInsert = Database['public']['Tables']['interventions']['Insert'];

function mapRowToIntervention(row: InterventionRow): Intervention {
  return {
    id: row.id,
    created_at: row.created_at || '',
    datetime: row.encounter_dt || '',
    pharmacist_id: row.pharmacist_id,
    pharmacy_site: row.pharmacy_site,
    patient_age: row.patient_age,
    patient_gender: row.patient_gender,
    prescriber_npi: row.prescriber_npi,
    prescriber_name: row.prescriber_name,
    prescriber_credentials: row.prescriber_credentials,
    prescriber_location: row.prescriber_location,
    practice_setting: row.practice_setting,
    drug_name: row.drug_name || '',
    drug_strength: row.drug_strength,
    strength_unit: row.strength_unit,
    medication_class: row.drug_class,
    medical_condition: row.condition,
    prescription_sig: row.sig,
    error_category: row.error_category || '',
    error_category_other: row.error_category_other,
    intervention_actions: row.actions,
    intervention_action_other: row.action_other,
    time_spent_minutes: row.time_spent_min || 0,
    prescriber_response: row.prescriber_response,
    prescriber_response_other: row.prescriber_response_other,
    new_drug_name: row.new_drug_name,
    new_drug_strength: row.new_drug_strength != null ? String(row.new_drug_strength) : null,
    new_strength_unit: row.new_strength_unit,
    new_medication_class: row.new_drug_class,
    new_prescription_sig: row.new_sig,
    pharmacist_actions: row.pharmacist_actions,
    severity_potential: row.severity,
    probability_ade: row.prob_ade ? parseFloat(row.prob_ade) : null,
    cost_avoidance: row.cost_avoidance || 0,
    clinical_notes: row.clinical_notes,
  };
}

function mapFormToInsert(formData: InterventionFormData): InterventionInsert {
  const costAvoidance = NESBIT_COSTS[formData.probability_ade] || 0;

  return {
    encounter_dt: formData.datetime,
    pharmacist_id: formData.pharmacist_id || null,
    pharmacy_site: formData.pharmacy_site || null,
    patient_age: formData.patient_age ? parseInt(formData.patient_age, 10) : null,
    patient_gender: formData.patient_gender || null,
    prescriber_npi: formData.prescriber_npi || null,
    prescriber_name: formData.prescriber_name || null,
    prescriber_credentials: formData.prescriber_credentials || null,
    prescriber_location: formData.prescriber_location || null,
    practice_setting: formData.practice_setting || null,
    drug_name: formData.drug_name,
    drug_strength: formData.drug_strength || null,
    strength_unit: formData.strength_unit || null,
    drug_class: formData.medication_class || null,
    condition: formData.medical_condition || null,
    sig: formData.prescription_sig || null,
    error_category: formData.error_category,
    error_category_other: formData.error_category === 'other' ? formData.error_category_other : null,
    actions: formData.intervention_actions.length > 0 ? formData.intervention_actions : null,
    action_other: formData.intervention_actions.includes('other') ? formData.intervention_action_other : null,
    time_spent_min: formData.time_spent_minutes ? parseInt(formData.time_spent_minutes, 10) : 0,
    prescriber_response: formData.prescriber_response || null,
    prescriber_response_other: formData.prescriber_response === 'other' ? formData.prescriber_response_other : null,
    new_drug_name: formData.prescriber_response === 'changed_medication' ? formData.new_drug_name || null : null,
    new_drug_strength:
      formData.prescriber_response === 'changed_medication' && formData.new_drug_strength
        ? parseFloat(formData.new_drug_strength)
        : null,
    new_strength_unit: formData.prescriber_response === 'changed_medication' ? formData.new_strength_unit || null : null,
    new_drug_class: formData.prescriber_response === 'changed_medication' ? formData.new_medication_class || null : null,
    new_sig: formData.prescriber_response === 'changed_medication' ? formData.new_prescription_sig || null : null,
    pharmacist_actions:
      (formData.prescriber_response === 'refused_change' || formData.prescriber_response === 'did_not_respond') &&
      formData.pharmacist_actions.length > 0
        ? formData.pharmacist_actions
        : null,
    severity: formData.severity_potential || null,
    prob_ade: formData.probability_ade || null,
    cost_avoidance: costAvoidance,
    clinical_notes: formData.clinical_notes || null,
  };
}

export function useInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterventions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('interventions')
        .select('*')
        .order('encounter_dt', { ascending: false });

      if (fetchError) throw fetchError;
      setInterventions((data || []).map(mapRowToIntervention));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch interventions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInterventions();
  }, [fetchInterventions]);

  const addIntervention = useCallback(async (formData: InterventionFormData): Promise<boolean> => {
    try {
      const { error: insertError } = await supabase
        .from('interventions')
        .insert([mapFormToInsert(formData)]);

      if (insertError) throw insertError;

      await fetchInterventions();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save intervention');
      return false;
    }
  }, [fetchInterventions]);

  const clearAllInterventions = useCallback(async (): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('interventions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) throw deleteError;

      setInterventions([]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear interventions');
      return false;
    }
  }, []);

  return {
    interventions,
    loading,
    error,
    addIntervention,
    clearAllInterventions,
    refetch: fetchInterventions,
  };
}
