import { 
  Patient, 
  MedicalReport, 
  LabResult, 
  Medication, 
  Diagnosis, 
  TimelineEvent, 
  AuditLogEntry 
} from '../types';

export const mockPatient: Patient = {
  id: 'pt-8942',
  mrn: 'ML-2026-8942',
  name: 'Alex Morgan',
  age: 34,
  dob: '1992-04-14',
  gender: 'Female',
  bloodGroup: 'O Positive (O+)',
  emergencyContact: {
    name: 'David Morgan',
    relation: 'Spouse',
    phone: '+1 (555) 234-8901',
  },
  allergies: ['Penicillin (Moderate Rash)', 'Sulfa Drugs (Mild Hives)'],
  chronicConditions: ['Iron Deficiency Anemia (Improving)', 'Subclinical Hypothyroidism (Controlled)'],
  totalReports: 12,
  lastUpdated: 'Today at 09:42 AM',
};

export const mockLabResults: LabResult[] = [
  {
    id: 'lab-01',
    testName: 'Hemoglobin (Hgb)',
    normalizedName: 'Hemoglobin',
    value: 13.4,
    numericValue: 13.4,
    unit: 'g/dL',
    referenceRange: '12.0 – 16.0',
    minRange: 12.0,
    maxRange: 16.0,
    status: 'Normal',
    date: '2026-09-10',
    category: 'Hematology',
    interpretation: 'Optimal range. Showed consistent improvement from 11.2 g/dL following iron supplementation.',
    sourceReportId: 'rep-01',
    sourceReportTitle: 'CBC Blood Test',
  },
  {
    id: 'lab-02',
    testName: 'White Blood Cell Count (WBC)',
    normalizedName: 'White Blood Cells',
    value: 7200,
    numericValue: 7200,
    unit: '/µL',
    referenceRange: '4,000 – 11,000',
    minRange: 4000,
    maxRange: 11000,
    status: 'Normal',
    date: '2026-09-10',
    category: 'Hematology',
    interpretation: 'Within normal limits. No signs of systemic infection or leukocytosis.',
    sourceReportId: 'rep-01',
    sourceReportTitle: 'CBC Blood Test',
  },
  {
    id: 'lab-03',
    testName: 'Platelets',
    normalizedName: 'Platelet Count',
    value: 245000,
    numericValue: 245000,
    unit: '/µL',
    referenceRange: '150,000 – 450,000',
    minRange: 150000,
    maxRange: 450000,
    status: 'Normal',
    date: '2026-09-10',
    category: 'Hematology',
    interpretation: 'Normal clotting capability indicated.',
    sourceReportId: 'rep-01',
    sourceReportTitle: 'CBC Blood Test',
  },
  {
    id: 'lab-04',
    testName: 'Thyroid Stimulating Hormone (TSH)',
    normalizedName: 'TSH',
    value: 3.2,
    numericValue: 3.2,
    unit: 'µIU/mL',
    referenceRange: '0.4 – 4.5',
    minRange: 0.4,
    maxRange: 4.5,
    status: 'Normal',
    date: '2026-08-15',
    category: 'Endocrinology',
    interpretation: 'Euthyroid state achieved. Normal response to ongoing low-dose levothyroxine.',
    sourceReportId: 'rep-04',
    sourceReportTitle: 'Comprehensive Thyroid Profile',
  },
  {
    id: 'lab-05',
    testName: 'Free Thyroxine (FT4)',
    normalizedName: 'Free T4',
    value: 1.3,
    numericValue: 1.3,
    unit: 'ng/dL',
    referenceRange: '0.8 – 1.8',
    minRange: 0.8,
    maxRange: 1.8,
    status: 'Normal',
    date: '2026-08-15',
    category: 'Endocrinology',
    interpretation: 'Normal circulating active thyroid hormone.',
    sourceReportId: 'rep-04',
    sourceReportTitle: 'Comprehensive Thyroid Profile',
  },
  {
    id: 'lab-06',
    testName: 'Serum Ferritin',
    normalizedName: 'Ferritin',
    value: 28,
    numericValue: 28,
    unit: 'ng/mL',
    referenceRange: '15 – 150',
    minRange: 15,
    maxRange: 150,
    status: 'Normal',
    date: '2026-05-20',
    category: 'Hematology',
    interpretation: 'Replenished from previous nadir of 14 ng/mL. Iron stores currently stable.',
    sourceReportId: 'rep-06',
    sourceReportTitle: 'Iron Studies & Ferritin Panel',
  },
  {
    id: 'lab-07',
    testName: 'Serum Iron',
    normalizedName: 'Serum Iron',
    value: 74,
    numericValue: 74,
    unit: 'µg/dL',
    referenceRange: '60 – 170',
    minRange: 60,
    maxRange: 170,
    status: 'Normal',
    date: '2026-05-20',
    category: 'Hematology',
    interpretation: 'Satisfactory iron level following therapy.',
    sourceReportId: 'rep-06',
    sourceReportTitle: 'Iron Studies & Ferritin Panel',
  },
  {
    id: 'lab-08',
    testName: 'Fasting Plasma Glucose',
    normalizedName: 'Fasting Blood Glucose',
    value: 89,
    numericValue: 89,
    unit: 'mg/dL',
    referenceRange: '70 – 99',
    minRange: 70,
    maxRange: 99,
    status: 'Normal',
    date: '2026-03-18',
    category: 'Metabolic',
    interpretation: 'Normal glycemic control. No evidence of prediabetes.',
    sourceReportId: 'rep-07',
    sourceReportTitle: 'Lipid & Metabolic Panel',
  },
  {
    id: 'lab-09',
    testName: 'HbA1c (Glycated Hemoglobin)',
    normalizedName: 'HbA1c',
    value: 5.4,
    numericValue: 5.4,
    unit: '%',
    referenceRange: '< 5.7',
    minRange: 4.0,
    maxRange: 5.6,
    status: 'Normal',
    date: '2026-03-18',
    category: 'Metabolic',
    interpretation: 'Excellent average 3-month blood glucose control.',
    sourceReportId: 'rep-07',
    sourceReportTitle: 'Lipid & Metabolic Panel',
  },
  {
    id: 'lab-10',
    testName: 'Total Cholesterol',
    normalizedName: 'Total Cholesterol',
    value: 188,
    numericValue: 188,
    unit: 'mg/dL',
    referenceRange: '< 200',
    minRange: 120,
    maxRange: 199,
    status: 'Normal',
    date: '2026-03-18',
    category: 'Lipid',
    interpretation: 'Desirable lipid profile.',
    sourceReportId: 'rep-07',
    sourceReportTitle: 'Lipid & Metabolic Panel',
  },
  {
    id: 'lab-11',
    testName: 'LDL Cholesterol',
    normalizedName: 'LDL (Bad Cholesterol)',
    value: 104,
    numericValue: 104,
    unit: 'mg/dL',
    referenceRange: '< 100',
    minRange: 50,
    maxRange: 99,
    status: 'Attention',
    date: '2026-03-18',
    category: 'Lipid',
    interpretation: 'Borderline elevated. Lifestyle and dietary adjustments advised.',
    sourceReportId: 'rep-07',
    sourceReportTitle: 'Lipid & Metabolic Panel',
  },
  {
    id: 'lab-12',
    testName: 'Hemoglobin (Hgb) - Historical',
    normalizedName: 'Hemoglobin',
    value: 11.2,
    numericValue: 11.2,
    unit: 'g/dL',
    referenceRange: '12.0 – 16.0',
    minRange: 12.0,
    maxRange: 16.0,
    status: 'Abnormal',
    date: '2026-01-12',
    category: 'Hematology',
    interpretation: 'Mild microcytic anemia diagnosed. Prompted initiation of oral Ferrous Sulfate.',
    sourceReportId: 'rep-08',
    sourceReportTitle: 'Annual Health Check & CBC',
  },
  {
    id: 'lab-13',
    testName: 'Mean Corpuscular Volume (MCV)',
    normalizedName: 'MCV',
    value: 74,
    numericValue: 74,
    unit: 'fL',
    referenceRange: '80 – 100',
    minRange: 80,
    maxRange: 100,
    status: 'Abnormal',
    date: '2026-01-12',
    category: 'Hematology',
    interpretation: 'Low MCV indicates microcytosis, characteristic of iron deficiency.',
    sourceReportId: 'rep-08',
    sourceReportTitle: 'Annual Health Check & CBC',
  },
  {
    id: 'lab-14',
    testName: '25-Hydroxy Vitamin D',
    normalizedName: 'Vitamin D (25-OH)',
    value: 18,
    numericValue: 18,
    unit: 'ng/mL',
    referenceRange: '30 – 100',
    minRange: 30,
    maxRange: 100,
    status: 'Abnormal',
    date: '2025-10-02',
    category: 'Vitamins',
    interpretation: 'Vitamin D insufficiency. High-dose ergocalciferol / cholecalciferol course prescribed.',
    sourceReportId: 'rep-10',
    sourceReportTitle: 'Micronutrient Panel',
  },
  {
    id: 'lab-15',
    testName: 'Vitamin B12 (Cobalamin)',
    normalizedName: 'Vitamin B12',
    value: 420,
    numericValue: 420,
    unit: 'pg/mL',
    referenceRange: '200 – 900',
    minRange: 200,
    maxRange: 900,
    status: 'Normal',
    date: '2025-10-02',
    category: 'Vitamins',
    interpretation: 'Adequate vitamin B12 levels.',
    sourceReportId: 'rep-10',
    sourceReportTitle: 'Micronutrient Panel',
  },
  {
    id: 'lab-16',
    testName: 'Estimated GFR (eGFR)',
    normalizedName: 'Kidney Function eGFR',
    value: '> 90',
    numericValue: 95,
    unit: 'mL/min/1.73m²',
    referenceRange: '> 60',
    minRange: 60,
    maxRange: 120,
    status: 'Normal',
    date: '2026-03-18',
    category: 'General',
    interpretation: 'Normal renal function.',
    sourceReportId: 'rep-07',
    sourceReportTitle: 'Lipid & Metabolic Panel',
  },
];

