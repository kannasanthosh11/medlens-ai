export type ReportType = 
  | 'Blood Test' 
  | 'Radiology' 
  | 'Prescription' 
  | 'Consultation' 
  | 'Pathology' 
  | 'Cardiology';

export type LabStatus = 'Normal' | 'Attention' | 'Abnormal';

export type MedicationStatus = 'Active' | 'Completed' | 'Paused';

export type DiagnosisStatus = 'Active' | 'Managed' | 'Resolved';

export type EntityCategory = 
  | 'Medication' 
  | 'Dosage' 
  | 'Biomarker' 
  | 'Value' 
  | 'Diagnosis' 
  | 'Provider' 
  | 'Facility' 
  | 'Date';

export interface ExtractedEntity {
  id: string;
  category: EntityCategory;
  text: string;
  normalizedValue?: string;
  confidence: number; // 0 to 1
  sourceField?: string;
  startOffset?: number;
  endOffset?: number;
}

export interface LabResult {
  id: string;
  testName: string;
  normalizedName: string;
  value: number | string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  minRange?: number;
  maxRange?: number;
  status: LabStatus;
  date: string;
  category: 'Hematology' | 'Endocrinology' | 'Metabolic' | 'Lipid' | 'Vitamins' | 'General';
  interpretation?: string;
  sourceReportId: string;
  sourceReportTitle?: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  route?: string;
  startDate: string;
  endDate?: string;
  status: MedicationStatus;
  prescribingDoctor: string;
  facility: string;
  sourceReportId: string;
  instructions: string;
  indication: string;
}

export interface Diagnosis {
  id: string;
  conditionName: string;
  icd10?: string;
  dateIdentified: string;
  status: DiagnosisStatus;
  doctor: string;
  facility: string;
  sourceReportId: string;
  notes: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export interface MedicalReport {
  id: string;
  title: string;
  type: ReportType;
  date: string;
  provider: string;
  facility: string;
  status: 'Processed' | 'Processing' | 'Pending Review' | 'Failed';
  fileUrl?: string;
  fileName: string;
  fileSize: string;
  pageCount: number;
  summary: string;
  confidenceScore: number;
  extractedText: string;
  entities: ExtractedEntity[];
  labResults: LabResult[];
  medications: Medication[];
  diagnoses: Diagnosis[];
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'lab' | 'prescription' | 'diagnosis' | 'consultation' | 'radiology';
  summary: string;
  provider: string;
  facility: string;
  keyMetrics?: {
    label: string;
    value: string;
    status?: LabStatus;
  }[];
  reportId?: string;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  dob: string;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  totalReports: number;
  lastUpdated: string;
}

export interface SemanticSearchResult {
  report: MedicalReport;
  relevanceScore: number; // 0 to 100
  aiExplanation: string;
  matchingEntities: ExtractedEntity[];
  matchedSnippets: string[];
}

export interface AuditLogEntry {
  id: string;
  action: string;
  resource: string;
  timestamp: string;
  status: 'Success' | 'Authorized' | 'Encrypted';
  ipAddress: string;
}
