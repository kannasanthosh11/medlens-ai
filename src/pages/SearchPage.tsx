import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { performSemanticSearch } from '../services/semanticSearch';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  X,
  Calendar,
  Building,
  Activity
} from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'Find all reports where my hemoglobin was low';
  const { reports } = useHealthRecord();

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState('All');

  const examplePrompts = [
    'Find all reports where my hemoglobin was low',
    'Show my blood tests from August',
    'When was my last thyroid test?',
    'Which medications were prescribed in 2026?',
    'Show reports mentioning hemoglobin',
    'Find my MRI reports',
    'Show all diagnoses related to anemia',
  ];

  // Perform search
  const { analysis, results } = performSemanticSearch(activeQuery, reports);

  // Filter results if advanced filters applied
  const filteredResults = results.filter((res) => {
    if (selectedType !== 'All' && res.report.type !== selectedType) return false;
    if (selectedFacility !== 'All' && !res.report.facility.includes(selectedFacility)) return false;
    return true;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
    setSearchParams({ q: query });
  };

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    setActiveQuery(prompt);
    setSearchParams({ q: prompt });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          Natural Language Clinical Retrieval Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Ask Your Health Records
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Search your medical history using everyday natural language questions without needing exact medical codes or dates.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-lg space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Find all reports where my hemoglobin was low'..."
              className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base text-slate-900 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-5 sm:px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center gap-2 flex-shrink-0 active:scale-[0.98]"
          >
            <span>Ask Records</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Example Prompts */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Suggested Clinical Queries:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className={`px-3 py-1 rounded-xl text-xs transition-all ${
                  activeQuery === prompt
                    ? 'bg-teal-900 text-white font-medium shadow-xs'
                    : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200/70'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic NLP Understanding Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Semantic Understanding Breakdown
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Intent: {analysis.detectedIntent}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Extracted Concepts</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {analysis.extractedConcepts.map((c, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 text-[11px] font-mono border border-teal-800">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Inferred Timeframe</span>
            <p className="text-slate-300 text-xs font-semibold mt-1">
              {analysis.inferredTimeframe || 'All Historical Records (2025–2026)'}
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Clinical Specialty</span>
            <p className="text-slate-300 text-xs font-semibold mt-1">
              {analysis.inferredCategory || 'Cross-Specialty Diagnostic Search'}
            </p>
          </div>
        </div>
      </div>

      {/* Results Header & Advanced Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">
            Relevant Reports ({filteredResults.length})
          </h2>
          <span className="text-xs text-slate-400">ranked by neural semantic match</span>
        </div>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {showAdvancedFilters ? 'Hide Advanced Filters' : 'Advanced Filters'}
        </button>
      </div>

      {/* Advanced Filters Drawer */}
      {showAdvancedFilters && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Report Modality / Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
            >
              <option value="All">All Modalities</option>
              <option value="Blood Test">Blood Test / Pathology</option>
              <option value="Radiology">Radiology / MRI / Scans</option>
              <option value="Prescription">Prescription Note</option>
              <option value="Consultation">Doctor Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Healthcare Facility
            </label>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs"
            >
              <option value="All">All Facilities</option>
              <option value="Apollo">Apollo Diagnostics</option>
              <option value="City Scan">City Scan Centre</option>
              <option value="Metro Labs">Metro Labs</option>
              <option value="Dr. Arun">Dr. Arun Clinic</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Results List */}
      <div className="space-y-4">
        {filteredResults.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500 space-y-3">
            <Search className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-bold text-slate-800 text-sm">No Matching Medical Records</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't locate documents matching "{activeQuery}". Try one of the suggested query chips above.
            </p>
          </div>
        ) : (
          filteredResults.map((item) => (
            <SearchResultCard
              key={item.report.id}
              result={item}
              query={activeQuery}
            />
          ))
        )}
      </div>
    </div>
  );
};
