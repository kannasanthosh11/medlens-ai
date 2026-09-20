import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { TimelineList } from '../components/timeline/TimelineList';
import { Clock, Download, Plus, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TimelinePage: React.FC = () => {
  const { timelineEvents, patient, showToast } = useHealthRecord();

  const handleExportTimeline = () => {
    showToast('success', 'Timeline Exported', 'Clinical summary chronology exported to JSON/FHIR format.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Health Timeline
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              {timelineEvents.length} Events
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological reconstruction of patient clinical episodes, lab draws, prescriptions, and consults.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportTimeline}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Timeline</span>
          </button>
          <Link
            to="/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Event</span>
          </Link>
        </div>
      </div>

      {/* Patient Summary Ribbon */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-xs border border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs">
            AM
          </div>
          <div>
            <span className="font-bold text-sm text-white">{patient.name}</span>
            <span className="text-slate-400 text-xs ml-2 font-mono">MRN: {patient.mrn}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
          <span>Age: {patient.age}</span>
          <span>•</span>
          <span>Blood: {patient.bloodGroup}</span>
          <span>•</span>
          <span className="text-teal-400">Allergies: Penicillin</span>
        </div>
      </div>

      {/* Timeline Stream Component */}
      <TimelineList events={timelineEvents} />
    </div>
  );
};
