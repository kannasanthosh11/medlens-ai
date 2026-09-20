import React from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { LabResultTable } from '../components/labs/LabResultTable';
import { HealthTrendChart } from '../components/dashboard/HealthTrendChart';
import { Activity, Download, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LabsPage: React.FC = () => {
  const { labResults, showToast } = useHealthRecord();

  const handleExportLabs = () => {
    showToast('success', 'Labs Exported', 'Biomarker table exported as clinical CSV format.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Lab Value Normalization & Tracker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              {labResults.length} Biomarkers
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standardized LOINC mapping and reference range monitoring across hematology, endocrinology, and metabolic assays.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportLabs}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <Link
            to="/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lab Test</span>
          </Link>
        </div>
      </div>

      {/* Biomarker Trend Analytics Chart */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            Longitudinal Biomarker Analysis
          </h3>
        </div>
        <HealthTrendChart />
      </div>

      {/* Lab Normalization Table */}
      <div>
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          All Normalized Test Records
        </h3>
        <LabResultTable labs={labResults} />
      </div>
    </div>
  );
};
