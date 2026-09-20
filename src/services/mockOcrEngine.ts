import { MedicalReport, ExtractedEntity, LabResult } from '../types';

export interface ProcessingStage {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  durationMs: number;
}

export const defaultPipelineStages: ProcessingStage[] = [
  {
    id: 'receive',
    name: 'Document Ingestion',
    description: 'Validating MIME type, anti-virus sandbox scan, checksum calculation',
    status: 'pending',
    durationMs: 700,
  },
  {
    id: 'enhancement',
    name: 'Image Enhancement & Deskewing',
    description: 'Adaptive thresholding, bilateral noise filtering, orientation correction',
    status: 'pending',
    durationMs: 800,
  },
  {
    id: 'ocr',
    name: 'Clinical OCR Extraction',
    description: 'Neural optical character recognition & layout bounding-box segmentation',
    status: 'pending',
    durationMs: 1000,
  },
  {
    id: 'ner',
    name: 'Medical NER (Named Entity Recognition)',
    description: 'Identifying biomarkers, dosages, pharmaceuticals, ICD diagnoses, providers',
    status: 'pending',
    durationMs: 1100,
  },
  {
    id: 'normalization',
    name: 'Lab Normalization & Standard LOINC Mapping',
    description: 'Normalizing units (g/dL, /µL), computing reference ranges, classifying status',
    status: 'pending',
    durationMs: 850,
  },
  {
    id: 'timeline',
    name: 'Intelligent Health Timeline Generation',
    description: 'Anchoring clinical events chronologically with cross-document entity linkage',
    status: 'pending',
    durationMs: 750,
  },
];

