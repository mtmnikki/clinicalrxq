import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Intervention, InterventionFormData } from '../types';
import { NESBIT_COSTS } from '../lib/constants';

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
        .order('datetime', { ascending: false });

      if (fetchError) throw fetchError;
      setInterventions(data || []);
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
      const costAvoidance = NESBIT_COSTS[formData.probability_ade] || 0;

      const insertData = {
        datetime: formData.datetime,
        pharmacist_id: formData.pharmacist_id || null,
        pharmacy_site: formData.pharmacy_site || null,
        patient_age: formData.patient_age ? parseInt(formData.patient_age) : null,
        patient_gender: formData.patient_gender || null,
        prescriber_npi: formData.prescriber_npi || null,
        prescriber_name: formData.prescriber_name || null,
        prescriber_credentials: formData.prescriber_credentials || null,
        prescriber_location: formData.prescriber_location || null,
        practice_setting: formData.practice_setting || null,
        drug_name: formData.drug_name,
        drug_strength: formData.drug_strength || null,
        strength_unit: formData.strength_unit || null,
        medication_class: formData.medication_class || null,
        medical_condition: formData.medical_condition || null,
        prescription_sig: formData.prescription_sig || null,
        error_category: formData.error_category,
        error_category_other: formData.error_category === 'other' ? formData.error_category_other : null,
        intervention_actions: formData.intervention_actions.length > 0 ? formData.intervention_actions : null,
        intervention_action_other: formData.intervention_actions.includes('other') ? formData.intervention_action_other : null,
        time_spent_minutes: formData.time_spent_minutes ? parseInt(formData.time_spent_minutes) : 0,
        prescriber_response: formData.prescriber_response || null,
        prescriber_response_other: formData.prescriber_response === 'other' ? formData.prescriber_response_other : null,
        new_drug_name: formData.prescriber_response === 'changed_medication' ? formData.new_drug_name || null : null,
        new_drug_strength: formData.prescriber_response === 'changed_medication' ? formData.new_drug_strength || null : null,
        new_strength_unit: formData.prescriber_response === 'changed_medication' ? formData.new_strength_unit || null : null,
        new_medication_class: formData.prescriber_response === 'changed_medication' ? formData.new_medication_class || null : null,
        new_prescription_sig: formData.prescriber_response === 'changed_medication' ? formData.new_prescription_sig || null : null,
        pharmacist_actions: (formData.prescriber_response === 'refused_change' || formData.prescriber_response === 'did_not_respond') && formData.pharmacist_actions.length > 0 ? formData.pharmacist_actions : null,
        severity_potential: formData.severity_potential || null,
        probability_ade: formData.probability_ade ? parseFloat(formData.probability_ade) : null,
        cost_avoidance: costAvoidance,
        clinical_notes: formData.clinical_notes || null
      };

      const { error: insertError } = await supabase
        .from('interventions')
        .insert([insertData]);

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
    refetch: fetchInterventions
  };
}
