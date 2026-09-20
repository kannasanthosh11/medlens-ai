import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ScanLine, 
  FileText, 
  Search, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Pill, 
  Stethoscope, 
  UploadCloud, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Play, 
  Cpu, 
  ChevronRight,
  Database,
  Eye
} from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Footer } from '../components/common/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePipelineStep, setActivePipelineStep] = useState(2);

  const pipelineStages = [
    { title: '1. Medical Document', desc: 'Scanned PDF, lab photo, or handwritten clinician prescription.', icon: FileText },
    { title: '2. OCR Engine', desc: 'Layout-aware bounding box text extraction with adaptive deskewing.', icon: ScanLine },
    { title: '3. Medical NER', desc: 'BioBERT / Clinical entity extraction for medications, dosages, labs.', icon: Cpu },
    { title: '4. Normalization', desc: 'Harmonizing synonyms into standard LOINC codes and reference bounds.', icon: Activity },
    { title: '5. Timeline Builder', desc: 'Auto-anchoring clinical episodes into an interactive chronology.', icon: Clock },
    { title: '6. Semantic Search', desc: 'Natural language semantic embedding index for instant answers.', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      <DisclaimerBanner variant="compact" />

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">MedLens</span>
              <span className="text-teal-600 font-extrabold text-lg tracking-tight">AI</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                TENSORA 2026 • HLT-03
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-600 transition-colors">How It Works</a>
            <a href="#pipeline" className="hover:text-teal-600 transition-colors">AI Pipeline</a>
            <a href="#security" className="hover:text-teal-600 transition-colors">Security</a>
            <Link to="/architecture" className="hover:text-teal-600 transition-colors">Judge Overview</Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Explore Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50/70 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              HLT-03: Medical Report Management Challenge
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Every medical report. <br />
              <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-sky-600 bg-clip-text text-transparent">
                One intelligent health timeline.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              MedLens AI transforms scattered medical reports into structured, searchable health information using multi-modal OCR, medical entity extraction, and intelligent timeline generation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/upload"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-teal-400" />
                Upload a Report
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-teal-600 fill-teal-600" />
                Explore Demo Patient
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-4">
              <span>✓ Interactive Simulated OCR</span>
              <span>•</span>
              <span>✓ Zero-Knowledge Architecture</span>
              <span>•</span>
              <span>✓ Preloaded Demo Patient (Alex Morgan)</span>
            </div>
          </div>

          {/* Hero Visual Preview */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="relative rounded-2xl bg-slate-900 p-2 sm:p-3 shadow-2xl border border-slate-800 animate-pulse-glow">
              {/* Fake browser bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-3 font-mono text-[11px] text-slate-500">medlens.ai/demo/alex-morgan</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-teal-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BioBERT Neural OCR Active</span>
                </div>
              </div>

              {/* Mock Dashboard Preview Grid */}
              <div className="bg-slate-950 p-4 sm:p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Left: Document with scan effect */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 relative overflow-hidden">
                  <div className="animate-scan-line" />
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                    <span className="font-mono text-teal-400">INPUT: PDF/SCAN</span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">Apollo CBC</span>
                  </div>
                  <div className="mt-3 space-y-2 text-[11px] font-mono text-slate-300">
                    <p className="text-slate-500">PATIENT: Alex Morgan (34/F)</p>
                    <div className="bg-teal-950/60 p-2 rounded border border-teal-700/50">
                      <p className="text-teal-300 font-bold">Hemoglobin: 13.4 g/dL</p>
                      <p className="text-[10px] text-slate-400">Ref: 12.0 - 16.0 g/dL [NORMAL]</p>
                    </div>
                    <div className="p-2 rounded bg-slate-800/50">
                      <p className="text-slate-200 font-semibold">Platelets: 245,000 /µL</p>
                      <p className="text-[10px] text-slate-400">Ref: 150k - 450k</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">
                      Impression: Resolution of iron deficiency anemia.
                    </p>
                  </div>
                </div>

                {/* Center: Extracted Biomarkers & Medication */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                    <span className="font-mono text-sky-400">EXTRACTED ENTITIES</span>
                    <span className="text-emerald-400 text-[10px]">Confidence 98%</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-teal-400 font-mono block">BIOMARKER</span>
                        <span className="font-bold text-white">Hemoglobin</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">13.4 g/dL</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-emerald-400 font-mono block">MEDICATION</span>
                        <span className="font-bold text-white">Ferrous Sulfate</span>
                      </div>
                      <span className="text-xs font-mono text-slate-300">325 mg / day</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-purple-400 font-mono block">DIAGNOSIS</span>
                        <span className="font-bold text-white">Iron Anemia</span>
                      </div>
                      <span className="text-[10px] font-semibold text-teal-300 bg-teal-900/60 px-1.5 py-0.5 rounded">
                        Managed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Chronological Timeline preview */}
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                    <span className="font-mono text-teal-400">TIMELINE RECONSTRUCTION</span>
                    <span className="text-[10px] text-slate-500">2026</span>
                  </div>
                  <div className="mt-3 pl-3 border-l-2 border-teal-500/40 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] text-teal-400 font-mono block">Sep 10, 2026</span>
                      <p className="font-semibold text-white">CBC Follow-up (Normal)</p>
                      <p className="text-[10px] text-slate-400">Hemoglobin reached 13.4 g/dL</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-400 font-mono block">Aug 28, 2026</span>
                      <p className="font-semibold text-slate-200">Prescription Refill</p>
                      <p className="text-[10px] text-slate-400">Dr. Arun Clinic</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono block">Jan 12, 2026</span>
                      <p className="font-semibold text-slate-300">Baseline Anemia Flagged</p>
                      <p className="text-[10px] text-rose-400">11.2 g/dL (Subnormal)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              Engineered for Clinical Precision
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powerful tools designed to solve scattered medical records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <ScanLine className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. AI Document OCR</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Extract text reliably from smartphone photos, high-res scans, and multi-page pathology PDFs with automated deskewing and layout segmentation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Medical Entity Extraction</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Clinical NLP isolates dosages, medication names, frequencies, biomarkers, diagnoses, physicians, and hospitals into structured data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Smart Health Timeline</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Automatically organize medical encounters across labs and clinics into a unified, interactive chronological stream.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">4. Lab Value Normalization</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Convert divergent lab names into standard LOINC codes and evaluate them against source-specific reference ranges with status flags.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">5. Semantic Record Search</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Query records naturally (e.g. <em>"Find all reports where my hemoglobin was low"</em>) without remembering exact file names or dates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">6. Privacy & Security First</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Architected around zero-knowledge vaults, simulated KMS audit trails, and strict user consent controls without unauthorized sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              Streamlined Experience
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How MedLens AI structures your health records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Upload Medical Report</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Drag and drop PDF lab tests, phone photos of prescriptions, or clinic summaries.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Extract Medical Entities</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                OCR and neural NER identify biomarkers, active dosages, diagnoses, and lab reference intervals.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Structure & Timeline</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Normalize units into LOINC standards and insert events into your longitudinal health timeline.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                04
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Semantic Search</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Ask conversational questions to retrieve correlated results and share summaries with doctors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Pipeline Interactive Section */}
      <section id="pipeline" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-semibold border border-teal-500/30">
              Interactive Architecture Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The MedLens Multi-Stage Clinical AI Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Click any stage in the ingestion pipeline to inspect technical processing specifications
            </p>
          </div>

          {/* Interactive Pipeline Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineStages.map((stg, idx) => {
              const Icon = stg.icon;
              const isSelected = activePipelineStep === idx;
              return (
                <button
                  key={stg.title}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-teal-950/80 border-teal-400 ring-2 ring-teal-400/50 shadow-lg'
                      : 'bg-slate-800/70 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-700 text-teal-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{stg.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">{stg.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Inspector Callout */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold uppercase">
                <Sparkles className="w-4 h-4" />
                Selected Stage Inspection: {pipelineStages[activePipelineStep].title}
              </div>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed max-w-2xl">
                {pipelineStages[activePipelineStep].desc}
              </p>
            </div>
            <Link
              to="/architecture"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-teal-300 bg-teal-950 hover:bg-teal-900 border border-teal-800 transition-colors flex items-center gap-1.5 flex-shrink-0"
            >
              Full AI Architecture Specification
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Zero-Knowledge Document Handling
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Built with privacy at the center.
              </h2>
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                Health records contain your most intimate clinical history. MedLens AI was designed with privacy-first architectural guidelines to ensure transparent patient ownership:
              </p>

              <div className="mt-6 space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">User-Controlled Health Records:</strong> You determine which reports enter your timeline and which entities are saved.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Zero Third-Party Model Training:</strong> Clinical tokens and OCR results are never fed into public foundation models.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Immutable Audit Ledger:</strong> Every access request, decryption event, and normalization run is logged with cryptographic timestamps.
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  to="/privacy"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Explore Privacy Center
                </Link>
                <Link
                  to="/settings"
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  Data Reset & Retention Settings →
                </Link>
              </div>
            </div>

            {/* Security Architecture Visual Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-mono text-xs text-teal-400">VAULT ENCRYPTION SIMULATION</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  AES-256-GCM
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-500 text-[10px]">PATIENT_MRN_HASH</p>
                  <p className="text-teal-300 text-[11px] truncate">
                    SHA256(ML-2026-8942::salt-94281)::7f83b1657ff1...
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-500 text-[10px]">SESSION_VAULT_DECRYPT</p>
                  <p className="text-emerald-400 text-[11px]">
                    STATUS: AUTHORIZED (Session #SES-8821 Active)
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                <strong>Prototype Notice:</strong> MedLens AI is a hackathon prototype demonstrating architecture. Production deployment would require regulatory review, business associate agreements (BAA), formal certification, and HIPAA/GDPR validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to experience intelligent medical report management?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Explore Alex Morgan's complete medical history, upload test reports, test the semantic search, and inspect the clinical pipeline.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              Launch Demo Patient
            </Link>
            <Link
              to="/upload"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Medical Report
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