export const sampleUploadReports: Record<string, Partial<MedicalReport>> = {
  cbc: {
    id: 'upload-cbc-sample',
    title: 'Complete Blood Count (CBC) Panel - Apollo Diagnostics',
    type: 'Blood Test',
    date: '2026-09-10',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Apollo Diagnostics Centre',
    status: 'Processed',
    fileName: 'CBC_Patient_Scan_Sep2026.pdf',
    fileSize: '1.4 MB',
    pageCount: 2,
    confidenceScore: 0.985,
    summary: 'Automated hematology analysis shows fully resolved anemia. Hemoglobin is optimal at 13.4 g/dL. Total leukocyte count and platelets are normal.',
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

DIFFERENTIAL LEUKOCYTE COUNT (DLC)
Neutrophils                62               40 - 75           %       NORMAL
Lymphocytes                30               20 - 45           %       NORMAL
Monocytes                  5                2 - 8             %       NORMAL
Eosinophils                2                1 - 6             %       NORMAL
Basophils                  1                0 - 2             %       NORMAL

CLINICAL IMPRESSION:
Peripheral smear demonstrates normocytic normochromic red cells. Comparison with 12-Jan-2026 report indicates successful recovery from iron deficiency anemia.
Electronically signed by: Dr. Neha Kapoor, MD Pathologist`,
    entities: [
      { id: 'u-ent-01', category: 'Biomarker', text: 'Hemoglobin (Hgb)', normalizedValue: 'Hemoglobin', confidence: 0.99 },
      { id: 'u-ent-02', category: 'Value', text: '13.4 g/dL', normalizedValue: '13.4 g/dL', confidence: 0.99 },
      { id: 'u-ent-03', category: 'Biomarker', text: 'Total Leukocyte Count (WBC)', normalizedValue: 'White Blood Cell Count', confidence: 0.98 },
      { id: 'u-ent-04', category: 'Value', text: '7,200 /µL', normalizedValue: '7200 /µL', confidence: 0.98 },
      { id: 'u-ent-05', category: 'Biomarker', text: 'Platelet Count', normalizedValue: 'Platelets', confidence: 0.99 },
      { id: 'u-ent-06', category: 'Value', text: '245,000 /µL', normalizedValue: '245000 /µL', confidence: 0.99 },
      { id: 'u-ent-07', category: 'Diagnosis', text: 'Recovery from iron deficiency anemia', normalizedValue: 'Iron Deficiency Anemia (Resolved)', confidence: 0.94 },
      { id: 'u-ent-08', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.98 },
      { id: 'u-ent-09', category: 'Facility', text: 'Apollo Diagnostics Centre', normalizedValue: 'Apollo Diagnostics', confidence: 0.99 },
      { id: 'u-ent-10', category: 'Date', text: '10-Sep-2026', normalizedValue: '2026-09-10', confidence: 0.99 },
    ],
    labResults: [
      {
        id: 'u-lab-01',
        testName: 'Hemoglobin (Hgb)',
        normalizedName: 'Hemoglobin',
        value: 13.4,
        numericValue: 13.4,
        unit: 'g/dL',
        referenceRange: '12.0 – 16.0',
        status: 'Normal',
        date: '2026-09-10',
        category: 'Hematology',
        interpretation: 'Within normal limits. Excellent response to 6 months iron therapy.',
        sourceReportId: 'upload-cbc-sample',
      },
      {
        id: 'u-lab-02',
        testName: 'White Blood Cell Count (WBC)',
        normalizedName: 'White Blood Cells',
        value: 7200,
        numericValue: 7200,
        unit: '/µL',
        referenceRange: '4,000 – 11,000',
        status: 'Normal',
        date: '2026-09-10',
        category: 'Hematology',
        interpretation: 'Normal baseline immune defense.',
        sourceReportId: 'upload-cbc-sample',
      },
      {
        id: 'u-lab-03',
        testName: 'Platelets',
        normalizedName: 'Platelet Count',
        value: 245000,
        numericValue: 245000,
        unit: '/µL',
        referenceRange: '150,000 – 450,000',
        status: 'Normal',
        date: '2026-09-10',
        category: 'Hematology',
        interpretation: 'Normal clotting capability.',
        sourceReportId: 'upload-cbc-sample',
      },
    ],
    medications: [],
    diagnoses: [],
    tags: ['Blood Test', 'CBC', 'Hematology', 'Apollo Diagnostics', 'Normal'],
  },
  rx: {
    id: 'upload-rx-sample',
    title: 'Outpatient Prescription Note - Dr. Arun Clinic',
    type: 'Prescription',
    date: '2026-08-28',
    provider: 'Dr. Arun Kumar, MD',
    facility: 'Dr. Arun Clinic & Wellness Center',
    status: 'Processed',
    fileName: 'Prescription_DrArun_Aug2026.pdf',
    fileSize: '850 KB',
    pageCount: 1,
    confidenceScore: 0.99,
    summary: 'Clinical prescription authorizing Ferrous Sulfate 325 mg oral tablets and Vitamin D3 maintenance dose.',
    extractedText: `DR. ARUN CLINIC & WELLNESS CENTER
104 Healthcare Boulevard, Suite 400 | Ph: (555) 019-4820
Patient: Alex Morgan (34/F)        Date: 28-Aug-2026

Rx:
1. Ferrous Sulfate 325 mg (65 mg elemental iron)
   Take 1 tablet orally once daily on an empty stomach with citrus juice.
   Qty: #60 tablets | Refills: 2

2. Vitamin D3 (Cholecalciferol) 60,000 IU
   Take 1 capsule once monthly.
   Qty: #8 capsules | Refills: 1

3. Cetirizine HCl 10 mg
   Take 1 tablet at bedtime as needed for allergic rhinitis.
   Qty: #30 tablets | Refills: 3

Signed: Dr. Arun Kumar, MD`,
    entities: [
      { id: 'u-rx-01', category: 'Medication', text: 'Ferrous Sulfate', normalizedValue: 'Ferrous Sulfate', confidence: 0.99 },
      { id: 'u-rx-02', category: 'Dosage', text: '325 mg', normalizedValue: '325 mg', confidence: 0.99 },
      { id: 'u-rx-03', category: 'Medication', text: 'Vitamin D3 (Cholecalciferol)', normalizedValue: 'Vitamin D3', confidence: 0.98 },
      { id: 'u-rx-04', category: 'Dosage', text: '60,000 IU', normalizedValue: '60,000 IU', confidence: 0.98 },
      { id: 'u-rx-05', category: 'Medication', text: 'Cetirizine HCl', normalizedValue: 'Cetirizine', confidence: 0.97 },
      { id: 'u-rx-06', category: 'Dosage', text: '10 mg', normalizedValue: '10 mg', confidence: 0.99 },
      { id: 'u-rx-07', category: 'Provider', text: 'Dr. Arun Kumar, MD', normalizedValue: 'Dr. Arun Kumar', confidence: 0.99 },
      { id: 'u-rx-08', category: 'Date', text: '28-Aug-2026', normalizedValue: '2026-08-28', confidence: 0.99 },
    ],
    labResults: [],
    medications: [
      {
        id: 'u-med-01',
        name: 'Ferrous Sulfate',
        genericName: 'Iron (II) Sulfate',
        dosage: '325 mg',
        frequency: 'Once daily with citrus juice on empty stomach',
        startDate: '2026-08-28',
        status: 'Active',
        prescribingDoctor: 'Dr. Arun Kumar, MD',
        facility: 'Dr. Arun Clinic & Wellness Center',
        sourceReportId: 'upload-rx-sample',
        instructions: 'Take with vitamin C / orange juice for best absorption.',
        indication: 'Iron Deficiency Maintenance',
      },
      {
        id: 'u-med-02',
        name: 'Vitamin D3 (Cholecalciferol)',
        genericName: 'Cholecalciferol',
        dosage: '60,000 IU',
        frequency: 'Once monthly maintenance',
        startDate: '2026-08-28',
        status: 'Active',
        prescribingDoctor: 'Dr. Arun Kumar, MD',
        facility: 'Dr. Arun Clinic & Wellness Center',
        sourceReportId: 'upload-rx-sample',
        instructions: 'Take with a meal.',
        indication: 'Vitamin D replenishment maintenance',
      }
    ],
    diagnoses: [],
    tags: ['Prescription', 'Medication', 'Iron', 'Vitamin D'],
  }
};