export const mockMedications: Medication[] = [
  {
    id: 'med-01',
    name: 'Ferrous Sulfate',
    genericName: 'Iron (II) Sulfate',
    dosage: '325 mg (65 mg elemental iron)',
    frequency: 'Once daily with citrus juice on an empty stomach',
    route: 'Oral',
    startDate: '2026-01-15',
    endDate: '2026-10-15',
    status: 'Active',
    prescribingDoctor: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic & Wellness Center',
    sourceReportId: 'rep-03',
    instructions: 'Take 1 hour before meal with vitamin C / orange juice for enhanced bioavailability. Avoid taking within 2 hours of antacids or dairy.',
    indication: 'Microcytic Iron Deficiency Anemia',
  },
  {
    id: 'med-02',
    name: 'Levothyroxine Sodium',
    genericName: 'Synthetic Thyroxine (T4)',
    dosage: '50 mcg',
    frequency: 'Once daily in the morning',
    route: 'Oral',
    startDate: '2025-11-01',
    status: 'Active',
    prescribingDoctor: 'Dr. Priya Sharma, MD (Endocrinologist)',
    facility: 'Metro Health Endocrinology Center',
    sourceReportId: 'rep-04',
    instructions: 'Take first thing in the morning with a full glass of water, at least 30 to 60 minutes before breakfast.',
    indication: 'Subclinical Hypothyroidism',
  },
  {
    id: 'med-03',
    name: 'Cholecalciferol (Vitamin D3)',
    genericName: 'Vitamin D3',
    dosage: '60,000 IU',
    frequency: 'Once weekly for 8 weeks, then monthly maintenance',
    route: 'Oral',
    startDate: '2025-10-10',
    endDate: '2026-04-10',
    status: 'Completed',
    prescribingDoctor: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic',
    sourceReportId: 'rep-03',
    instructions: 'Take with a fat-containing meal for optimal absorption.',
    indication: 'Vitamin D Insufficiency (Deficiency correction)',
  },
  {
    id: 'med-04',
    name: 'Cetirizine HCl',
    genericName: 'Cetirizine',
    dosage: '10 mg',
    frequency: 'As needed (PRN) for seasonal allergies',
    route: 'Oral',
    startDate: '2026-04-01',
    status: 'Active',
    prescribingDoctor: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic',
    sourceReportId: 'rep-05',
    instructions: 'Take 1 tablet in the evening during high pollen counts.',
    indication: 'Allergic Rhinitis / Pollen Sensitivities',
  },
  {
    id: 'med-05',
    name: 'Acetaminophen (Tylenol)',
    genericName: 'Paracetamol',
    dosage: '500 mg',
    frequency: 'Every 6 hours as needed for tension headaches',
    route: 'Oral',
    startDate: '2026-02-10',
    status: 'Active',
    prescribingDoctor: 'Dr. Rachel Vance, MD',
    facility: 'City Scan Centre Neurological Care',
    sourceReportId: 'rep-02',
    instructions: 'Do not exceed 3,000 mg in 24 hours. Avoid combining with other acetaminophen-containing products.',
    indication: 'Episodic Tension-Type Headaches',
  },
];

export const mockDiagnoses: Diagnosis[] = [
  {
    id: 'diag-01',
    conditionName: 'Iron Deficiency Anemia',
    icd10: 'D50.9',
    dateIdentified: '2026-01-12',
    status: 'Managed',
    doctor: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics / Dr. Arun Clinic',
    sourceReportId: 'rep-08',
    notes: 'Hemoglobin improved from 11.2 to 13.4 g/dL after 6-month iron regimen. Ferritin normalized to 28 ng/mL. Red cell indices within reference limits.',
    severity: 'Moderate',
  },
  {
    id: 'diag-02',
    conditionName: 'Subclinical Hypothyroidism',
    icd10: 'E02',
    dateIdentified: '2025-10-25',
    status: 'Active',
    doctor: 'Dr. Priya Sharma, MD',
    facility: 'Metro Health Endocrinology Center',
    sourceReportId: 'rep-04',
    notes: 'TSH elevated initially at 5.4 µIU/mL with normal FT4. Maintained euthyroid state at TSH 3.2 µIU/mL on Levothyroxine 50 mcg.',
    severity: 'Mild',
  },
  {
    id: 'diag-03',
    conditionName: 'Vitamin D Deficiency',
    icd10: 'E55.9',
    dateIdentified: '2025-10-02',
    status: 'Resolved',
    doctor: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Lal PathLabs / Dr. Arun Clinic',
    sourceReportId: 'rep-10',
    notes: 'Initial 25-OH Vitamin D was 18 ng/mL. Completed 8-week 60k IU replacement therapy. Levels replenished to 36 ng/mL.',
    severity: 'Moderate',
  },
  {
    id: 'diag-04',
    conditionName: 'Episodic Tension Headache',
    icd10: 'G44.209',
    dateIdentified: '2026-08-30',
    status: 'Managed',
    doctor: 'Dr. Rachel Vance, MD',
    facility: 'City Scan Centre',
    sourceReportId: 'rep-02',
    notes: 'Brain MRI confirmed completely normal intracranial anatomy. Headaches managed with ergonomics, hydration, and PRN analgesics.',
    severity: 'Mild',
  },
  {
    id: 'diag-05',
    conditionName: 'Benign Seborrheic Keratosis',
    icd10: 'L82.1',
    dateIdentified: '2025-02-10',
    status: 'Resolved',
    doctor: 'Dr. Sarah Lin, MD (Dermatology)',
    facility: 'SkinHealth Clinic & Surgical Suites',
    sourceReportId: 'rep-12',
    notes: 'Punch biopsy verified benign lesion without atypia. Cryotherapy completed with complete re-epithelialization.',
    severity: 'Mild',
  },
];

