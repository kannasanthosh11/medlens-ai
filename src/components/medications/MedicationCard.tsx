import React from 'react';
import { Link } from 'react-router-dom';
import { Medication } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Pill, Calendar, User, Building, FileText, ChevronRight, AlertCircle, Info } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({ medication }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between">
      <div>
        {/* Top title & status */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex-shrink-0 mt-0.5">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {medication.name}
              </h4>
              {medication.genericName && (
                <p className="text-[11px] text-slate-500 font-mono">
                  Generic: {medication.genericName}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={medication.status} size="sm" />
        </div>

        {/* Dosage & Frequency details */}
        <div className="mt-4 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono block">Dosage</span>
              <span className="font-bold text-slate-800 text-xs">{medication.dosage}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono block">Route</span>
              <span className="font-medium text-slate-800">{medication.route || 'Oral'}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500">Frequency & Timing:</span>
            <p className="text-slate-800 font-medium mt-0.5">{medication.frequency}</p>
          </div>

          {medication.instructions && (
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <Info className="w-3 h-3 text-amber-600" /> Patient Instructions:
              </span>
              {medication.instructions}
            </div>
          )}

          <div className="space-y-1 pt-1 text-slate-600 text-[11px]">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Prescribed by: <strong className="text-slate-800">{medication.prescribingDoctor}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Started: <strong className="font-mono text-slate-800">{medication.startDate}</strong></span>
              {medication.endDate && (
                <span className="text-slate-400">• Completed {medication.endDate}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer link to source document */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400">Indication: {medication.indication}</span>
        <Link
          to={`/reports/${medication.sourceReportId}`}
          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold"
        >
          Source Rx
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
