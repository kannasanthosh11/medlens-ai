import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { sampleUploadReports } from '../services/mockOcrEngine';
import { 
  UploadCloud, 
  FileText, 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Info, 
  ArrowRight,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveUploadDraft, showToast } = useHealthRecord();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSampleType, setSelectedSampleType] = useState<'cbc' | 'rx'>('cbc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    setSelectedFile(file);
    // Prepare upload draft based on file name or default to sample
    const isPdf = file.type.includes('pdf') || file.name.endsWith('.pdf');
    const isImage = file.type.includes('image') || file.name.endsWith('.png') || file.name.endsWith('.jpg');

    if (!isPdf && !isImage && !file.name.endsWith('.jpeg')) {
      showToast('error', 'Invalid File Type', 'Please upload a medical document in PDF, PNG, or JPG format.');
      return;
    }

    const draft = {
      ...sampleUploadReports.cbc,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    setActiveUploadDraft(draft);

    showToast('info', 'Document Received', `Beginning ingestion for "${file.name}"`);
    navigate('/processing');
  };

  const handleUseSample = (type: 'cbc' | 'rx') => {
    const draft = sampleUploadReports[type];
    setActiveUploadDraft(draft);
    showToast('info', 'Sample Loaded', `Simulating OCR pipeline for "${draft.title}"`);
    navigate('/processing');
  };

  const extractedItems = [
    'Patient demographics',
    'Test / Procedure names',
    'Numeric lab values',
    'Standard units (g/dL, /µL)',
    'Reference ranges',
    'Prescription drugs & dosages',
    'Administration frequencies',
    'Documented diagnoses & ICD',
    'Encounter dates',
    'Physicians & credentials',
    'Laboratories & Hospitals',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Add a Medical Report
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload PDF reports, scanned lab sheets, or mobile prescription photos for multi-stage clinical extraction.
        </p>
      </div>

      {/* Main Drag-and-Drop Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-white rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
          isDragging
            ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-teal-400 bg-white shadow-xs'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mx-auto shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Drop your medical report here</h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports high-resolution scans, photos, and digital lab PDFs
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">PDF</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">JPG</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">PNG</span>
            <span>Up to 25 MB</span>
          </div>

          <div className="pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
            >
              Browse Local Files
            </button>
          </div>
        </div>
      </div>

      {/* Hackathon 1-Click Demo Sample Selector */}
      <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-white rounded-2xl border border-teal-200 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-teal-950 uppercase tracking-wider">
              Hackathon Demonstration Preset Samples
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-200/60 text-teal-900">
            Instant 1-Click Testing
          </span>
        </div>

        <p className="text-xs text-teal-900/80 leading-relaxed">
          For quick evaluation during the presentation, choose one of these realistic synthetic test reports:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => handleUseSample('cbc')}
            className="p-4 rounded-xl bg-white border border-teal-200 hover:border-teal-400 text-left transition-all hover:shadow-md group flex items-start justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-600 font-mono block">Sample 1: Hematology</span>
              <h4 className="font-bold text-slate-900 text-xs mt-0.5 group-hover:text-teal-700">
                Complete Blood Count (CBC) Panel
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">Apollo Diagnostics • Hemoglobin 13.4 g/dL</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
          </button>

          <button
            onClick={() => handleUseSample('rx')}
            className="p-4 rounded-xl bg-white border border-teal-200 hover:border-teal-400 text-left transition-all hover:shadow-md group flex items-start justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-sky-600 font-mono block">Sample 2: Prescription</span>
              <h4 className="font-bold text-slate-900 text-xs mt-0.5 group-hover:text-teal-700">
                Clinical Prescription Note
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">Dr. Arun Clinic • Ferrous Sulfate 325 mg</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
          </button>
        </div>
      </div>

      {/* What MedLens AI Extracts */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          What MedLens AI Automatically Extracts & Normalizes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
          {extractedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span className="text-[11px] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 flex items-start gap-3 text-xs leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Prototype Privacy Notice:</strong> Use sample data for this prototype. Do not upload sensitive real-world patient records containing confidential Personal Health Information (PHI).
        </div>
      </div>
    </div>
  );
};
