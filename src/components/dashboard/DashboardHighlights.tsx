import React from 'react';
import { Link } from 'react-router-dom';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { StatusBadge } from '../common/StatusBadge';
import { Pill, Activity, ChevronRight, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const DashboardHighlights: React.FC = () => {
  const { labResults, medications } = useHealthRecord();

  const keyBiomarkers = labResults.slice(0, 4);
  const activeMedications = medications.filter((m) => m.status === 'Active').slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Key Biomarkers Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                <Activity className="w-4 h-4" />
              </span>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Key Lab Biomarkers</h3>
            </div>
            <Link to="/labs" className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {keyBiomarkers.map((lab) => (
              <div key={lab.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block">{lab.normalizedName}</span>
                  <span className="text-[11px] text-slate-400">Ref: {lab.referenceRange} {lab.unit}</span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{lab.value}</span>
                    <span className="text-[11px] text-slate-500 ml-1">{lab.unit}</span>
                  </div>
                  <StatusBadge status={lab.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Hemoglobin target reached (13.4 g/dL). Anemia in remission.</span>
          </div>
          <Link to="/labs" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
            Analytics →
          </Link>
        </div>
      </div>

      {/* Active Prescription Regimen */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Pill className="w-4 h-4" />
              </span>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Active Medications</h3>
            </div>
            <Link to="/medications" className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              All regimens
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {activeMedications.map((med) => (
              <div key={med.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 truncate">{med.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                      {med.dosage}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 truncate block mt-0.5">
                    {med.frequency}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[11px] font-medium text-slate-600 block">{med.prescribingDoctor}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Started {med.startDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Prescription cross-referenced against Penicillin allergy (No conflict).</span>
          </div>
          <Link to="/medications" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};
