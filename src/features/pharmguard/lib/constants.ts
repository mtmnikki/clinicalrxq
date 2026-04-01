export const PRACTICE_SETTINGS = [
  'Primary Care',
  'Urgent Care',
  'Hospital / Inpatient',
  'Long-Term Care (LTC)',
  'Specialty Clinic',
  'Emergency Department',
  'Telehealth',
  'OB/GYN',
  'Behavioral Health',
  'Other'
];

export const PRESCRIBER_CREDENTIALS = [
  'MD',
  'DO',
  'NP',
  'PA',
  'CNM',
  'DDS / DMD',
  'Other'
];

export const STRENGTH_UNITS = [
  'mg',
  'mg/ml',
  'mcg',
  'mcg/hr',
  'g',
  'mg/kg',
  'mg/5ml',
  'mEq',
  'units',
  'units/ml',
  '%',
  'IU',
  'Other'
];

export const MEDICAL_CONDITIONS = [
  { group: 'Cardiovascular', options: ['Hypertension', 'Heart Failure', 'Atrial Fibrillation', 'Dyslipidemia', 'Angina / ACS'] },
  { group: 'Endocrine / Metabolic', options: ['Type 2 Diabetes', 'Type 1 Diabetes', 'Thyroid Disorder', 'Obesity'] },
  { group: 'Infectious Disease', options: ['Bacterial Infection (Antibiotic)', 'Urinary Tract Infection', 'Pneumonia', 'Skin / Soft Tissue Infection', 'STI / STD', 'Viral Infection', 'Fungal Infection'] },
  { group: 'Pain / Musculoskeletal', options: ['Acute Pain', 'Chronic Pain', 'Opioid Use Disorder', 'Arthritis', 'Gout'] },
  { group: 'Behavioral Health / Neurology', options: ['Depression', 'Anxiety', 'Bipolar Disorder', 'Schizophrenia / Psychosis', 'ADHD', 'Insomnia', 'Seizure Disorder / Epilepsy'] },
  { group: 'Respiratory', options: ['Asthma', 'COPD', 'Allergic Rhinitis'] },
  { group: 'Pediatric', options: ['Otitis Media', 'Strep Pharyngitis', 'Pediatric Fever / Analgesic'] },
  { group: "Women's Health", options: ['Contraception', 'Hormonal / Menopausal', 'Prenatal'] },
  { group: 'GI / Hepatic', options: ['GERD / PUD', 'Inflammatory Bowel Disease', 'Nausea / Vomiting'] },
];

export const ERROR_CATEGORIES = [
  { value: 'dosage', label: 'Dosage Error', description: 'Too high, too low, wrong frequency' },
  { value: 'drug_selection', label: 'Drug Selection', description: 'Allergy, contraindication, age-related issue' },
  { value: 'drug_interaction', label: 'Drug Interaction', description: 'Serious drug-drug interaction on profile' },
  { value: 'omission', label: 'Omission', description: 'Missing quantity, sig, strength, route, or refills' },
  { value: 'duplication', label: 'Duplication', description: 'Duplicate therapeutic class' },
  { value: 'illegibility', label: 'Illegibility / Ambiguity', description: 'Unreadable or contradictory prescription' },
  { value: 'duration', label: 'Inappropriate Duration', description: 'Antibiotic course length, acute refills' },
  { value: 'formulation', label: 'Formulation Error', description: 'Wrong dosage form, route, or delivery method' },
  { value: 'other', label: 'Other', description: 'Other clinical intervention not listed above' }
];

export const INTERVENTION_ACTIONS = [
  { value: 'phone_call', label: 'Phone Call' },
  { value: 'fax', label: 'Fax' },
  { value: 'secure_message', label: 'Secure Message' },
  { value: 'other', label: 'Other' }
];

export const PRESCRIBER_RESPONSES = [
  { value: 'changed_medication', label: 'Changed Medication' },
  { value: 'cancelled', label: 'Cancelled / Discontinued' },
  { value: 'refused_change', label: 'Refused Change' },
  { value: 'did_not_respond', label: 'Did Not Respond' },
  { value: 'other', label: 'Other' }
];

