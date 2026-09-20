import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Patient, 
  MedicalReport, 
  LabResult, 
  Medication, 
  Diagnosis, 
  TimelineEvent, 
  AuditLogEntry 
} from '../types';
import { 
  mockPatient, 
  mockReports, 
  mockLabResults, 
  mockMedications, 
  mockDiagnoses, 
  mockTimelineEvents, 
  mockAuditLogs 
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface HealthRecordContextType {
  patient: Patient;
  reports: MedicalReport[];
  labResults: LabResult[];
  medications: Medication[];
  diagnoses: Diagnosis[];
  timelineEvents: TimelineEvent[];
  auditLogs: AuditLogEntry[];
  activeUploadDraft: Partial<MedicalReport> | null;
  toasts: ToastMessage[];
  setActiveUploadDraft: (draft: Partial<MedicalReport> | null) => void;
  addReport: (report: MedicalReport) => void;
  updateReport: (id: string, updated: Partial<MedicalReport>) => void;
  deleteReport: (id: string) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  resetDemoData: () => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const HealthRecordContext = createContext<HealthRecordContextType | undefined>(undefined);

const STORAGE_KEY = 'medlens_ai_state_v1';

export const HealthRecordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient>(mockPatient);
  const [reports, setReports] = useState<MedicalReport[]>(mockReports);
  const [labResults, setLabResults] = useState<LabResult[]>(mockLabResults);
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(mockDiagnoses);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(mockTimelineEvents);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [activeUploadDraft, setActiveUploadDraft] = useState<Partial<MedicalReport> | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Show Toast
  const showToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss after 4.5s
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add report
  const addReport = (newReport: MedicalReport) => {
    setReports((prev) => [newReport, ...prev]);

    // Ingest new labs
    if (newReport.labResults && newReport.labResults.length > 0) {
      setLabResults((prev) => [...newReport.labResults, ...prev]);
    }

    // Ingest new medications
    if (newReport.medications && newReport.medications.length > 0) {
      setMedications((prev) => [...newReport.medications, ...prev]);
    }

    // Ingest new diagnoses
    if (newReport.diagnoses && newReport.diagnoses.length > 0) {
      setDiagnoses((prev) => [...newReport.diagnoses, ...prev]);
    }

    // Ingest timeline event
    const newTimelineEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      date: newReport.date,
      title: newReport.title,
      type: newReport.type === 'Blood Test' ? 'lab' : newReport.type === 'Prescription' ? 'prescription' : newReport.type === 'Radiology' ? 'radiology' : 'consultation',
      summary: newReport.summary,
      provider: newReport.provider,
      facility: newReport.facility,
      reportId: newReport.id,
      keyMetrics: newReport.labResults.map((lr) => ({
        label: lr.normalizedName,
        value: `${lr.value} ${lr.unit}`,
        status: lr.status,
      })),
    };
    setTimelineEvents((prev) => [newTimelineEvent, ...prev]);

    // Update patient stats
    setPatient((prev) => ({
      ...prev,
      totalReports: prev.totalReports + 1,
      lastUpdated: 'Just now',
    }));

    // Ingest audit log
    const audit: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      action: `OCR Ingestion & Extraction Verified: ${newReport.title}`,
      resource: newReport.fileName || newReport.title,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      status: 'Success',
      ipAddress: '192.168.1.104 (Demo Patient)',
    };
    setAuditLogs((prev) => [audit, ...prev]);

    showToast('success', 'Report Added', `"${newReport.title}" has been successfully added to your health timeline.`);
  };

  const updateReport = (id: string, updated: Partial<MedicalReport>) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
    showToast('info', 'Report Updated', 'Your changes have been saved.');
  };

  const deleteReport = (id: string) => {
    const reportToDelete = reports.find((r) => r.id === id);
    setReports((prev) => prev.filter((r) => r.id !== id));
    setLabResults((prev) => prev.filter((l) => l.sourceReportId !== id));
    setMedications((prev) => prev.filter((m) => m.sourceReportId !== id));
    setDiagnoses((prev) => prev.filter((d) => d.sourceReportId !== id));
    setTimelineEvents((prev) => prev.filter((t) => t.reportId !== id));

    setPatient((prev) => ({
      ...prev,
      totalReports: Math.max(0, prev.totalReports - 1),
    }));

    showToast('info', 'Report Removed', `Report "${reportToDelete?.title || id}" has been removed.`);
  };

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents((prev) => [event, ...prev]);
    showToast('success', 'Timeline Updated', 'New health event added.');
  };

  const resetDemoData = () => {
    setPatient(mockPatient);
    setReports(mockReports);
    setLabResults(mockLabResults);
    setMedications(mockMedications);
    setDiagnoses(mockDiagnoses);
    setTimelineEvents(mockTimelineEvents);
    setAuditLogs(mockAuditLogs);
    setActiveUploadDraft(null);
    showToast('info', 'Demo Data Reset', 'Fictional demo data restored to initial clean state.');
  };

  return (
    <HealthRecordContext.Provider
      value={{
        patient,
        reports,
        labResults,
        medications,
        diagnoses,
        timelineEvents,
        auditLogs,
        activeUploadDraft,
        toasts,
        setActiveUploadDraft,
        addReport,
        updateReport,
        deleteReport,
        addTimelineEvent,
        resetDemoData,
        showToast,
        removeToast,
      }}
    >
      {children}
    </HealthRecordContext.Provider>
  );
};

export const useHealthRecord = () => {
  const context = useContext(HealthRecordContext);
  if (!context) {
    throw new Error('useHealthRecord must be used within a HealthRecordProvider');
  }
  return context;
};
