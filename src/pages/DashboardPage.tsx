import React from 'react';
import { Link } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { MetricCards } from '../components/dashboard/MetricCards';
import { HealthTrendChart } from '../components/dashboard/HealthTrendChart';
import { RecentReportsTable } from '../components/dashboard/RecentReportsTable';
import { DashboardHighlights } from '../components/dashboard/DashboardHighlights';
import { 
  UploadCloud, 
  Search, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  FileText
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { patient, reports, labResults, medications } = useHealthRecord();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Good morning, {patient.name.split(' ')[0]}
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              Health Record Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here's an overview of your medical reports and normalized clinical timeline.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link
            to="/search"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Ask Records</span>
          </Link>
          <Link
            to="/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Medical Report</span>
          </Link>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <MetricCards />

      {/* Health Overview & Biomarker Trends */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider">
            Health Overview & Longitudinal Trends
          </h2>
          <span className="text-xs text-teal-600 font-medium font-mono">
            Updated via automated extraction
          </span>
        </div>
        <HealthTrendChart />
      </div>

      {/* Highlights: Key Biomarkers & Active Meds */}
      <DashboardHighlights />

      {/* Recent Medical Reports Table */}
      <RecentReportsTable reports={reports} limit={5} />

      {/* AI Assistant Quick Prompt Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">Ask your health records in plain language</h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
              "Find all reports where my hemoglobin was low", "When was my last thyroid test?", or "Which medications were prescribed in 2026?"
            </p>
          </div>
        </div>
        <Link
          to="/search"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Ask Health Records</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
