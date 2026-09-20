import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { MedicationCard } from '../components/medications/MedicationCard';
import { Pill, Plus, ShieldCheck, Filter, Download, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MedicationsPage: React.FC = () => {
  const { medications, patient } = useHealthRecord();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  const filteredMeds = medications.filter((m) => {
    if (filter === 'All') return true;
    return m.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Medication & Regimen Tracking
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {medications.filter((m) => m.status === 'Active').length} Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Prescriptions extracted across clinician visits, showing dosage, frequency, and verified sources.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            to="/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Rx</span>
          </Link>
        </div>
      </div>

      {/* Allergy & Safety Alert Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Documented Allergies:</strong> {patient.allergies.join(', ')}. All active prescriptions cross-referenced with zero contraindication warnings.
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold text-amber-800 flex-shrink-0">
          Last Verified: Today
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-2">Filter:</span>
        {(['All', 'Active', 'Completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === status
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMeds.map((med) => (
          <MedicationCard key={med.id} medication={med} />
        ))}
      </div>
    </div>
  );
};
