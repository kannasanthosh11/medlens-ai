import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Sparkles, 
  ScanLine, 
  FileText, 
  Activity, 
  Clock, 
  Search, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  TrendingUp,
  Brain,
  Database
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Award className="w-3.5 h-3.5 text-teal-600" />
          TENSORA 2026 • Problem ID: HLT-03 Healthcare Track
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Architecture & Hackathon Evaluation Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Comprehensive technical walkthrough of MedLens AI: multi-modal medical OCR, clinical NER, ontology normalization, and vector semantic retrieval.
        </p>
      </div>

      {/* Why MedLens AI? Section (Section #27 Requirement) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          The Clinical Problem & Core Innovation
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-rose-400">The Problem</h3>
            <p className="text-slate-300 leading-relaxed">
              Patients accumulate diagnostic reports across different hospitals, reference laboratories, and outpatient clinics. Older paper sheets and scanned PDFs are difficult to find, fragmented across mobile phone galleries and portal logins, and nearly impossible to compare longitudinally.
            </p>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-teal-400">The MedLens Solution</h3>
            <p className="text-slate-300 leading-relaxed">
              MedLens AI provides an automated personal health companion that ingests unorganized medical documents, extracts structured clinical entities (biomarkers, dosages, diagnoses), harmonizes variable terminology into standard LOINC codes, and generates an interactive chronological health timeline.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Impact */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-white block">1. Saves Time</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Eliminates manual digging through past paper folders.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-white block">2. Standardized</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Converts lab synonyms into unified clinical metrics.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-white block">3. Instant Retrieval</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Semantic query engine answers natural clinical questions.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
            <span className="font-bold text-white block">4. Consultation Prep</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Helps patients provide clean timelines to specialists.</span>
          </div>
        </div>
      </div>

      {/* AI Pipeline Architecture (Section #26 Requirement) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            End-to-End AI Engineering Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data flow from raw multi-page PDF or photo down to semantic search embeddings
          </p>
        </div>

        <div className="space-y-4">
          {/* Stage 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
              01
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Multi-Modal Document OCR Engine</h3>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                  Tesseract / Vision-Transformer
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Raw input (PDF / JPEG / PNG) undergoes bilateral filtering, adaptive deskewing, and Otsu binarization. The neural OCR segmenter outputs word-level spatial bounding boxes with confidence scores.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
              02
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Medical Named Entity Recognition (NER)</h3>
                <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-mono text-[10px]">
                  BioBERT / Clinical-LLM
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Extracted token stream is classified into semantic categories: <code>Medication</code>, <code>Dosage</code>, <code>Biomarker</code>, <code>Numeric Value</code>, <code>Unit</code>, <code>ICD-10 Diagnosis</code>, <code>Doctor</code>, and <code>Facility</code>.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
              03
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Ontology Normalization & LOINC Mapping</h3>
                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px]">
                  UMLS / LOINC Ontology
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Synonyms (e.g. <em>"Haemoglobin"</em>, <em>"Hgb"</em>, <em>"Hb"</em>) are resolved to the canonical <strong>Hemoglobin (LOINC: 718-7)</strong>. Units are harmonized (e.g. converting g/dL, mg/dL) and cross-referenced against laboratory reference ranges.
              </p>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
              04
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Health Timeline Generation & Entity Linkage</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px]">
                  Graph Episode Builder
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Entities are anchored along a temporal axis based on specimen collection dates. Links are maintained back to the exact bounding box and page in the source document.
              </p>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm">
              05
            </div>
            <div className="flex-1 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Semantic Vector Search</h3>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono text-[10px]">
                  Dense Embeddings Index
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Documents, summaries, and normalized biomarker records are indexed into semantic representations, allowing patients to ask questions like <em>"Find all reports where my hemoglobin was low"</em> and retrieve contextual reasoning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-3 Minute Hackathon Demo Script for Judges */}
      <div className="bg-white rounded-3xl border border-teal-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-teal-950 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            Recommended 2–3 Minute Presentation Demo Flow
          </h2>
          <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
            Judge Guide
          </span>
        </div>

        <ol className="list-decimal list-inside space-y-2.5 text-xs text-slate-700 leading-relaxed">
          <li>
            <strong>Landing Page (0:30):</strong> Showcase the clean clinical SaaS landing page, problem statement for HLT-03, and click <em>"Explore Demo"</em>.
          </li>
          <li>
            <strong>Patient Dashboard & Longitudinal Trends (0:45):</strong> Point out Alex Morgan's Hemoglobin trend showing recovery from 11.2 g/dL (Jan 2026) to 13.4 g/dL (Sep 2026) with Recharts.
          </li>
          <li>
            <strong>Report Upload & Neural OCR Animation (1:15):</strong> Click <em>"Add Medical Report"</em>, choose <em>"Sample 1: Apollo CBC"</em>, watch the 6-stage AI pipeline, and explore the split-screen OCR verification panel.
          </li>
          <li>
            <strong>Smart Health Timeline & Lab Normalization (1:45):</strong> Navigate to <em>"Health Timeline"</em> to show cross-hospital chronological episodes, then view normalized LOINC reference ranges in <em>"Lab Results"</em>.
          </li>
          <li>
            <strong>Semantic Search (2:15):</strong> Go to <em>"Ask Health Records"</em>, click <em>"Find all reports where my hemoglobin was low"</em>, and show the semantic query breakdown and ranked matches.
          </li>
          <li>
            <strong>Privacy & Architecture (2:45):</strong> Highlight the zero-knowledge vault disclaimer, audit ledger, and the technical pipeline specification.
          </li>
        </ol>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-1.5"
          >
            <span>Start Live Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/search"
            className="text-xs font-semibold text-teal-700 hover:underline"
          >
            Try Semantic Search →
          </Link>
        </div>
      </div>
    </div>
  );
};
