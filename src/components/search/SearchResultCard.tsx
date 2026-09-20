import React from 'react';
import { Link } from 'react-router-dom';
import { SemanticSearchResult } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, Sparkles, ChevronRight, Calendar, Building, CheckCircle2 } from 'lucide-react';

interface SearchResultCardProps {
  result: SemanticSearchResult;
  query: string;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, query }) => {
  const { report, relevanceScore, aiExplanation, matchingEntities, matchedSnippets } = result;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between">
      <div>
        {/* Header with relevance score badge */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {report.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">{report.date}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mt-1">
                {report.title}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {report.facility} • {report.provider}
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
              <Sparkles className="w-3 h-3 text-teal-600" />
              {relevanceScore}% Match
            </span>
          </div>
        </div>

        {/* AI Semantic Explanation Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100/80 flex items-start gap-2.5 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-teal-950 block text-[11px] uppercase tracking-wider">
              Semantic Matching Analysis
            </span>
            <p className="text-slate-700 mt-0.5">{aiExplanation}</p>
          </div>
        </div>

        {/* Matched Snippet */}
        {matchedSnippets.length > 0 && (
          <p className="text-xs text-slate-600 mt-3 italic line-clamp-2 leading-relaxed">
            "{matchedSnippets[0]}"
          </p>
        )}

        {/* Matching Entities Chips */}
        {matchingEntities.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono mr-1">
              Extracted Entities:
            </span>
            {matchingEntities.map((ent) => (
              <span
                key={ent.id}
                className="px-2 py-0.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/80"
              >
                {ent.normalizedValue || ent.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-slate-400">
          Confidence: {Math.round(report.confidenceScore * 100)}%
        </span>
        <Link
          to={`/reports/${report.id}`}
          className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700"
        >
          View Complete Clinical Report
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
