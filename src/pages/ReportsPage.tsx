import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { ReportType } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  FileText, 
  Search, 
  Filter, 
  UploadCloud, 
  Building, 
  Calendar, 
  ChevronRight, 
  Layers,
  Sparkles
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { reports } = useHealthRecord();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Blood Test', 'Radiology', 'Prescription', 'Consultation', 'Pathology', 'Cardiology'];

  const filteredReports = reports.filter((r) => {
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.facility.toLowerCase().includes(q) ||
      r.provider.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Medical Reports Archive
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access and manage all scanned clinical files, lab evaluations, and prescriptions.
          </p>
        </div>

        <Link
          to="/upload"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Report</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, clinic, doctor, or biomarker..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedType === t
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReports.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500 space-y-3">
            <FileText className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No medical reports found</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No records match "{searchQuery}". Try a different search term or upload a new report.
            </p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {report.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{report.date}</span>
                  </div>
                  <StatusBadge status={report.status} size="sm" />
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {report.title}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5 truncate">
                      <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {report.facility}
                    </p>
                    <p className="text-[11px] text-slate-400 pl-5 truncate">
                      Provider: {report.provider}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {report.summary}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400">
                  {report.fileName} • {report.pageCount} pgs
                </span>
                <span className="font-semibold text-teal-600 group-hover:text-teal-700 flex items-center gap-1">
                  Inspect
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