export const mockReports: MedicalReport[] = [
  {
    id: 'rep-01',
    title: 'Complete Blood Count (CBC) Panel',
    type: 'Blood Test',
    date: '2026-09-10',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics Centre',
    status: 'Processed',
    fileName: 'CBC_Report_Apollo_Sep2026.pdf',
    fileSize: '1.4 MB',
    pageCount: 2,
    confidenceScore: 0.98,
    summary: 'Routine follow-up CBC showing complete resolution of microcytic anemia. Hemoglobin is optimal at 13.4 g/dL. WBC and Platelets are within normal reference limits.',
    extractedText: `APOLLO DIAGNOSTICS - CLINICAL PATHOLOGY LABORATORY
Accredited by NABL & CAP | Reg No: LAB-2026-7819
Patient Name: Alex Morgan       Age / Gender: 34 Y / Female
MRN: ML-2026-8942               Sample Collected: 10-Sep-2026 08:15 AM
Referred By: Dr. Arun Kumar, MD Reported: 10-Sep-2026 02:30 PM

COMPLETE BLOOD COUNT (AUTOMATED HEMATOLOGY)
Test Description           Observed Value   Reference Range   Units   Status
----------------------------------------------------------------------------
Hemoglobin (Hgb)           13.4             12.0 - 16.0       g/dL    NORMAL
Total Leukocyte Count(WBC) 7,200            4,000 - 11,000    /µL     NORMAL
Platelet Count             245,000          150,000 - 450,000 /µL     NORMAL
RBC Count                  4.52             3.80 - 5.10       M/µL    NORMAL
Hematocrit (PCV)           40.2             36.0 - 46.0       %       NORMAL
Mean Corpuscular Vol (MCV) 88.9             80.0 - 100.0      fL      NORMAL
MCH                        29.6             27.0 - 33.0       pg      NORMAL
MCHC                       33.3             32.0 - 36.0       g/dL    NORMAL
RDW-CV                     12.8             11.5 - 14.5       %       NORMAL

DIFFERENTIAL LEUKOCYTE COUNT (DLC)
Neutrophils                62               40 - 75           %       NORMAL
Lymphocytes                30               20 - 45           %       NORMAL
Monocytes                  5                2 - 8             %       NORMAL
Eosinophils                2                1 - 6             %       NORMAL
Basophils                  1                0 - 2             %       NORMAL

CLINICAL IMPRESSION:
Peripheral smear demonstrates normocytic normochromic red cells. Platelets adequate on smear. No immature cells seen. Comparison with 12-Jan-2026 report indicates successful recovery from iron deficiency anemia.
Electronically signed by: Dr. Neha Kapoor, MD Pathologist`,
    entities: [
      { id: 'ent-101', category: 'Biomarker', text: 'Hemoglobin', normalizedValue: 'Hemoglobin (Hgb)', confidence: 0.99 },
      { id: 'ent-102', category: 'Value', text: '13.4 g/dL', normalizedValue: '13.4 g/dL', confidence: 0.99 },
      { id: 'ent-103', category: 'Biomarker', text: 'Total Leukocyte Count (WBC)', normalizedValue: 'White Blood Cell Count', confidence: 0.98 },
      { id: 'ent-104', category: 'Value', text: '7,200 /µL', normalizedValue: '7200 /µL', confidence: 0.98 },
      { id: 'ent-105', category: 'Biomarker', text: 'Platelet Count', normalizedValue: 'Platelets', confidence: 0.99 },
      { id: 'ent-106', category: 'Value', text: '245,000 /µL', normalizedValue: '245000 /µL', confidence: 0.99 },
      { id: 'ent-107', category: 'Diagnosis', text: 'Recovery from iron deficiency anemia', normalizedValue: 'Iron Deficiency Anemia (Resolved/Managed)', confidence: 0.95 },
      { id: 'ent-108', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.97 },
      { id: 'ent-109', category: 'Facility', text: 'Apollo Diagnostics Centre', normalizedValue: 'Apollo Diagnostics', confidence: 0.99 },
      { id: 'ent-110', category: 'Date', text: '10-Sep-2026', normalizedValue: '2026-09-10', confidence: 0.99 },
    ],
    labResults: [
      mockLabResults[0],
      mockLabResults[1],
      mockLabResults[2],
    ],
    medications: [],
    diagnoses: [],
    tags: ['Blood Test', 'Hematology', 'Hemoglobin', 'CBC', 'Normal'],
  },
  {
    id: 'rep-02',
    title: 'Brain MRI with & without IV Contrast',
    type: 'Radiology',
    date: '2026-09-04',
    provider: 'Dr. Rachel Vance, MD',
    facility: 'City Scan Centre & Neuroimaging',
    status: 'Processed',
    fileName: 'MRI_Brain_Contrast_Sep2026.pdf',
    fileSize: '4.8 MB',
    pageCount: 3,
    confidenceScore: 0.96,
    summary: 'Magnetic resonance imaging of brain evaluated for persistent tension headaches. Normal brain parenchyma without acute infarct, hemorrhage, mass effect, or abnormal enhancement.',
    extractedText: `CITY SCAN CENTRE & ADVANCED NEUROIMAGING
Department of Diagnostic Radiology | High-Field 3.0T MRI
Patient: Alex Morgan       Age: 34 Y / F      MRN: ML-2026-8942
Date of Exam: 04-Sep-2026  Referring Physician: Dr. Arun Kumar, MD
Study: MRI BRAIN WITH AND WITHOUT IV GADOLINIUM CONTRAST

CLINICAL INDICATION:
Evaluation of frequent headaches; ruling out structural etiologies or vascular malformations.

TECHNIQUE:
Axial, sagittal, and coronal T1, T2, FLAIR, diffusion-weighted (DWI) and gradient echo sequences performed prior to and following intravenous administration of 10 mL Gadavist contrast.

FINDINGS:
1. Brain Parenchyma: The cerebral hemispheres, cerebellar hemispheres, and brainstem demonstrate normal signal intensity and morphology. No diffusion restriction to suggest acute acute ischemia.
2. Ventricles & Cisterns: Ventricles, sulci, and cisterns are within normal limits for age. Midline structures are centered.
3. Extra-axial spaces: No acute subdural or epidural hematoma.
4. Vascular: Major intracranial flow voids are preserved. No aneurysm or vascular nidus identified.
5. Contrast Administration: No abnormal focal parenchymal or leptomeningeal enhancement.
6. Orbits & Paranasal Sinuses: Clear paranasal sinuses and mastoid air cells.

IMPRESSION:
Normal brain MRI. No evidence of acute intracranial pathology, demyelinating process, mass lesion, or abnormal enhancement. Consistent with benign tension-type headache etiology.
Interpreted by: Dr. Rachel Vance, MD, Senior Neuroradiologist`,
    entities: [
      { id: 'ent-201', category: 'Diagnosis', text: 'benign tension-type headache', normalizedValue: 'Tension-Type Headache', confidence: 0.94 },
      { id: 'ent-202', category: 'Provider', text: 'Dr. Rachel Vance, MD', normalizedValue: 'Dr. Rachel Vance', confidence: 0.98 },
      { id: 'ent-203', category: 'Facility', text: 'City Scan Centre & Neuroimaging', normalizedValue: 'City Scan Centre', confidence: 0.99 },
      { id: 'ent-204', category: 'Date', text: '04-Sep-2026', normalizedValue: '2026-09-04', confidence: 0.99 },
    ],
    labResults: [],
    medications: [],
    diagnoses: [mockDiagnoses[3]],
    tags: ['Radiology', 'MRI', 'Brain', 'Headache', 'Normal'],
  },
  {
    id: 'rep-03',
    title: 'Clinical Prescription & Iron Maintenance Plan',
    type: 'Prescription',
    date: '2026-08-28',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic & Wellness Center',
    status: 'Processed',
    fileName: 'Prescription_DrArun_Aug2026.pdf',
    fileSize: '820 KB',
    pageCount: 1,
    confidenceScore: 0.99,
    summary: 'Clinical consultation prescription outlining continuation of oral Ferrous Sulfate 325 mg daily and Vitamin D3 maintenance.',
    extractedText: `DR. ARUN CLINIC & WELLNESS CENTER
Internal Medicine & Preventive Health
104 Healthcare Boulevard, Suite 400 | Ph: (555) 019-4820
Patient Name: Alex Morgan        Date: 28-Aug-2026
Age: 34 | Gender: Female         MRN: ML-2026-8942

Rx (PRESCRIPTION MEDICATIONS):
1. Ferrous Sulfate 325 mg Tablet (65 mg elemental iron)
   Dispense: 60 tablets | Refills: 2
   Sig: Take 1 tablet orally once daily on an empty stomach with orange juice.
   Duration: 60 days
   Indication: Iron deficiency recovery maintenance.

2. Vitamin D3 (Cholecalciferol) 60,000 IU Capsule
   Dispense: 8 capsules | Refills: 1
   Sig: Take 1 capsule once monthly after breakfast.
   Indication: Maintenance of replenished 25-OH Vitamin D stores.

3. Cetirizine HCl 10 mg Tablet
   Dispense: 30 tablets | Refills: 3
   Sig: Take 1 tablet orally once daily at bedtime PRN for allergic rhinitis.

Advice & Instructions:
- Repeat Complete Blood Count (CBC) in approximately 2 weeks.
- Continue high dietary iron intake (spinach, legumes, fortified cereals).
- Avoid consuming milk, coffee, or calcium supplements within 2 hours of iron dose.
Next Follow-up: Mid-October 2026 or post-CBC review.
Dr. Arun Kumar, MD (Lic: #MD-73921)`,
    entities: [
      { id: 'ent-301', category: 'Medication', text: 'Ferrous Sulfate', normalizedValue: 'Ferrous Sulfate', confidence: 0.99 },
      { id: 'ent-302', category: 'Dosage', text: '325 mg', normalizedValue: '325 mg', confidence: 0.99 },
      { id: 'ent-303', category: 'Medication', text: 'Vitamin D3 (Cholecalciferol)', normalizedValue: 'Cholecalciferol', confidence: 0.98 },
      { id: 'ent-304', category: 'Dosage', text: '60,000 IU', normalizedValue: '60,000 IU', confidence: 0.98 },
      { id: 'ent-305', category: 'Medication', text: 'Cetirizine HCl', normalizedValue: 'Cetirizine', confidence: 0.97 },
      { id: 'ent-306', category: 'Dosage', text: '10 mg', normalizedValue: '10 mg', confidence: 0.99 },
      { id: 'ent-307', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.99 },
      { id: 'ent-308', category: 'Facility', text: 'Dr. Arun Clinic & Wellness Center', normalizedValue: 'Dr. Arun Clinic', confidence: 0.98 },
      { id: 'ent-309', category: 'Date', text: '28-Aug-2026', normalizedValue: '2026-08-28', confidence: 0.99 },
    ],
    labResults: [],
    medications: [mockMedications[0], mockMedications[2], mockMedications[3]],
    diagnoses: [],
    tags: ['Prescription', 'Iron Supplement', 'Vitamin D', 'Cetirizine', 'Internal Medicine'],
  },
  {
    id: 'rep-04',
    title: 'Comprehensive Thyroid Profile (CLIA)',
    type: 'Blood Test',
    date: '2026-08-15',
    provider: 'Dr. Priya Sharma, MD',
    facility: 'Metro Labs & Diagnostic Institute',
    status: 'Processed',
    fileName: 'Thyroid_Profile_MetroLabs_Aug2026.pdf',
    fileSize: '1.1 MB',
    pageCount: 1,
    confidenceScore: 0.97,
    summary: 'Thyroid panel evaluated for hypothyroidism management. TSH is normal at 3.2 µIU/mL, Free T4 is 1.3 ng/dL, indicating stable dosing on Levothyroxine 50 mcg.',
    extractedText: `METRO LABS & DIAGNOSTIC INSTITUTE
Automated Chemiluminescence Immunoassay (CLIA)
Patient: Alex Morgan       Age: 34 / F        Date: 15-Aug-2026
Physician: Dr. Priya Sharma, MD               MRN: ML-2026-8942

THYROID FUNCTION TESTS
Test                       Observed Value   Reference Range   Units     Status
----------------------------------------------------------------------------
TSH (Ultrasensitive)       3.20             0.40 - 4.50       µIU/mL    NORMAL
Free Thyroxine (FT4)       1.30             0.80 - 1.80       ng/dL     NORMAL
Total Triiodothyronine(T3) 112              80 - 200          ng/dL     NORMAL
Anti-TPO Antibodies        18               < 35              IU/mL     NORMAL

COMMENTS:
Thyroid profile shows euthyroid biochemistry on current synthetic T4 hormone replacement. Serum TSH has corrected from initial presentation of 5.40 µIU/mL. Recommended to continue current dosage of Levothyroxine 50 mcg daily. Routine recheck in 6 to 12 months.
Pathologist: Dr. Sanjay Gupta, MD`,
    entities: [
      { id: 'ent-401', category: 'Biomarker', text: 'TSH (Ultrasensitive)', normalizedValue: 'Thyroid Stimulating Hormone (TSH)', confidence: 0.99 },
      { id: 'ent-402', category: 'Value', text: '3.20 µIU/mL', normalizedValue: '3.2 µIU/mL', confidence: 0.99 },
      { id: 'ent-403', category: 'Biomarker', text: 'Free Thyroxine (FT4)', normalizedValue: 'Free T4', confidence: 0.98 },
      { id: 'ent-404', category: 'Value', text: '1.30 ng/dL', normalizedValue: '1.3 ng/dL', confidence: 0.98 },
      { id: 'ent-405', category: 'Diagnosis', text: 'euthyroid biochemistry on current synthetic T4 hormone replacement', normalizedValue: 'Subclinical Hypothyroidism (Controlled)', confidence: 0.93 },
      { id: 'ent-406', category: 'Provider', text: 'Dr. Priya Sharma, MD', normalizedValue: 'Dr. Priya Sharma', confidence: 0.97 },
      { id: 'ent-407', category: 'Facility', text: 'Metro Labs & Diagnostic Institute', normalizedValue: 'Metro Labs', confidence: 0.99 },
      { id: 'ent-408', category: 'Date', text: '15-Aug-2026', normalizedValue: '2026-08-15', confidence: 0.99 },
    ],
    labResults: [mockLabResults[3], mockLabResults[4]],
    medications: [mockMedications[1]],
    diagnoses: [mockDiagnoses[1]],
    tags: ['Thyroid', 'TSH', 'FT4', 'Endocrinology', 'Levothyroxine', 'Normal'],
  },
  {
    id: 'rep-05',
    title: 'Internal Medicine Follow-up Consultation',
    type: 'Consultation',
    date: '2026-07-03',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apex Multispecialty Hospital',
    status: 'Processed',
    fileName: 'Consultation_Summary_Apex_Jul2026.pdf',
    fileSize: '950 KB',
    pageCount: 2,
    confidenceScore: 0.97,
    summary: 'Clinical consultation note reviewing energy levels, fatigue resolution, and ongoing tolerance of iron supplementation. Patient reports significant reduction in fatigue.',
    extractedText: `APEX MULTISPECIALTY HOSPITAL
Outpatient Clinical Summary - Department of Internal Medicine
Date: 03-Jul-2026 | Provider: Dr. Arun Kumar, MD
Patient: Alex Morgan (34 y/o female) | MRN: ML-2026-8942

SUBJECTIVE:
Patient presents for mid-year evaluation of iron deficiency anemia. Reports noticeable improvement in exercise tolerance and elimination of mid-afternoon exhaustion. No gastrointestinal distress reported from Ferrous Sulfate.

VITAL SIGNS:
Blood Pressure: 118/76 mmHg | Pulse: 68 bpm regular | Temp: 98.4 F | SpO2: 99% on room air | BMI: 22.4 kg/m²

PHYSICAL EXAMINATION:
- Conjunctiva: Pink, no pallor noted.
- Cardiovascular: Regular rate and rhythm, S1/S2 present, no murmurs.
- Respiratory: Lungs clear to auscultation bilaterally.
- Abdomen: Soft, non-tender, no hepatosplenomegaly.

ASSESSMENT & PLAN:
1. Microcytic Iron Deficiency Anemia - Responding well to oral supplementation. Continue Ferrous Sulfate 325 mg daily.
2. Subclinical Hypothyroidism - Clinically asymptomatic and stable on Levothyroxine.
3. Routine lab check scheduled for late summer.`,
    entities: [
      { id: 'ent-501', category: 'Diagnosis', text: 'Microcytic Iron Deficiency Anemia', normalizedValue: 'Iron Deficiency Anemia', confidence: 0.98 },
      { id: 'ent-502', category: 'Diagnosis', text: 'Subclinical Hypothyroidism', normalizedValue: 'Subclinical Hypothyroidism', confidence: 0.97 },
      { id: 'ent-503', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.99 },
      { id: 'ent-504', category: 'Facility', text: 'Apex Multispecialty Hospital', normalizedValue: 'Apex Multispecialty', confidence: 0.98 },
      { id: 'ent-505', category: 'Date', text: '03-Jul-2026', normalizedValue: '2026-07-03', confidence: 0.99 },
    ],
    labResults: [],
    medications: [mockMedications[0]],
    diagnoses: [mockDiagnoses[0], mockDiagnoses[1]],
    tags: ['Consultation', 'Vitals', 'Physical Exam', 'Internal Medicine'],
  },
  {
    id: 'rep-06',
    title: 'Serum Iron Studies & Ferritin Panel',
    type: 'Blood Test',
    date: '2026-05-20',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics Centre',
    status: 'Processed',
    fileName: 'Iron_Studies_Apollo_May2026.pdf',
    fileSize: '1.2 MB',
    pageCount: 1,
    confidenceScore: 0.98,
    summary: 'Iron panel showing rising serum ferritin (28 ng/mL) and normalized serum iron (74 µg/dL). Confirms favorable therapeutic response to oral iron.',
    extractedText: `APOLLO DIAGNOSTICS - CLINICAL BIOCHEMISTRY
Patient Name: Alex Morgan        Age/Sex: 34/F        Date: 20-May-2026
Physician: Dr. Arun Kumar, MD    MRN: ML-2026-8942

IRON METABOLISM PROFILE
Test Name                    Value   Ref Range   Units    Status
------------------------------------------------------------------------
Serum Ferritin               28      15 - 150    ng/mL    NORMAL
Serum Iron                   74      60 - 170    µg/dL    NORMAL
Total Iron Binding Cap(TIBC) 345     240 - 450   µg/dL    NORMAL
Transferrin Saturation       21.4    20.0 - 50.0 %        NORMAL

INTERPRETATION:
Ferritin level shows marked recovery compared to baseline in Jan 2026 (14 ng/mL). Continued oral therapy recommended to build solid bone marrow storage pools.
Pathologist: Dr. Neha Kapoor, MD`,
    entities: [
      { id: 'ent-601', category: 'Biomarker', text: 'Serum Ferritin', normalizedValue: 'Ferritin', confidence: 0.99 },
      { id: 'ent-602', category: 'Value', text: '28 ng/mL', normalizedValue: '28 ng/mL', confidence: 0.99 },
      { id: 'ent-603', category: 'Biomarker', text: 'Serum Iron', normalizedValue: 'Serum Iron', confidence: 0.98 },
      { id: 'ent-604', category: 'Value', text: '74 µg/dL', normalizedValue: '74 µg/dL', confidence: 0.98 },
      { id: 'ent-605', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.99 },
      { id: 'ent-606', category: 'Facility', text: 'Apollo Diagnostics Centre', normalizedValue: 'Apollo Diagnostics', confidence: 0.99 },
      { id: 'ent-607', category: 'Date', text: '20-May-2026', normalizedValue: '2026-05-20', confidence: 0.99 },
    ],
    labResults: [mockLabResults[5], mockLabResults[6]],
    medications: [],
    diagnoses: [],
    tags: ['Iron', 'Ferritin', 'TIBC', 'Hematology', 'Normal'],
  },
  {
    id: 'rep-07',
    title: 'Comprehensive Metabolic & Lipid Panel',
    type: 'Blood Test',
    date: '2026-03-18',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Lifeline Clinical Laboratories',
    status: 'Processed',
    fileName: 'Metabolic_Lipid_Panel_Mar2026.pdf',
    fileSize: '1.6 MB',
    pageCount: 2,
    confidenceScore: 0.98,
    summary: 'Metabolic & lipid screening showing normal fasting glucose (89 mg/dL), HbA1c (5.4%), normal kidney & liver enzymes, and borderline LDL (104 mg/dL).',
    extractedText: `LIFELINE CLINICAL LABORATORIES
Automated Chemistry & Lipid Analysis
Patient: Alex Morgan       Age: 34 / F       Date: 18-Mar-2026
MRN: ML-2026-8942          Doctor: Dr. Arun Kumar, MD

METABOLIC PANEL
Fasting Glucose: 89 mg/dL (Ref: 70 - 99) [NORMAL]
HbA1c: 5.4 % (Ref: < 5.7) [NORMAL]
Blood Urea Nitrogen (BUN): 14 mg/dL (Ref: 7 - 20) [NORMAL]
Serum Creatinine: 0.82 mg/dL (Ref: 0.5 - 1.1) [NORMAL]
eGFR: > 90 mL/min/1.73m² (Ref: > 60) [NORMAL]
Sodium: 140 mEq/L (Ref: 135 - 145) [NORMAL]
Potassium: 4.2 mEq/L (Ref: 3.5 - 5.0) [NORMAL]

LIPID PANEL
Total Cholesterol: 188 mg/dL (Ref: < 200) [DESIRABLE]
HDL (Good) Cholesterol: 58 mg/dL (Ref: > 50) [NORMAL]
LDL (Bad) Cholesterol: 104 mg/dL (Ref: < 100) [BORDERLINE ATTENTION]
Triglycerides: 130 mg/dL (Ref: < 150) [NORMAL]`,
    entities: [
      { id: 'ent-701', category: 'Biomarker', text: 'Fasting Glucose', normalizedValue: 'Fasting Blood Glucose', confidence: 0.99 },
      { id: 'ent-702', category: 'Value', text: '89 mg/dL', normalizedValue: '89 mg/dL', confidence: 0.99 },
      { id: 'ent-703', category: 'Biomarker', text: 'HbA1c', normalizedValue: 'HbA1c', confidence: 0.99 },
      { id: 'ent-704', category: 'Value', text: '5.4 %', normalizedValue: '5.4 %', confidence: 0.99 },
      { id: 'ent-705', category: 'Biomarker', text: 'Total Cholesterol', normalizedValue: 'Total Cholesterol', confidence: 0.98 },
      { id: 'ent-706', category: 'Value', text: '188 mg/dL', normalizedValue: '188 mg/dL', confidence: 0.98 },
      { id: 'ent-707', category: 'Biomarker', text: 'LDL Cholesterol', normalizedValue: 'LDL Cholesterol', confidence: 0.98 },
      { id: 'ent-708', category: 'Value', text: '104 mg/dL', normalizedValue: '104 mg/dL', confidence: 0.98 },
    ],
    labResults: [mockLabResults[7], mockLabResults[8], mockLabResults[9], mockLabResults[10], mockLabResults[15]],
    medications: [],
    diagnoses: [],
    tags: ['Metabolic', 'Glucose', 'Lipid', 'Cholesterol', 'Renal'],
  },
  {
    id: 'rep-08',
    title: 'Annual Health Check & Complete Blood Count',
    type: 'Blood Test',
    date: '2026-01-12',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Metro Labs & Diagnostic Institute',
    status: 'Processed',
    fileName: 'Annual_CBC_MetroLabs_Jan2026.pdf',
    fileSize: '1.3 MB',
    pageCount: 2,
    confidenceScore: 0.99,
    summary: 'Baseline annual check showing microcytic anemia with low Hemoglobin (11.2 g/dL) and low MCV (74 fL). Triggered diagnostic workup and iron therapy.',
    extractedText: `METRO LABS & DIAGNOSTIC INSTITUTE
Patient: Alex Morgan       Age: 34 / Female    Date: 12-Jan-2026
Doctor: Dr. Arun Kumar, MD MRN: ML-2026-8942

COMPLETE BLOOD COUNT (CBC)
Hemoglobin: 11.2 g/dL (Ref: 12.0 - 16.0) [LOW - ABNORMAL]
Hematocrit: 33.5 % (Ref: 36.0 - 46.0) [LOW - ABNORMAL]
MCV: 74 fL (Ref: 80 - 100) [LOW - ABNORMAL]
MCH: 24.2 pg (Ref: 27 - 33) [LOW - ABNORMAL]
WBC: 6,800 /µL (Ref: 4,000 - 11,000) [NORMAL]
Platelets: 230,000 /µL (Ref: 150,000 - 450,000) [NORMAL]

IMPRESSION:
Microcytic hypochromic red cell morphology. Consistent with iron deficiency. Recommend ferritin and iron studies.`,
    entities: [
      { id: 'ent-801', category: 'Biomarker', text: 'Hemoglobin', normalizedValue: 'Hemoglobin', confidence: 0.99 },
      { id: 'ent-802', category: 'Value', text: '11.2 g/dL', normalizedValue: '11.2 g/dL', confidence: 0.99 },
      { id: 'ent-803', category: 'Biomarker', text: 'MCV', normalizedValue: 'MCV', confidence: 0.98 },
      { id: 'ent-804', category: 'Value', text: '74 fL', normalizedValue: '74 fL', confidence: 0.98 },
      { id: 'ent-805', category: 'Diagnosis', text: 'iron deficiency', normalizedValue: 'Iron Deficiency Anemia', confidence: 0.96 },
    ],
    labResults: [mockLabResults[11], mockLabResults[12]],
    medications: [],
    diagnoses: [mockDiagnoses[0]],
    tags: ['Blood Test', 'CBC', 'Anemia', 'Abnormal', 'Baseline'],
  },
  {
    id: 'rep-09',
    title: 'Chest Radiograph (X-Ray PA View)',
    type: 'Radiology',
    date: '2025-11-14',
    provider: 'Dr. Gregory House, MD',
    facility: 'City Radiology & Imaging Pavilion',
    status: 'Processed',
    fileName: 'CXR_PA_CityRadiology_Nov2025.pdf',
    fileSize: '3.1 MB',
    pageCount: 1,
    confidenceScore: 0.97,
    summary: 'Chest X-Ray PA view obtained for pre-procedure evaluation. Lungs are clear without focal infiltrates, effusion, or pneumothorax. Heart size is normal.',
    extractedText: `CITY RADIOLOGY & IMAGING PAVILION
CHEST RADIOGRAPH (POSTEROANTERIOR VIEW)
Date: 14-Nov-2025 | Patient: Alex Morgan (34/F) | MRN: ML-2026-8942
Referring Doctor: Dr. Arun Kumar, MD

FINDINGS:
Lungs: Clear without consolidation, pneumothorax, or pleural effusion.
Cardiovascular: Cardiac silhouette is normal in size and contour. Aortic knob is within normal limits.
Mediastinum: Normal hila and mediastinal contours.
Bony Thorax: Thoracic cage and soft tissues are unremarkable. Costophrenic sulci are sharp.

IMPRESSION:
No acute cardiopulmonary disease. Normal chest radiograph.`,
    entities: [
      { id: 'ent-901', category: 'Provider', text: 'Dr. Gregory House, MD', normalizedValue: 'Dr. Gregory House', confidence: 0.95 },
      { id: 'ent-902', category: 'Facility', text: 'City Radiology & Imaging Pavilion', normalizedValue: 'City Radiology', confidence: 0.98 },
      { id: 'ent-903', category: 'Date', text: '14-Nov-2025', normalizedValue: '2025-11-14', confidence: 0.99 },
    ],
    labResults: [],
    medications: [],
    diagnoses: [],
    tags: ['Radiology', 'X-Ray', 'Chest', 'Lungs', 'Normal'],
  },
  {
    id: 'rep-10',
    title: 'Micronutrient & Vitamin Deficiency Panel',
    type: 'Blood Test',
    date: '2025-10-02',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Lal PathLabs Clinical Testing',
    status: 'Processed',
    fileName: 'Vitamin_Panel_DrLal_Oct2025.pdf',
    fileSize: '1.2 MB',
    pageCount: 1,
    confidenceScore: 0.98,
    summary: 'Evaluation of fatigue showing 25-OH Vitamin D deficiency at 18 ng/mL and normal Vitamin B12 at 420 pg/mL.',
    extractedText: `DR. LAL PATHLABS CLINICAL TESTING
VITAMIN & MICRONUTRIENT PROFILE
Patient: Alex Morgan | Age: 34 / Female | Date: 02-Oct-2025 | MRN: ML-2026-8942
Doctor: Dr. Arun Kumar, MD

25-Hydroxy Vitamin D (Total): 18.0 ng/mL (Ref: 30 - 100) [DEFICIENT - ABNORMAL]
Vitamin B12 (Cyanocobalamin): 420 pg/mL (Ref: 200 - 900) [NORMAL]
Folic Acid (Serum Folate): 12.4 ng/mL (Ref: > 4.0) [NORMAL]

CLINICAL NOTE:
Hypovitaminosis D noted. Recommend oral cholecalciferol supplementation 60,000 IU weekly for 8 weeks followed by re-evaluation.`,
    entities: [
      { id: 'ent-1001', category: 'Biomarker', text: '25-Hydroxy Vitamin D', normalizedValue: 'Vitamin D (25-OH)', confidence: 0.99 },
      { id: 'ent-1002', category: 'Value', text: '18.0 ng/mL', normalizedValue: '18 ng/mL', confidence: 0.99 },
      { id: 'ent-1003', category: 'Diagnosis', text: 'Hypovitaminosis D', normalizedValue: 'Vitamin D Deficiency', confidence: 0.95 },
    ],
    labResults: [mockLabResults[13], mockLabResults[14]],
    medications: [mockMedications[2]],
    diagnoses: [mockDiagnoses[2]],
    tags: ['Vitamins', 'Vitamin D', 'Vitamin B12', 'Deficiency'],
  },
  {
    id: 'rep-11',
    title: 'Cardiology Evaluation & 12-Lead ECG',
    type: 'Cardiology',
    date: '2025-06-15',
    provider: 'Dr. Marcus Webb, MD, FACC',
    facility: 'HeartCare Institute of Cardiology',
    status: 'Processed',
    fileName: 'Cardio_ECG_HeartCare_Jun2025.pdf',
    fileSize: '2.2 MB',
    pageCount: 2,
    confidenceScore: 0.97,
    summary: 'Standard 12-lead electrocardiogram demonstrating normal sinus rhythm at 72 bpm with normal axis and intervals. Blood pressure measured at 120/78 mmHg.',
    extractedText: `HEARTCARE INSTITUTE OF CARDIOLOGY
Department of Non-Invasive Cardiovascular Testing
Patient: Alex Morgan | Date: 15-Jun-2025 | MRN: ML-2026-8942
Attending Cardiologist: Dr. Marcus Webb, MD, FACC

TEST: 12-LEAD RESTING ELECTROCARDIOGRAM (ECG)
Ventricular Rate: 72 bpm
PR Interval: 148 ms
QRS Duration: 84 ms
QT / QTc: 394 / 412 ms
P-R-T Axes: 52 48 42 degrees
Resting Blood Pressure: 120/78 mmHg

INTERPRETATION:
Normal sinus rhythm. Normal tracing without evidence of ischemia, chamber enlargement, or conduction abnormalities. Normal resting cardiovascular hemodynamics.`,
    entities: [
      { id: 'ent-1101', category: 'Biomarker', text: 'Heart Rate', normalizedValue: '72 bpm', confidence: 0.99 },
      { id: 'ent-1102', category: 'Biomarker', text: 'Blood Pressure', normalizedValue: '120/78 mmHg', confidence: 0.98 },
      { id: 'ent-1103', category: 'Provider', text: 'Dr. Marcus Webb, MD, FACC', normalizedValue: 'Dr. Marcus Webb', confidence: 0.99 },
    ],
    labResults: [],
    medications: [],
    diagnoses: [],
    tags: ['Cardiology', 'ECG', 'Heart Rate', 'Blood Pressure', 'Normal'],
  },
  {
    id: 'rep-12',
    title: 'Dermatopathology Biopsy & Dermoscopy Note',
    type: 'Pathology',
    date: '2025-02-10',
    provider: 'Dr. Sarah Lin, MD',
    facility: 'SkinHealth Clinic & Surgical Suites',
    status: 'Processed',
    fileName: 'Skin_Biopsy_SkinHealth_Feb2025.pdf',
    fileSize: '1.5 MB',
    pageCount: 1,
    confidenceScore: 0.96,
    summary: 'Punch biopsy of pigmented skin lesion on left scapula confirms benign seborrheic keratosis with negative surgical margins.',
    extractedText: `SKINHEALTH CLINIC & SURGICAL SUITES
SURGICAL PATHOLOGY REPORT
Specimen: Punch biopsy left upper back | Date: 10-Feb-2025
Patient: Alex Morgan (34/F) | Physician: Dr. Sarah Lin, MD

MICROSCOPIC DESCRIPTION:
Sections reveal hyperkeratosis, acanthosis, and papillomatosis composed of uniform basaloid keratinocytes with horn pseudocysts. No cellular atypia or dysplasia.

FINAL DIAGNOSIS:
Left back lesion, biopsy: BENIGN SEBORRHEIC KERATOSIS.
Completely excised. No further surgical intervention required.
Reported by: Dr. Catherine Miller, MD, Dermatopathologist`,
    entities: [
      { id: 'ent-1201', category: 'Diagnosis', text: 'BENIGN SEBORRHEIC KERATOSIS', normalizedValue: 'Benign Seborrheic Keratosis', confidence: 0.99 },
      { id: 'ent-1202', category: 'Provider', text: 'Dr. Sarah Lin, MD', normalizedValue: 'Dr. Sarah Lin', confidence: 0.97 },
      { id: 'ent-1203', category: 'Facility', text: 'SkinHealth Clinic & Surgical Suites', normalizedValue: 'SkinHealth Clinic', confidence: 0.98 },
    ],
    labResults: [],
    medications: [],
    diagnoses: [mockDiagnoses[4]],
    tags: ['Pathology', 'Dermatology', 'Biopsy', 'Benign'],
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl-01',
    date: 'September 10, 2026',
    title: 'CBC Blood Test (Follow-up)',
    type: 'lab',
    summary: 'Full recovery from iron deficiency anemia. Red blood cell indices and hemoglobin normalized to optimal range.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics Centre',
    reportId: 'rep-01',
    keyMetrics: [
      { label: 'Hemoglobin', value: '13.4 g/dL', status: 'Normal' },
      { label: 'WBC', value: '7,200 /µL', status: 'Normal' },
      { label: 'Platelets', value: '245,000 /µL', status: 'Normal' },
    ],
  },
  {
    id: 'tl-02',
    date: 'September 04, 2026',
    title: 'Brain MRI with Contrast',
    type: 'radiology',
    summary: 'Evaluated recurrent tension headaches. Imaging revealed clear parenchyma, normal ventricles, and zero structural lesions.',
    provider: 'Dr. Rachel Vance, MD',
    facility: 'City Scan Centre',
    reportId: 'rep-02',
    keyMetrics: [
      { label: 'Study Result', value: 'Clear / Unremarkable', status: 'Normal' },
      { label: 'Modality', value: '3.0T High-Field MRI', status: 'Normal' },
    ],
  },
  {
    id: 'tl-03',
    date: 'August 28, 2026',
    title: 'Clinical Prescription & Iron Maintenance',
    type: 'prescription',
    summary: 'Prescribed 60-day continuation of Ferrous Sulfate 325 mg daily with citrus juice and periodic Vitamin D3 booster.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic & Wellness Center',
    reportId: 'rep-03',
    keyMetrics: [
      { label: 'Prescribed', value: 'Ferrous Sulfate 325 mg', status: 'Normal' },
      { label: 'Vitamin D3', value: '60,000 IU Maintenance', status: 'Normal' },
    ],
  },
  {
    id: 'tl-04',
    date: 'August 15, 2026',
    title: 'Comprehensive Thyroid Profile',
    type: 'lab',
    summary: 'CLIA serum assay showed euthyroid state maintained on Levothyroxine 50 mcg.',
    provider: 'Dr. Priya Sharma, MD',
    facility: 'Metro Labs & Diagnostic Institute',
    reportId: 'rep-04',
    keyMetrics: [
      { label: 'TSH', value: '3.20 µIU/mL', status: 'Normal' },
      { label: 'Free T4', value: '1.30 ng/dL', status: 'Normal' },
    ],
  },
  {
    id: 'tl-05',
    date: 'July 03, 2026',
    title: 'Internal Medicine Follow-up Consultation',
    type: 'consultation',
    summary: 'Patient reports marked resolution of fatigue and sustained stamina. Blood pressure steady at 118/76 mmHg.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apex Multispecialty Hospital',
    reportId: 'rep-05',
    keyMetrics: [
      { label: 'Blood Pressure', value: '118/76 mmHg', status: 'Normal' },
      { label: 'Heart Rate', value: '68 bpm', status: 'Normal' },
    ],
  },
  {
    id: 'tl-06',
    date: 'May 20, 2026',
    title: 'Iron Studies & Ferritin Re-test',
    type: 'lab',
    summary: 'Serum ferritin replenished to 28 ng/mL (up from 14 ng/mL nadir). Iron saturation normalized to 21.4%.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics Centre',
    reportId: 'rep-06',
    keyMetrics: [
      { label: 'Serum Ferritin', value: '28 ng/mL', status: 'Normal' },
      { label: 'Serum Iron', value: '74 µg/dL', status: 'Normal' },
    ],
  },
  {
    id: 'tl-07',
    date: 'March 18, 2026',
    title: 'Metabolic & Lipid Panel',
    type: 'lab',
    summary: 'Fasting glucose and HbA1c normal. LDL slightly borderline at 104 mg/dL with excellent HDL.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Lifeline Clinical Laboratories',
    reportId: 'rep-07',
    keyMetrics: [
      { label: 'Fasting Glucose', value: '89 mg/dL', status: 'Normal' },
      { label: 'HbA1c', value: '5.4 %', status: 'Normal' },
      { label: 'LDL Cholesterol', value: '104 mg/dL', status: 'Attention' },
    ],
  },
  {
    id: 'tl-08',
    date: 'January 12, 2026',
    title: 'Annual Health Check & Anemia Detection',
    type: 'diagnosis',
    summary: 'Diagnosed with Iron Deficiency Anemia following low hemoglobin (11.2 g/dL) and low MCV (74 fL). Commenced oral iron therapy.',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Metro Labs & Diagnostic Institute',
    reportId: 'rep-08',
    keyMetrics: [
      { label: 'Hemoglobin', value: '11.2 g/dL', status: 'Abnormal' },
      { label: 'MCV', value: '74 fL', status: 'Abnormal' },
    ],
  },
];

