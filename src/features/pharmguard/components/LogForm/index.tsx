import { useState, useEffect, useCallback } from 'react';
import { Zap, Loader as Loader2 } from 'lucide-react';
import { FormSection } from './FormSection';
import { FormField } from './FormField';
import { CheckboxGroup } from './CheckboxGroup';
import { DrugAutocomplete } from './DrugAutocomplete';
import { useNPILookup } from '../../hooks/useNPILookup';
import { useMedicationClass } from '../../hooks/useMedicationClass';
import type { InterventionFormData } from '../../types';
import {
  PRACTICE_SETTINGS,
  PRESCRIBER_CREDENTIALS,
  STRENGTH_UNITS,
  MEDICAL_CONDITIONS,
  ERROR_CATEGORIES,
  INTERVENTION_ACTIONS,
  PRESCRIBER_RESPONSES,
  PHARMACIST_ACTIONS,
  SEVERITY_OPTIONS,
  PROBABILITY_OPTIONS,
  NESBIT_COSTS,
  SEVERITY_META
} from '../../lib/constants';

interface LogFormProps {
  pharmacySite: string;
  pharmacistId: string;
  onSubmit: (data: InterventionFormData) => Promise<boolean>;
}

const initialFormData: InterventionFormData = {
  datetime: '',
  pharmacist_id: '',
  pharmacy_site: '',
  patient_age: '',
  patient_gender: '',
  prescriber_npi: '',
  prescriber_name: '',
  prescriber_credentials: '',
  prescriber_location: '',
  practice_setting: '',
  drug_name: '',
  drug_strength: '',
  strength_unit: '',
  medication_class: '',
  medical_condition: '',
  prescription_sig: '',
  error_category: '',
  error_category_other: '',
  intervention_actions: [],
  intervention_action_other: '',
  time_spent_minutes: '',
  prescriber_response: '',
  prescriber_response_other: '',
  new_drug_name: '',
  new_drug_strength: '',
  new_strength_unit: '',
  new_medication_class: '',
  new_prescription_sig: '',
  pharmacist_actions: [],
  severity_potential: '',
  probability_ade: '',
  clinical_notes: ''
};

