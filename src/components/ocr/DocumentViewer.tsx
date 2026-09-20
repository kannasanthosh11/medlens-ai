import React, { useState } from 'react';
import { MedicalReport, ExtractedEntity } from '../../types';
import { FileText, Eye, ZoomIn, ZoomOut, CheckCircle, Sparkles } from 'lucide-react';

interface DocumentViewerProps {
  report: Partial<MedicalReport>;
  highlightedEntityId?: string | null;
  onSelectEntity?: (entity: ExtractedEntity) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  report,
  highlightedEntityId,
  onSelectEntity,
}) => {
  const [zoom, setZoom] = useState<number>(100);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full min-h-[580px]">
      {/* Viewer Toolbar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />
          <span className="font-mono text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
            {report.fileName || 'Scanned_Medical_Report.pdf'}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-teal-300 font-mono">
            {report.fileSize || '1.4 MB'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom((z) => Math.max(80, z - 10))}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1 text-slate-300">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(140, z + 10))}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto bg-slate-900/90 flex justify-center items-start">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-xl bg-white text-slate-900 rounded-lg shadow-2xl p-6 sm:p-8 font-sans border border-slate-200 transition-transform duration-200 relative select-text"
        >
          {/* Scanning line animation if processing or inspecting */}
          <div className="animate-scan-line pointer-events-none" />

          {/* Hospital / Lab Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
                  {report.facility || 'APOLLO DIAGNOSTICS'}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  Clinical Pathology & Diagnostic Testing • NABL & CAP Accredited
                </p>
                <p className="text-[10px] text-slate-500">Reg: #LAB-2026-7819 | ISO 15189 Certified</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-500">
                <div className="w-14 h-6 border border-slate-300 rounded flex items-center justify-center font-bold tracking-widest text-[9px] bg-slate-50 mb-1">
                  BARCODE
                </div>
                <span>SAMPLE: #9842-A</span>
              </div>
            </div>
          </div>

          {/* Patient Header Block */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded border border-slate-200 mb-5">
            <div>
              <p><span className="text-slate-500">Patient:</span> <strong className="text-slate-900">Alex Morgan</strong></p>
              <p><span className="text-slate-500">Age / Sex:</span> <strong>34 Y / Female</strong></p>
              <p><span className="text-slate-500">MRN:</span> <strong className="font-mono">ML-2026-8942</strong></p>
            </div>
            <div>
              <p><span className="text-slate-500">Date:</span> <strong>{report.date || '10-Sep-2026'}</strong></p>
              <p><span className="text-slate-500">Doctor:</span> <strong>{report.provider || 'Dr. Arun Kumar, MD'}</strong></p>
              <p><span className="text-slate-500">Type:</span> <strong>{report.type || 'Blood Test'}</strong></p>
            </div>
          </div>

          {/* Document Content / Extracted Text with Interactive Visual Entity Anchors */}
          <div className="space-y-4 text-xs font-mono">
            <div className="border-b border-slate-200 pb-1 flex justify-between font-bold text-slate-800 text-[11px]">
              <span>INVESTIGATION TEST</span>
              <span>OBSERVED</span>
              <span>REF RANGE</span>
              <span>STATUS</span>
            </div>

            {/* Test Lines */}
            <div 
              className={`p-1.5 rounded transition-all cursor-pointer flex justify-between items-center ${
                highlightedEntityId === 'ent-101' || highlightedEntityId === 'u-ent-01'
                  ? 'bg-teal-100 ring-2 ring-teal-500 font-bold'
                  : 'hover:bg-slate-100'
              }`}
              onClick={() => onSelectEntity && report.entities && onSelectEntity(report.entities[0])}
            >
              <span className="text-slate-900 font-sans font-semibold">Hemoglobin (Hgb)</span>
              <span className="font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">13.4 g/dL</span>
              <span className="text-slate-500">12.0 – 16.0</span>
              <span className="text-emerald-700 font-bold">NORMAL</span>
            </div>

            <div 
              className={`p-1.5 rounded transition-all cursor-pointer flex justify-between items-center ${
                highlightedEntityId === 'ent-103' || highlightedEntityId === 'u-ent-03'
                  ? 'bg-teal-100 ring-2 ring-teal-500 font-bold'
                  : 'hover:bg-slate-100'
              }`}
            >
              <span className="text-slate-900 font-sans font-semibold">Total WBC Count</span>
              <span className="font-bold text-slate-800">7,200 /µL</span>
              <span className="text-slate-500">4,000 – 11,000</span>
              <span className="text-emerald-700 font-bold">NORMAL</span>
            </div>

            <div 
              className={`p-1.5 rounded transition-all cursor-pointer flex justify-between items-center ${
                highlightedEntityId === 'ent-105' || highlightedEntityId === 'u-ent-05'
                  ? 'bg-teal-100 ring-2 ring-teal-500 font-bold'
                  : 'hover:bg-slate-100'
              }`}
            >
              <span className="text-slate-900 font-sans font-semibold">Platelet Count</span>
              <span className="font-bold text-slate-800">245,000 /µL</span>
              <span className="text-slate-500">150,000 – 450,000</span>
              <span className="text-emerald-700 font-bold">NORMAL</span>
            </div>

            <div className="p-1.5 rounded flex justify-between items-center text-slate-600">
              <span className="font-sans">RBC Count</span>
              <span>4.52 M/µL</span>
              <span className="text-slate-500">3.80 – 5.10</span>
              <span className="text-emerald-700">NORMAL</span>
            </div>

            <div className="p-1.5 rounded flex justify-between items-center text-slate-600">
              <span className="font-sans">Mean Corpuscular Vol (MCV)</span>
              <span>88.9 fL</span>
              <span className="text-slate-500">80.0 – 100.0</span>
              <span className="text-emerald-700">NORMAL</span>
            </div>

            {/* Clinical Impression Note */}
            <div className="mt-5 p-3 rounded bg-teal-50/70 border border-teal-200 font-sans text-xs">
              <h4 className="font-bold text-teal-900 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Clinical Interpretation:
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Normocytic normochromic red cell indices. Red cell parameters demonstrate marked improvement compared to baseline anemia study (12-Jan-2026). Resolved iron deficiency status.
              </p>
            </div>

            {/* Doctor Signature Stamp */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-end font-sans text-[11px] text-slate-500">
              <div>
                <p>Authenticity Check: Verified SHA-256</p>
                <p className="text-[10px] font-mono text-slate-400">UUID: rep-01-apollo-sec-v2</p>
              </div>
              <div className="text-right">
                <div className="italic font-serif text-slate-800 text-sm font-semibold mb-0.5">
                  Dr. Neha Kapoor, MD
                </div>
                <p className="font-semibold text-slate-700">Consultant Clinical Pathologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 px-4 py-2 text-[11px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-teal-400" />
          Click any highlighted biomarker line to inspect neural bounding box
        </span>
        <span className="font-mono text-teal-400">OCR Confidence: 98.5%</span>
      </div>
    </div>
  );
};