export const hemoglobinChartData = [
  { date: 'Jan 12', value: 11.2, minRef: 12.0, maxRef: 16.0, status: 'Abnormal (Low)' },
  { date: 'Mar 18', value: 12.4, minRef: 12.0, maxRef: 16.0, status: 'Normal' },
  { date: 'May 20', value: 12.8, minRef: 12.0, maxRef: 16.0, status: 'Normal' },
  { date: 'Aug 10', value: 13.1, minRef: 12.0, maxRef: 16.0, status: 'Normal' },
  { date: 'Sep 10', value: 13.4, minRef: 12.0, maxRef: 16.0, status: 'Optimal' },
];

export const glucoseChartData = [
  { date: 'Nov 2025', glucose: 98, hba1c: 5.6 },
  { date: 'Jan 2026', glucose: 94, hba1c: 5.5 },
  { date: 'Mar 2026', glucose: 89, hba1c: 5.4 },
  { date: 'Jul 2026', glucose: 91, hba1c: 5.4 },
  { date: 'Sep 2026', glucose: 88, hba1c: 5.3 },
];

export const bloodPressureChartData = [
  { date: 'Oct 2025', systolic: 128, diastolic: 84, status: 'Pre-hypertension' },
  { date: 'Jan 2026', systolic: 124, diastolic: 82, status: 'Normal' },
  { date: 'Mar 2026', systolic: 120, diastolic: 78, status: 'Normal' },
  { date: 'Jul 2026', systolic: 118, diastolic: 76, status: 'Optimal' },
  { date: 'Sep 2026', systolic: 116, diastolic: 74, status: 'Optimal' },
];

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-01',
    action: 'Document Decryption & OCR Extraction',
    resource: 'CBC_Report_Apollo_Sep2026.pdf',
    timestamp: '2026-09-10 14:32:10 UTC',
    status: 'Success',
    ipAddress: '192.168.1.104 (Session Auth)',
  },
  {
    id: 'aud-02',
    action: 'Biomarker Normalization Pipeline',
    resource: 'Hemoglobin -> Standard LOINC 718-7',
    timestamp: '2026-09-10 14:32:15 UTC',
    status: 'Authorized',
    ipAddress: 'Worker-Node-us-east-1a',
  },
  {
    id: 'aud-03',
    action: 'Timeline Event Automatic Ingestion',
    resource: 'Event: CBC Follow-up Sep 10',
    timestamp: '2026-09-10 14:32:18 UTC',
    status: 'Success',
    ipAddress: 'System Core Engine',
  },
  {
    id: 'aud-04',
    action: 'Client Access from Authenticated Device',
    resource: 'Dashboard Session #SES-8821',
    timestamp: '2026-09-20 09:40:02 UTC',
    status: 'Authorized',
    ipAddress: '108.48.210.88 (Chrome / Mac OS)',
  },
  {
    id: 'aud-05',
    action: 'AES-256 Zero-Knowledge Vault Key Rotation',
    resource: 'Patient Record Vault Key #VK-942',
    timestamp: '2026-09-01 00:00:00 UTC',
    status: 'Encrypted',
    ipAddress: 'KMS-Secure-Enclave',
  },
];
