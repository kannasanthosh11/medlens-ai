import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { DiagnosisCard } from '../components/diagnoses/DiagnosisCard';
import { Stethoscope, ShieldAlert, Plus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DiagnosesPage: React.FC = () => {
  const { diagnoses } = useHealthRecord();
  const [filter, setFilter] = useState<string>('All');

  const filteredDiagnoses = diagnoses.filter((d) => {
    if (filter === 'All') return true;
    return d.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Clinical Diagnoses Record
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
              {diagnoses.length} Documented
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Conditions formally documented by licensed practitioners and extracted from diagnostic summaries.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Diagnostic Note</span>
          </Link>
        </div>
      </div>

      {/* Medical Safety Disclaimer Banner (Section #21 strict requirement) */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xs flex items-start gap-3.5 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-teal-300 uppercase tracking-wider text-[11px] mb-0.5">
            Diagnostic Integrity Policy
          </h4>
          <p className="text-slate-300">
            MedLens AI <strong>does not generate diagnoses from user-reported symptoms</strong>. Every diagnostic condition presented below was explicitly extracted from verified hospital discharge summaries, specialist consultations, or pathology reports signed by licensed physicians.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-2">Status:</span>
        {['All', 'Active', 'Managed', 'Resolved'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === st
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Diagnoses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiagnoses.map((diag) => (
          <DiagnosisCard key={diag.id} diagnosis={diag} />
        ))}
      </div>
    </div>
  );
};