export function LogForm({ pharmacySite, pharmacistId, onSubmit }: LogFormProps) {
  const [formData, setFormData] = useState<InterventionFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof InterventionFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [npiLookupLoading, setNpiLookupLoading] = useState(false);

  const { lookupNPI } = useNPILookup();
  const { detectClass } = useMedicationClass();

  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const local = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setFormData((prev) => ({
      ...prev,
      datetime: local,
      pharmacy_site: pharmacySite,
      pharmacist_id: pharmacistId
    }));
  }, [pharmacySite, pharmacistId]);

  const updateField = useCallback(<K extends keyof InterventionFormData>(field: K, value: InterventionFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleNPIChange = async (npi: string) => {
    updateField('prescriber_npi', npi);

    if (npi.length === 10) {
      setNpiLookupLoading(true);
      const result = await lookupNPI(npi);
      setNpiLookupLoading(false);

      if (result) {
        setFormData((prev) => ({
          ...prev,
          prescriber_name: result.name,
          prescriber_credentials: result.credentials || prev.prescriber_credentials,
          prescriber_location: result.location || prev.prescriber_location,
          practice_setting: result.practiceType || prev.practice_setting
        }));
      }
    }
  };

  const handleDrugSelect = (drugName: string) => {
    const detectedClass = detectClass(drugName);
    if (detectedClass) {
      updateField('medication_class', detectedClass);
    }
  };

  const handleNewDrugSelect = (drugName: string) => {
    const detectedClass = detectClass(drugName);
    if (detectedClass) {
      updateField('new_medication_class', detectedClass);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InterventionFormData, string>> = {};

    if (!formData.datetime) newErrors.datetime = 'Required';
    if (!formData.patient_age) newErrors.patient_age = 'Required';
    if (!formData.practice_setting) newErrors.practice_setting = 'Required';
    if (!formData.drug_name) newErrors.drug_name = 'Required';
    if (!formData.medical_condition) newErrors.medical_condition = 'Required';
    if (!formData.error_category) newErrors.error_category = 'Required';
    if (formData.error_category === 'other' && !formData.error_category_other) {
      newErrors.error_category_other = 'Please specify';
    }
    if (!formData.time_spent_minutes) newErrors.time_spent_minutes = 'Required';
    if (!formData.prescriber_response) newErrors.prescriber_response = 'Required';
    if (formData.prescriber_response === 'other' && !formData.prescriber_response_other) {
      newErrors.prescriber_response_other = 'Please specify';
    }
    if (!formData.severity_potential) newErrors.severity_potential = 'Required';
    if (!formData.probability_ade) newErrors.probability_ade = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    const success = await onSubmit(formData);
    setSubmitting(false);

    if (success) {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const local = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
      setFormData({
        ...initialFormData,
        datetime: local,
        pharmacy_site: pharmacySite,
        pharmacist_id: pharmacistId
      });
    }
  };

  const costAvoidance = NESBIT_COSTS[formData.probability_ade] || 0;
  const severityInfo = SEVERITY_META[formData.severity_potential];

  const showPharmacistActions = formData.prescriber_response === 'refused_change' || formData.prescriber_response === 'did_not_respond';
  const showNewMedication = formData.prescriber_response === 'changed_medication';

  const inputClass = (hasError: boolean) => `
    font-mono text-[0.82rem] text-[#1A1825] bg-[#F4EFE5]
    border-2 border-[#1A1825] px-2.5 py-2 outline-none w-full
    transition-shadow focus:shadow-[2px_2px_0_#1A1825] focus:border-[#254FA0]
    ${hasError ? 'border-[#B81818] bg-[#FAEAEA]' : ''}
  `;

  const selectClass = (hasError: boolean) => `
    font-mono text-[0.82rem] text-[#1A1825] bg-[#F4EFE5]
    border-2 border-[#1A1825] px-2.5 py-2 pr-7 outline-none w-full cursor-pointer
    transition-shadow focus:shadow-[2px_2px_0_#1A1825] focus:border-[#254FA0]
    appearance-none bg-no-repeat bg-[right_10px_center]
    bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231A1825'/%3E%3C/svg%3E")]
    ${hasError ? 'border-[#B81818] bg-[#FAEAEA]' : ''}
  `;

  return (
    <div>
      <div className="bg-[#EAF0FD] border border-[#254FA0] px-3 sm:px-3.5 py-2 font-mono text-[0.62rem] sm:text-[0.68rem] text-[#1B3460] mb-4 sm:mb-5 flex items-start sm:items-center gap-2">
        <Zap className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
        <span>All fields marked <span className="text-[#B81818] mx-0.5">*</span> are required for cost avoidance calculation. Drug name autofills from NIH RxNorm database.</span>
      </div>

      <FormSection number="01" title="Encounter Details" description="Timestamp & identifiers">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          <FormField label="Date & Time" required error={errors.datetime} className="sm:col-span-2">
            <input
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) => updateField('datetime', e.target.value)}
              className={inputClass(!!errors.datetime)}
            />
          </FormField>
          <FormField label="Pharmacist ID">
            <input
              type="text"
              value={formData.pharmacist_id}
              onChange={(e) => updateField('pharmacist_id', e.target.value)}
              placeholder="Initials/ID (auto-filled)"
              maxLength={10}
              className={inputClass(false)}
            />
          </FormField>
          <FormField label="Pharmacy Site">
            <input
              type="text"
              value={formData.pharmacy_site}
              readOnly
              placeholder="Auto-filled from header"
              className={`${inputClass(false)} bg-[#EAE3D1]`}
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection number="02" title="Patient & Prescriber" description="De-identified per HIPAA protocol">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
          <FormField label="Patient Age" required error={errors.patient_age}>
            <input
              type="number"
              value={formData.patient_age}
              onChange={(e) => updateField('patient_age', e.target.value)}
              placeholder="years"
              min={0}
              max={120}
              className={inputClass(!!errors.patient_age)}
            />
          </FormField>
          <FormField label="Patient Gender">
            <select
              value={formData.patient_gender}
              onChange={(e) => updateField('patient_gender', e.target.value)}
              className={selectClass(false)}
            >
              <option value="">— Select —</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other / Unspecified</option>
            </select>
          </FormField>
          <FormField label="Prescriber NPI">
            <div className="relative">
              <input
                type="text"
                value={formData.prescriber_npi}
                onChange={(e) => handleNPIChange(e.target.value)}
                placeholder="10-digit NPI"
                maxLength={10}
                pattern="[0-9]{10}"
                className={inputClass(false)}
              />
              {npiLookupLoading && (
                <Loader2 className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 animate-spin text-[#254FA0]" />
              )}
            </div>
          </FormField>
          <FormField label="Prescriber Name">
            <input
              type="text"
              value={formData.prescriber_name}
              onChange={(e) => updateField('prescriber_name', e.target.value)}
              placeholder="Auto-filled from NPI"
              className={`${inputClass(false)} ${formData.prescriber_name ? 'bg-[#E8F5EE]' : ''}`}
            />
          </FormField>
          <FormField label="Prescriber Credentials">
            <select
              value={formData.prescriber_credentials}
              onChange={(e) => updateField('prescriber_credentials', e.target.value)}
              className={`${selectClass(false)} ${formData.prescriber_credentials ? 'bg-[#E8F5EE]' : ''}`}
            >
              <option value="">— Select —</option>
              {PRESCRIBER_CREDENTIALS.map((cred) => (
                <option key={cred} value={cred}>{cred}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Prescriber Location">
            <input
              type="text"
              value={formData.prescriber_location}
              onChange={(e) => updateField('prescriber_location', e.target.value)}
              placeholder="City/State or ZIP"
              maxLength={40}
              className={`${inputClass(false)} ${formData.prescriber_location ? 'bg-[#E8F5EE]' : ''}`}
            />
          </FormField>
          <FormField label="Practice Setting" required error={errors.practice_setting} className="sm:col-span-2 md:col-span-3">
            <select
              value={formData.practice_setting}
              onChange={(e) => updateField('practice_setting', e.target.value)}
              className={`${selectClass(!!errors.practice_setting)} ${formData.practice_setting && !errors.practice_setting ? 'bg-[#E8F5EE]' : ''}`}
            >
              <option value="">— Select —</option>
              {PRACTICE_SETTINGS.map((setting) => (
                <option key={setting} value={setting}>{setting}</option>
              ))}
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection number="03" title="Medication Details" description="NIH RxNorm autocomplete enabled">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
          <FormField label="Medication Name (Generic)" required error={errors.drug_name} className="sm:col-span-2">
            <DrugAutocomplete
              value={formData.drug_name}
              onChange={(v) => updateField('drug_name', v)}
              onSelect={handleDrugSelect}
              hasError={!!errors.drug_name}
            />
          </FormField>
          <FormField label="Medication Class (Auto-detected)">
            <input
              type="text"
              value={formData.medication_class}
              onChange={(e) => updateField('medication_class', e.target.value)}
              placeholder="Auto-detected from drug name"
              className={`${inputClass(false)} ${formData.medication_class ? 'bg-[#E8F5EE]' : ''}`}
            />
          </FormField>
          <FormField label="Strength">
            <input
              type="text"
              value={formData.drug_strength}
              onChange={(e) => updateField('drug_strength', e.target.value)}
              placeholder="e.g. 500 mg / 5 mL"
              className={inputClass(false)}
            />
          </FormField>
          <FormField label="Strength Unit">
            <select
              value={formData.strength_unit}
              onChange={(e) => updateField('strength_unit', e.target.value)}
              className={selectClass(false)}
            >
              <option value="">— Select —</option>
              {STRENGTH_UNITS.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Medical Condition / Indication" required error={errors.medical_condition}>
            <select
              value={formData.medical_condition}
              onChange={(e) => updateField('medical_condition', e.target.value)}
              className={selectClass(!!errors.medical_condition)}
            >
              <option value="">— Select —</option>
              {MEDICAL_CONDITIONS.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Other">Other / Unknown</option>
            </select>
          </FormField>
          <FormField label="Prescription SIG (Directions)" className="sm:col-span-2 md:col-span-3">
            <input
              type="text"
              value={formData.prescription_sig}
              onChange={(e) => updateField('prescription_sig', e.target.value)}
              placeholder="e.g., Take 1 tablet by mouth twice daily for 10 days"
              maxLength={200}
              className={inputClass(false)}
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection number="04" title="Error Classification" description="Select error type and intervention taken">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          <FormField label="Error Category" required error={errors.error_category}>
            <select
              value={formData.error_category}
              onChange={(e) => updateField('error_category', e.target.value)}
              className={selectClass(!!errors.error_category)}
            >
              <option value="">— Select Error Type —</option>
              {ERROR_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} — {cat.description}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Intervention Taken">
            <CheckboxGroup
              options={INTERVENTION_ACTIONS}
              selected={formData.intervention_actions}
              onChange={(v) => updateField('intervention_actions', v)}
            />
          </FormField>
          {formData.error_category === 'other' && (
            <FormField label="Please Specify Error" required error={errors.error_category_other} className="sm:col-span-2">
              <input
                type="text"
                value={formData.error_category_other}
                onChange={(e) => updateField('error_category_other', e.target.value)}
                placeholder="Describe the error type..."
                className={inputClass(!!errors.error_category_other)}
              />
            </FormField>
          )}
          {formData.intervention_actions.includes('other') && (
            <FormField label="Please Specify Intervention" className="sm:col-span-2">
              <input
                type="text"
                value={formData.intervention_action_other}
                onChange={(e) => updateField('intervention_action_other', e.target.value)}
                placeholder="Describe the intervention taken..."
                className={inputClass(false)}
              />
            </FormField>
          )}
        </div>
      </FormSection>

      <FormSection number="05" title="Resolution & Severity Analysis" description="Outcome assessment and cost avoidance">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-3.5">
          <FormField label="Time Spent (minutes)" required error={errors.time_spent_minutes}>
            <input
              type="number"
              value={formData.time_spent_minutes}
              onChange={(e) => updateField('time_spent_minutes', e.target.value)}
              placeholder="0"
              min={0}
              max={600}
              className={inputClass(!!errors.time_spent_minutes)}
            />
          </FormField>
          <FormField label="Prescriber Response" required error={errors.prescriber_response} className="sm:col-span-1 md:col-span-2">
            <select
              value={formData.prescriber_response}
              onChange={(e) => updateField('prescriber_response', e.target.value)}
              className={selectClass(!!errors.prescriber_response)}
            >
              <option value="">— Select Response —</option>
              {PRESCRIBER_RESPONSES.map((resp) => (
                <option key={resp.value} value={resp.value}>{resp.label}</option>
              ))}
            </select>
          </FormField>

          {formData.prescriber_response === 'other' && (
            <FormField label="Please Specify Response" required error={errors.prescriber_response_other} className="sm:col-span-2 md:col-span-3">
              <input
                type="text"
                value={formData.prescriber_response_other}
                onChange={(e) => updateField('prescriber_response_other', e.target.value)}
                placeholder="Describe the prescriber's response..."
                className={inputClass(!!errors.prescriber_response_other)}
              />
            </FormField>
          )}

          {showPharmacistActions && (
            <FormField label="Pharmacist Action" className="sm:col-span-2 md:col-span-3">
              <CheckboxGroup
                options={PHARMACIST_ACTIONS}
                selected={formData.pharmacist_actions}
                onChange={(v) => updateField('pharmacist_actions', v)}
              />
            </FormField>
          )}

          {showNewMedication && (
            <>
              <div className="sm:col-span-2 md:col-span-3 border-t border-dashed border-[#DDD5C0] my-2" />
              <div className="sm:col-span-2 md:col-span-3 font-mono text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#1B3460] mb-1">
                New Medication Information
              </div>
              <FormField label="New Medication Name" className="sm:col-span-2">
                <DrugAutocomplete
                  value={formData.new_drug_name}
                  onChange={(v) => updateField('new_drug_name', v)}
                  onSelect={handleNewDrugSelect}
                  placeholder="Begin typing new drug name..."
                />
              </FormField>
              <FormField label="Medication Class (Auto-detected)">
                <input
                  type="text"
                  value={formData.new_medication_class}
                  onChange={(e) => updateField('new_medication_class', e.target.value)}
                  placeholder="Auto-detected"
                  className={`${inputClass(false)} ${formData.new_medication_class ? 'bg-[#E8F5EE]' : ''}`}
                />
              </FormField>
              <FormField label="New Strength">
                <input
                  type="text"
                  value={formData.new_drug_strength}
                  onChange={(e) => updateField('new_drug_strength', e.target.value)}
                  placeholder="e.g. 250/5"
                  className={inputClass(false)}
                />
              </FormField>
              <FormField label="Strength Unit">
                <select
                  value={formData.new_strength_unit}
                  onChange={(e) => updateField('new_strength_unit', e.target.value)}
                  className={selectClass(false)}
                >
                  <option value="">— Select —</option>
                  {STRENGTH_UNITS.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </FormField>
              <FormField label="New Prescription SIG">
                <input
                  type="text"
                  value={formData.new_prescription_sig}
                  onChange={(e) => updateField('new_prescription_sig', e.target.value)}
                  placeholder="New directions..."
                  className={inputClass(false)}
                />
              </FormField>
            </>
          )}

          <div className="sm:col-span-2 md:col-span-3 border-t border-dashed border-[#DDD5C0] my-2" />

          <FormField
            label="Severity Potential (if pharmacist had not intervened)"
            required
            error={errors.severity_potential}
            className="sm:col-span-2"
          >
            <select
              value={formData.severity_potential}
              onChange={(e) => updateField('severity_potential', e.target.value)}
              className={selectClass(!!errors.severity_potential)}
            >
              <option value="">— Select Category —</option>
              {SEVERITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {severityInfo && (
              <div
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] sm:text-[0.7rem] mt-1 px-2 py-0.5 border"
                style={{
                  backgroundColor: severityInfo.bg,
                  color: severityInfo.color,
                  borderColor: severityInfo.color
                }}
              >
                <strong>{severityInfo.label}</strong>
              </div>
            )}
          </FormField>

          <FormField label="Probability of ADE" required error={errors.probability_ade}>
            <select
              value={formData.probability_ade}
              onChange={(e) => updateField('probability_ade', e.target.value)}
              className={selectClass(!!errors.probability_ade)}
            >
              <option value="">— Select Probability —</option>
              {PROBABILITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {formData.probability_ade && (
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 font-mono text-[0.7rem] sm:text-[0.75rem] mt-1.5 px-2 sm:px-3 py-1.5 sm:py-2 border"
                style={{
                  backgroundColor: costAvoidance === 0 ? '#f0f0f0' : costAvoidance < 1000 ? '#E8F5EE' : costAvoidance < 5000 ? '#FDF5E6' : '#FAEAEA',
                  borderColor: costAvoidance === 0 ? '#aaa' : costAvoidance < 1000 ? '#1A6B38' : costAvoidance < 5000 ? '#B07018' : '#B81818',
                  color: costAvoidance === 0 ? '#777' : costAvoidance < 1000 ? '#1A6B38' : costAvoidance < 5000 ? '#B07018' : '#B81818'
                }}
              >
                <span>Estimated cost avoidance:</span>
                <span className="text-[1rem] sm:text-[1.1rem] font-bold">
                  {costAvoidance > 0 ? `$${costAvoidance.toLocaleString()}` : '$0 (administrative)'}
                </span>
              </div>
            )}
          </FormField>

          <FormField label="Clinical Notes" className="sm:col-span-2 md:col-span-3">
            <textarea
              value={formData.clinical_notes}
              onChange={(e) => updateField('clinical_notes', e.target.value)}
              placeholder="Optional: additional clinical context, drug interaction details, specific concern notes..."
              className={`${inputClass(false)} min-h-[70px] resize-y leading-relaxed`}
            />
          </FormField>
        </div>
      </FormSection>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="
          w-full px-4 py-4 bg-[#1B3460] text-white
          border-2 border-[#1A1825] shadow-[4px_4px_0_#1B3460]
          font-serif text-base font-bold tracking-wide cursor-pointer
          transition-all flex items-center justify-center gap-2.5
          hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_#1A1825]
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1A1825]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          mt-2
        "
      >
        {submitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span className="text-lg">✦</span>
            Log This Intervention
          </>
        )}
      </button>
    </div>
  );
}
