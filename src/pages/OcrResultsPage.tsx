import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { DocumentViewer } from '../components/ocr/DocumentViewer';
import { ExtractedEntitiesPanel } from '../components/ocr/ExtractedEntitiesPanel';
import { sampleUploadReports } from '../services/mockOcrEngine';
import { MedicalReport, ExtractedEntity } from '../types';
import { 
  Sparkles, 
  ArrowLeft, 
  ShieldAlert, 
  FileCheck2, 
  Eye,
  Layers
} from 'lucide-react';

export const OcrResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeUploadDraft, addReport, showToast, setActiveUploadDraft } = useHealthRecord();

  // Fallback to sample CBC if draft is empty
  const currentDraft: Partial<MedicalReport> = activeUploadDraft || sampleUploadReports.cbc;

  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    currentDraft.entities && currentDraft.entities.length > 0 ? currentDraft.entities[0].id : null
  );

  const handleSelectEntity = (entity: ExtractedEntity) => {
    setSelectedEntityId(entity.id);
  };

  const handleSave = (updated: Partial<MedicalReport>) => {
    const finalReport: MedicalReport = {
      id: updated.id || `rep-${Date.now()}`,
      title: updated.title || 'Verified Clinical Report',
      type: updated.type || 'Blood Test',
      date: updated.date || '2026-09-10',
      provider: updated.provider || 'Dr. Arun Kumar, MD',
      facility: updated.facility || 'Apollo Diagnostics Centre',
      status: 'Processed',
      fileName: updated.fileName || 'Uploaded_Report.pdf',
      fileSize: updated.fileSize || '1.4 MB',
      pageCount: updated.pageCount || 1,
      confidenceScore: updated.confidenceScore || 0.98,
      summary: updated.summary || 'Clinical record processed and verified by patient.',
      extractedText: updated.extractedText || '',
      entities: updated.entities || [],
      labResults: updated.labResults || [],
      medications: updated.medications || [],
      diagnoses: updated.diagnoses || [],
      tags: updated.tags || ['Verified', 'Medical Report'],
    };

    addReport(finalReport);
    setActiveUploadDraft(null);
    navigate(`/reports/${finalReport.id}`);
  };

  const handleDiscard = () => {
    setActiveUploadDraft(null);
    showToast('info', 'Report Discarded', 'Draft extraction was discarded.');
    navigate('/upload');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/upload')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Upload
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Verify Extracted Information
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              OCR Complete
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare the scanned medical source document on the left against the AI-extracted biomarkers, dosages, and clinical codes on the right.
          </p>
        </div>
      </div>

      {/* Split Screen Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Document Preview (5 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <DocumentViewer
            report={currentDraft}
            highlightedEntityId={selectedEntityId}
            onSelectEntity={handleSelectEntity}
          />
        </div>

        {/* Right Column: Extracted Entities Panel (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <ExtractedEntitiesPanel
            report={currentDraft}
            onSave={handleSave}
            onDiscard={handleDiscard}
            onSelectEntity={handleSelectEntity}
            selectedEntityId={selectedEntityId}
          />
        </div>
      </div>
    </div>
  );
};
