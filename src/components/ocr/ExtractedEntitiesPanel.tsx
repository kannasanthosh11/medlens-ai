import React, { useState } from 'react';
import { MedicalReport, ExtractedEntity, EntityCategory } from '../../types';
import { 
  Check, 
  Edit3, 
  Trash2, 
  Save, 
  Sparkles, 
  ShieldCheck, 
  Pill, 
  Activity, 
  Stethoscope, 
  Building, 
  User, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface ExtractedEntitiesPanelProps {
  report: Partial<MedicalReport>;
  onSave: (updatedReport: Partial<MedicalReport>) => void;
  onDiscard: () => void;
  onSelectEntity?: (entity: ExtractedEntity) => void;
  selectedEntityId?: string | null;
}

export const ExtractedEntitiesPanel: React.FC<ExtractedEntitiesPanelProps> = ({
  report,
  onSave,
  onDiscard,
  onSelectEntity,
  selectedEntityId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [entities, setEntities] = useState<ExtractedEntity[]>(report.entities || []);
  const [patientName, setPatientName] = useState('Alex Morgan');
  const [reportDate, setReportDate] = useState(report.date || '2026-09-10');
  const [facility, setFacility] = useState(report.facility || 'Apollo Diagnostics Centre');
  const [provider, setProvider] = useState(report.provider || 'Dr. Arun Kumar, MD');
  const [summary, setSummary] = useState(report.summary || '');

  const handleEntityChange = (id: string, newText: string) => {
    setEntities((prev) =>
      prev.map((ent) => (ent.id === id ? { ...ent, text: newText, normalizedValue: newText } : ent))
    );
  };

  const handleSaveAll = () => {
    const updated: Partial<MedicalReport> = {
      ...report,
      date: reportDate,
      facility,
      provider,
      summary,
      entities,
      status: 'Processed',
    };
    onSave(updated);
  };

  const getCategoryBadge = (cat: EntityCategory) => {
    switch (cat) {
      case 'Biomarker':
      case 'Value':
        return { bg: 'bg-teal-50 text-teal-800 border-teal-200', icon: Activity };
      case 'Medication':
      case 'Dosage':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: Pill };
      case 'Diagnosis':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-200', icon: Stethoscope };
      case 'Provider':
        return { bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: User };
      case 'Facility':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Building };
      default:
        return { bg: 'bg-slate-100 text-slate-700 border-slate-200', icon: Calendar };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-full">
      {/* Header with Verification Status */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
              Medical Entity Extraction & Verification
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Review and adjust AI-extracted biomarkers, pharmaceuticals, and providers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isEditing
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isEditing ? 'Editing Mode' : 'Edit Fields'}
          </button>
        </div>
      </div>

      {/* Primary Metadata fields */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Patient Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none disabled:bg-slate-100/60 disabled:text-slate-700"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Collection Date
            </label>
            <input
              type="date"
              disabled={!isEditing}
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              className="w-full text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none disabled:bg-slate-100/60 disabled:text-slate-700"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Facility / Laboratory
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="w-full text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none disabled:bg-slate-100/60 disabled:text-slate-700"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Attending Physician
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none disabled:bg-slate-100/60 disabled:text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Extracted Entity Categories Grid */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[420px]">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Detected Medical Entities ({entities.length})
            </h4>
            <span className="text-[11px] text-teal-600 font-medium">Confidence &gt; 95%</span>
          </div>

          <div className="space-y-2">
            {entities.map((ent) => {
              const badge = getCategoryBadge(ent.category);
              const CatIcon = badge.icon;
              const isSelected = selectedEntityId === ent.id;

              return (
                <div
                  key={ent.id}
                  onClick={() => onSelectEntity && onSelectEntity(ent)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500 shadow-xs'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className={`p-1.5 rounded-lg border ${badge.bg}`}>
                      <CatIcon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase text-slate-400 font-mono">
                          {ent.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded">
                          {Math.round(ent.confidence * 100)}% Match
                        </span>
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={ent.text}
                          onChange={(e) => handleEntityChange(ent.id, e.target.value)}
                          className="w-full text-xs font-semibold text-slate-900 bg-white px-2 py-1 rounded border border-slate-300 focus:border-teal-500 mt-1 outline-none"
                        />
                      ) : (
                        <p className="text-xs font-semibold text-slate-900 truncate mt-0.5">
                          {ent.text}
                        </p>
                      )}
                    </div>
                  </div>

                  {ent.normalizedValue && ent.normalizedValue !== ent.text && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-slate-400 block font-mono">Standardized</span>
                      <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                        {ent.normalizedValue}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Clinical Summary */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            AI Synthesized Clinical Summary
          </label>
          {isEditing ? (
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300 focus:border-teal-500 outline-none leading-relaxed"
            />
          ) : (
            <p className="text-xs text-slate-600 leading-relaxed">
              {summary || report.summary || 'Summary generated automatically after entity verification.'}
            </p>
          )}
        </div>
      </div>

      {/* Footer Verification Action Buttons */}
      <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 rounded-b-2xl flex items-center justify-between gap-3">
        <button
          onClick={onDiscard}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Discard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Verify & Save to Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
