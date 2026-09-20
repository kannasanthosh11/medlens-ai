import React from 'react';
import { FileText, Activity, Pill, Stethoscope, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHealthRecord } from '../../context/HealthRecordContext';

export const MetricCards: React.FC = () => {
  const { reports, labResults, medications, diagnoses, patient } = useHealthRecord();

  const activeMedsCount = medications.filter((m) => m.status === 'Active').length;
  const abnormalLabsCount = labResults.filter((l) => l.status === 'Abnormal' || l.status === 'Attention').length;

  const metrics = [
    {
      label: 'Medical Reports',
      value: `${reports.length}`,
      subtext: 'Across 4 hospitals/labs',
      icon: FileText,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
      link: '/reports',
    },
    {
      label: 'Lab Biomarkers',
      value: `${labResults.length}`,
      subtext: `${abnormalLabsCount} flagged for review`,
      icon: Activity,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      link: '/labs',
    },
    {
      label: 'Medications',
      value: `${activeMedsCount} Active`,
      subtext: `${medications.length} total logged in regimen`,
      icon: Pill,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      link: '/medications',
    },
    {
      label: 'Diagnoses',
      value: `${diagnoses.length} Recorded`,
      subtext: '4 Managed / 1 Resolved',
      icon: Stethoscope,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-100',
      link: '/diagnoses',
    },
    {
      label: 'Last Synced',
      value: 'Today',
      subtext: patient.lastUpdated,
      icon: Clock,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
      link: '/timeline',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            to={item.link}
            className="group relative bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-xl border ${item.iconBg}`}>
                <Icon className="w-4 h-4" />
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 tracking-tight group-hover:text-teal-900 transition-colors">
                {item.value}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 truncate">{item.subtext}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
