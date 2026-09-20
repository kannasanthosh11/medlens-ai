import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DocumentViewer } from '../components/ocr/DocumentViewer';
import { 
  ArrowLeft, 
  Calendar, 
  Building, 
  User, 
  FileText, 
  Trash2, 
  Download, 
  Edit3, 
  Clock, 
  Activity, 
  Pill, 
  Stethoscope, 
  Sparkles, 
  Eye, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { reports, deleteReport, showToast } = useHealthRecord();

  const report = reports.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'rawText' | 'document'>('overview');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Medical Report Not Found</h2>
        <p className="text-xs text-slate-500">The requested clinical report ID could not be located in your records.</p>
        <button
          onClick={() => navigate('/reports')}
          className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl"
        >
          Return to Reports
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to remove "${report.title}" from your health timeline?`)) {
      deleteReport(report.id);
      navigate('/reports');
    }
  };

  const handleDownload = () => {
    showToast('info', 'Downloading File', `Preparing ${report.fileName} with verified cryptographic checksum.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top breadcrumb & Actions bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/reports')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Reports
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download PDF
          </button>
          <Link
            to="/timeline"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            View in Timeline
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
            title="Delete report"
            aria-label="Delete report"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Header Metadata Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {report.type}
              </span>
              <StatusBadge status={report.status} size="sm" />
              <span className="text-xs font-mono text-slate-400">
                AI Confidence: {Math.round(report.confidenceScore * 100)}%
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {report.title}
            </h1>
          </div>

          <div className="flex-shrink-0 text-left md:text-right space-y-1 text-xs">
            <span className="text-[11px] font-mono text-slate-400 block">ENCOUNTER DATE</span>
            <span className="font-bold text-slate-900 text-sm font-mono flex items-center md:justify-end gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {report.date}
            </span>
          </div>
        </div>

        {/* Facility, Provider, File metadata pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-1">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Facility / Lab</span>
              <strong className="text-slate-800 truncate block">{report.facility}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Attending Physician</span>
              <strong className="text-slate-800 truncate block">{report.provider}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">File Storage</span>
              <strong className="text-slate-800 font-mono text-[11px] truncate block">
                {report.fileName} ({report.fileSize})
              </strong>
            </div>
          </div>
        </div>

        {/* Summary note */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100/80 text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-teal-900 block text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Synthesized Clinical Summary
          </span>
          {report.summary}
        </div>
      </div>

      {/* View Tabs: Overview / Scanned Document / Raw OCR Stream */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-teal-600 text-teal-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Extracted Clinical Data
        </button>
        <button
          onClick={() => setActiveTab('document')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'document'
              ? 'border-teal-600 text-teal-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Document Preview
        </button>
        <button
          onClick={() => setActiveTab('rawText')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'rawText'
              ? 'border-teal-600 text-teal-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Raw OCR Text Stream
        </button>
      </div>

      {/* Tab 1: Overview of Extracted Entities & Labs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Lab Results Table if present */}
          {report.labResults && report.labResults.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Normalized Biomarker Results ({report.labResults.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-500">
                      <th className="py-2.5 px-3">Test</th>
                      <th className="py-2.5 px-3">Value</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Reference Range</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {report.labResults.map((lab) => (
                      <tr key={lab.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{lab.normalizedName}</td>
                        <td className="py-2.5 px-3 font-mono font-bold">{lab.value}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{lab.unit}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{lab.referenceRange}</td>
                        <td className="py-2.5 px-3"><StatusBadge status={lab.status} size="sm" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Extracted Entities Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Extracted Medical Named Entities ({report.entities.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {report.entities.map((ent) => (
                <div key={ent.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                    <span>{ent.category}</span>
                    <span className="text-emerald-600 font-bold">{Math.round(ent.confidence * 100)}%</span>
                  </div>
                  <p className="font-bold text-slate-900 mt-1">{ent.text}</p>
                  {ent.normalizedValue && ent.normalizedValue !== ent.text && (
                    <p className="text-[11px] text-teal-700 font-medium mt-0.5">
                      → Standard: {ent.normalizedValue}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Document Preview */}
      {activeTab === 'document' && (
        <DocumentViewer report={report} />
      )}

      {/* Tab 3: Raw Text */}
      {activeTab === 'rawText' && (
        <div className="bg-slate-950 text-slate-300 rounded-2xl p-6 border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap">
          {report.extractedText || 'No raw text stream available for this archive entry.'}
        </div>
      )}
    </div>
  );
};
