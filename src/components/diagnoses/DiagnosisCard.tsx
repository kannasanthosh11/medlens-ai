import React from 'react';
import { Link } from 'react-router-dom';
import { Diagnosis } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Stethoscope, Calendar, User, Building, FileText, ChevronRight, AlertCircle, ShieldAlert } from 'lucide-react';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex-shrink-0 mt-0.5">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {diagnosis.conditionName}
                </h4>
                {diagnosis.icd10 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200">
                    ICD: {diagnosis.icd10}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Severity: <span className="font-semibold text-slate-700">{diagnosis.severity}</span>
              </p>
            </div>
          </div>
          <StatusBadge status={diagnosis.status} size="sm" />
        </div>

        {/* Clinical notes extracted */}
        <div className="mt-4 space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 leading-relaxed">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block mb-1">
              Documented Clinical Findings
            </span>
            {diagnosis.notes}
          </div>

          <div className="space-y-1 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Diagnosed by: <strong className="text-slate-800">{diagnosis.doctor}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Facility: <strong className="text-slate-800">{diagnosis.facility}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Identified on: <strong className="font-mono text-slate-800">{diagnosis.dateIdentified}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-slate-400" />
          Extracted from physician report
        </span>
        <Link
          to={`/reports/${diagnosis.sourceReportId}`}
          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold"
        >
          View Source Record
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