export const PHARMACIST_ACTIONS = [
  { value: 'refused_dispense', label: 'Refused to Dispense' },
  { value: 'counseled_patient', label: 'Counseled Patient' },
  { value: 'referred', label: 'Referred' },
  { value: 'dispensed_as_written', label: 'Dispensed as Written' }
];

export const SEVERITY_OPTIONS = [
  { value: 'no_harm_admin', label: 'Error caught, did not reach patient (administrative only)' },
  { value: 'reached_no_harm', label: 'Would have reached patient, no harm expected' },
  { value: 'monitoring_required', label: 'Would have required monitoring to prevent harm' },
  { value: 'temporary_harm', label: 'Would have caused temporary harm, intervention required' },
  { value: 'hospitalization', label: 'Would have caused temporary harm requiring hospitalization' },
  { value: 'permanent_harm', label: 'Would have caused permanent patient harm' },
  { value: 'life_sustaining', label: 'Would have required life-sustaining intervention' },
  { value: 'death', label: 'Could have contributed to or caused patient death' }
];

export const PROBABILITY_OPTIONS = [
  { value: '0', label: 'None — Administrative error, no patient harm likely' },
  { value: '0.01', label: 'Very Low — Harm unlikely, negligible if any' },
  { value: '0.1', label: 'Low — Small chance of minor adverse event' },
  { value: '0.4', label: 'Medium — Significant risk, likely doctor visit/monitoring' },
  { value: '0.6', label: 'High — High risk, likely ER visit or hospitalization' }
];

export const NESBIT_COSTS: Record<string, number> = {
  '0': 0,
  '0.01': 200,
  '0.1': 750,
  '0.4': 3800,
  '0.6': 9500
};

export const SEVERITY_META: Record<string, { label: string; color: string; bg: string; tier: string }> = {
  'no_harm_admin': { label: 'No Harm / Admin', color: '#8888AA', bg: '#E8E8F0', tier: 'ab' },
  'reached_no_harm': { label: 'No Harm', color: '#4472C4', bg: '#D8E8FF', tier: 'cd' },
  'monitoring_required': { label: 'Monitoring Required', color: '#2255AA', bg: '#CCE0FF', tier: 'cd' },
  'temporary_harm': { label: 'Temporary Harm', color: '#B07018', bg: '#FDF5E6', tier: 'ef' },
  'hospitalization': { label: 'Hospitalization', color: '#906010', bg: '#FEF0D0', tier: 'ef' },
  'permanent_harm': { label: 'Permanent Harm', color: '#B81818', bg: '#FAEAEA', tier: 'ghi' },
  'life_sustaining': { label: 'Life-Sustaining', color: '#A00000', bg: '#FFDCDC', tier: 'ghi' },
  'death': { label: 'Patient Death', color: '#800000', bg: '#FFD0D0', tier: 'ghi' }
};

