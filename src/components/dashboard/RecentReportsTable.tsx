import React from 'react';
import { Link } from 'react-router-dom';
import { MedicalReport } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, ChevronRight, Building, Calendar, Sparkles } from 'lucide-react';

interface RecentReportsTableProps {
  reports: MedicalReport[];
  limit?: number;
}

export const RecentReportsTable: React.FC<RecentReportsTableProps> = ({ reports, limit = 5 }) => {
  const displayed = reports.slice(0, limit);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Recent Medical Documents</h3>
          <p className="text-xs text-slate-500 mt-0.5">Scanned and indexed across personal records</p>
        </div>
        <Link
          to="/reports"
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          View all {reports.length} reports
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5">Document / Report</th>
              <th className="py-3 px-4">Hospital / Laboratory</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {displayed.map((report) => (
              <tr 
                key={report.id}
                className="hover:bg-teal-50/30 transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4 sm:px-5">
                  <Link to={`/reports/${report.id}`} className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-teal-100/70 text-slate-600 group-hover:text-teal-700 transition-colors mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors block">
                        {report.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {report.fileName} • {report.fileSize}
                      </span>
                    </div>
                  </Link>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate max-w-[170px]">{report.facility}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block pl-5">{report.provider}</span>
                </td>

                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {report.date}
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {report.type}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <StatusBadge status={report.status} size="sm" />
                </td>

                <td className="py-3.5 px-4 text-right">
                  <Link
                    to={`/reports/${report.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                  >
                    Details
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
