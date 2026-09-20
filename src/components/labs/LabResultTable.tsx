import React, { useState } from 'react';
import { LabResult } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Search, 
  Info, 
  ChevronRight, 
  AlertTriangle, 
  Filter, 
  TrendingUp, 
  Download 
} from 'lucide-react';

interface LabResultTableProps {
  labs: LabResult[];
}

export const LabResultTable: React.FC<LabResultTableProps> = ({ labs }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Hematology', 'Endocrinology', 'Metabolic', 'Lipid', 'Vitamins'];

  const filteredLabs = labs.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch =
      item.testName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.normalizedName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Educational info notice */}
      <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-white">Biomarker Normalization & Reference Standardization</p>
          <p className="text-slate-300 mt-0.5">
            MedLens AI harmonizes variant clinical synonyms (e.g. <em>"Hgb"</em>, <em>"Haemoglobin"</em>, <em>"Hb"</em>) into standard LOINC concepts. Reference ranges reflect the source laboratory's methodology and must be interpreted by your physician.
          </p>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search test name (e.g. Hemoglobin, TSH)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 outline-none"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-5">Normalized Test</th>
                <th className="py-3 px-4">Observed Value</th>
                <th className="py-3 px-4">Standard Unit</th>
                <th className="py-3 px-4">Reference Range</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Collection Date</th>
                <th className="py-3 px-4 text-right">Source Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredLabs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No biomarker records matched your search query.
                  </td>
                </tr>
              ) : (
                filteredLabs.map((lab) => {
                  const isAbnormal = lab.status === 'Abnormal';
                  return (
                    <tr
                      key={lab.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isAbnormal ? 'bg-rose-50/25' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {lab.normalizedName}
                          {isAbnormal && (
                            <span title="Out of standard reference limits">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 inline" />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Raw: {lab.testName} • {lab.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <span className={`text-sm font-bold ${
                          isAbnormal ? 'text-rose-700' : 'text-slate-900'
                        }`}>
                          {lab.value}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-500">
                        {lab.unit}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {lab.referenceRange}
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={lab.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                        {lab.date}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/reports/${lab.sourceReportId}`}
                          className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium text-[11px]"
                        >
                          {lab.sourceReportTitle || 'View Document'}
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
