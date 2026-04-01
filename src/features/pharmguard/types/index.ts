export interface Intervention {
  id: string;
  created_at: string;
  datetime: string;
  pharmacist_id: string | null;
  pharmacy_site: string | null;
  patient_age: number | null;
  patient_gender: string | null;
  prescriber_npi: string | null;
  prescriber_name: string | null;
  prescriber_credentials: string | null;
  prescriber_location: string | null;
  practice_setting: string | null;
  drug_name: string;
  drug_strength: string | null;
  strength_unit: string | null;
  medication_class: string | null;
  medical_condition: string | null;
  prescription_sig: string | null;
  error_category: string;
  error_category_other: string | null;
  intervention_actions: string[] | null;
  intervention_action_other: string | null;
  time_spent_minutes: number;
  prescriber_response: string | null;
  prescriber_response_other: string | null;
  new_drug_name: string | null;
  new_drug_strength: string | null;
  new_strength_unit: string | null;
  new_medication_class: string | null;
  new_prescription_sig: string | null;
  pharmacist_actions: string[] | null;
  severity_potential: string | null;
  probability_ade: number | null;
  cost_avoidance: number;
  clinical_notes: string | null;
}

export interface InterventionFormData {
  datetime: string;
  pharmacist_id: string;
  pharmacy_site: string;
  patient_age: string;
  patient_gender: string;
  prescriber_npi: string;
  prescriber_name: string;
  prescriber_credentials: string;
  prescriber_location: string;
  practice_setting: string;
  drug_name: string;
  drug_strength: string;
  strength_unit: string;
  medication_class: string;
  medical_condition: string;
  prescription_sig: string;
  error_category: string;
  error_category_other: string;
  intervention_actions: string[];
  intervention_action_other: string;
  time_spent_minutes: string;
  prescriber_response: string;
  prescriber_response_other: string;
  new_drug_name: string;
  new_drug_strength: string;
  new_strength_unit: string;
  new_medication_class: string;
  new_prescription_sig: string;
  pharmacist_actions: string[];
  severity_potential: string;
  probability_ade: string;
  clinical_notes: string;
}

export interface NPIResult {
  number: string;
  name: string;
  credentials: string;
  location: string;
  practiceType: string;
}

export interface DrugSearchResult {
  name: string;
  rxcui?: string;
}