export const MEDICATION_CLASSES: Record<string, string[]> = {
  'antibiotic': ['amoxicillin', 'azithromycin', 'ciprofloxacin', 'doxycycline', 'cephalexin', 'metronidazole', 'trimethoprim', 'sulfamethoxazole', 'levofloxacin', 'clindamycin', 'penicillin', 'nitrofurantoin'],
  'anticoagulant': ['warfarin', 'heparin', 'enoxaparin', 'rivaroxaban', 'apixaban', 'dabigatran', 'edoxaban', 'clopidogrel', 'ticagrelor'],
  'antidiabetic': ['metformin', 'insulin', 'glipizide', 'glyburide', 'glimepiride', 'sitagliptin', 'liraglutide', 'semaglutide', 'empagliflozin', 'dapagliflozin', 'canagliflozin', 'pioglitazone'],
  'antihypertensive': ['lisinopril', 'amlodipine', 'losartan', 'metoprolol', 'atenolol', 'carvedilol', 'valsartan', 'olmesartan', 'hydrochlorothiazide', 'furosemide', 'spironolactone'],
  'antiepileptic': ['levetiracetam', 'phenytoin', 'carbamazepine', 'valproic', 'lamotrigine', 'gabapentin', 'pregabalin', 'topiramate', 'oxcarbazepine'],
  'antifungal': ['fluconazole', 'itraconazole', 'nystatin', 'clotrimazole', 'ketoconazole', 'terbinafine', 'amphotericin'],
  'antiviral': ['acyclovir', 'valacyclovir', 'oseltamivir', 'tenofovir', 'emtricitabine', 'ribavirin'],
  'benzodiazepine': ['alprazolam', 'lorazepam', 'diazepam', 'clonazepam', 'temazepam', 'triazolam', 'midazolam', 'zolpidem', 'eszopiclone'],
  'cardiovascular': ['digoxin', 'amiodarone', 'diltiazem', 'verapamil', 'nitroglycerin', 'isosorbide', 'ranolazine', 'dronedarone'],
  'opioid': ['hydrocodone', 'oxycodone', 'morphine', 'fentanyl', 'codeine', 'tramadol', 'buprenorphine', 'methadone', 'hydromorphone', 'tapentadol'],
  'stimulant': ['amphetamine', 'methylphenidate', 'lisdexamfetamine', 'dextroamphetamine', 'modafinil'],
  'corticosteroid': ['prednisone', 'prednisolone', 'dexamethasone', 'hydrocortisone', 'methylprednisolone', 'budesonide', 'fluticasone', 'triamcinolone'],
  'diuretic': ['furosemide', 'hydrochlorothiazide', 'spironolactone', 'chlorthalidone', 'bumetanide', 'torsemide', 'metolazone', 'triamterene'],
  'hormonal': ['levonorgestrel', 'ethinyl', 'estradiol', 'medroxyprogesterone', 'norethindrone', 'conjugated estrogens', 'testosterone'],
  'immunosuppressant': ['tacrolimus', 'cyclosporine', 'mycophenolate', 'azathioprine', 'adalimumab', 'etanercept', 'infliximab'],
  'nsaid': ['ibuprofen', 'naproxen', 'meloxicam', 'celecoxib', 'diclofenac', 'indomethacin', 'ketorolac', 'piroxicam'],
  'ssri': ['sertraline', 'fluoxetine', 'escitalopram', 'citalopram', 'paroxetine', 'fluvoxamine', 'venlafaxine', 'duloxetine', 'desvenlafaxine'],
  'antipsychotic': ['quetiapine', 'risperidone', 'olanzapine', 'aripiprazole', 'haloperidol', 'ziprasidone', 'paliperidone', 'clozapine', 'lurasidone'],
  'mood_stabilizer': ['lithium', 'valproate', 'lamotrigine', 'carbamazepine'],
  'respiratory': ['albuterol', 'fluticasone', 'budesonide', 'montelukast', 'tiotropium', 'ipratropium', 'formoterol', 'salmeterol'],
  'thyroid': ['levothyroxine', 'liothyronine', 'methimazole', 'propylthiouracil'],
  'proton_pump': ['omeprazole', 'pantoprazole', 'esomeprazole', 'lansoprazole', 'rabeprazole', 'famotidine', 'ranitidine']
};

export const CLASS_DISPLAY_NAMES: Record<string, string> = {
  'antibiotic': 'Antibiotic / Antimicrobial',
  'anticoagulant': 'Anticoagulant / Antithrombotic',
  'antidiabetic': 'Antidiabetic / Insulin',
  'antihypertensive': 'Antihypertensive',
  'antiepileptic': 'Antiepileptic',
  'antifungal': 'Antifungal',
  'antiviral': 'Antiviral',
  'benzodiazepine': 'Benzodiazepine / Sedative',
  'cardiovascular': 'Cardiovascular (non-HTN)',
  'opioid': 'Controlled Substance — Opioid',
  'stimulant': 'Controlled Substance — Stimulant',
  'corticosteroid': 'Corticosteroid',
  'diuretic': 'Diuretic',
  'hormonal': 'Hormonal / Contraceptive',
  'immunosuppressant': 'Immunosuppressant / Biologic',
  'nsaid': 'NSAID',
  'ssri': 'Psychiatric — Antidepressant (SSRI/SNRI)',
  'antipsychotic': 'Psychiatric — Antipsychotic',
  'mood_stabilizer': 'Psychiatric — Mood Stabilizer',
  'respiratory': 'Respiratory',
  'thyroid': 'Thyroid',
  'proton_pump': 'Gastrointestinal — PPI/H2 Blocker',
  'other': 'Other'
};
