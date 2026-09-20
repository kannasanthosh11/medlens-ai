import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TimelineEvent } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Activity, 
  Pill, 
  Stethoscope, 
  Camera, 
  ChevronRight, 
  Building, 
  User, 
  Filter
} from 'lucide-react';

interface TimelineListProps {
  events: TimelineEvent[];
}

export const TimelineList: React.FC<TimelineListProps> = ({ events }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { key: 'all', label: 'All Records' },
    { key: 'lab', label: 'Lab Tests' },
    { key: 'prescription', label: 'Prescriptions' },
    { key: 'diagnosis', label: 'Diagnoses' },
    { key: 'consultation', label: 'Consultations' },
    { key: 'radiology', label: 'Radiology & Scans' },
  ];

  const filteredEvents = events.filter((ev) => {
    if (activeFilter === 'all') return true;
    return ev.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const getEventIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lab':
        return { icon: Activity, bg: 'bg-teal-500 text-white', border: 'border-teal-200' };
      case 'prescription':
        return { icon: Pill, bg: 'bg-emerald-500 text-white', border: 'border-emerald-200' };
      case 'diagnosis':
        return { icon: Stethoscope, bg: 'bg-amber-500 text-white', border: 'border-amber-200' };
      case 'radiology':
        return { icon: Camera, bg: 'bg-blue-500 text-white', border: 'border-blue-200' };
      default:
        return { icon: FileText, bg: 'bg-slate-700 text-white', border: 'border-slate-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-semibold">Filter:</span>
        </div>
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setActiveFilter(opt.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === opt.key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200/80 space-y-8 my-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
            <p className="text-sm">No medical events found matching the "{activeFilter}" filter.</p>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const badge = getEventIcon(ev.type);
            const IconComponent = badge.icon;

            return (
              <div key={ev.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-xl ${badge.bg} flex items-center justify-center shadow-md shadow-slate-200 border-2 border-white ring-2 ring-slate-100 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Event Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/80">
                          {ev.date}
                        </span>
                        <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                          {ev.type}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{ev.title}</h4>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap sm:flex-col sm:items-end gap-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {ev.facility}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <User className="w-3 h-3 text-slate-400" />
                        {ev.provider}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {ev.summary}
                  </p>

                  {/* Key Metrics / Biomarkers Pill Row */}
                  {ev.keyMetrics && ev.keyMetrics.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {ev.keyMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-xs"
                        >
                          <span className="text-slate-500 font-medium">{metric.label}:</span>
                          <strong className="text-slate-900">{metric.value}</strong>
                          {metric.status && <StatusBadge status={metric.status} size="sm" />}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Link to Source Report */}
                  {ev.reportId && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Correlated to primary diagnostic record
                      </span>
                      <Link
                        to={`/reports/${ev.reportId}`}
                        className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold group-hover:underline"
                      >
                        Inspect Source Report
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
