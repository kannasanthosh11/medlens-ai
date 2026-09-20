import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { defaultPipelineStages, ProcessingStage } from '../services/mockOcrEngine';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ScanLine, 
  ArrowRight, 
  Cpu, 
  Activity, 
  FileText,
  Clock
} from 'lucide-react';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeUploadDraft, showToast } = useHealthRecord();
  const [stages, setStages] = useState<ProcessingStage[]>(defaultPipelineStages);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(10);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < defaultPipelineStages.length) {
        setStages((prev) =>
          prev.map((s, idx) => {
            if (idx < currentIdx) return { ...s, status: 'completed' };
            if (idx === currentIdx) return { ...s, status: 'processing' };
            return { ...s, status: 'pending' };
          })
        );
        setCurrentStageIdx(currentIdx);
        setProgressPercent(Math.round(((currentIdx + 1) / defaultPipelineStages.length) * 100));
        currentIdx++;
      } else {
        setStages((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
        setIsDone(true);
        setProgressPercent(100);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const handleProceedToVerification = () => {
    showToast('success', 'Extraction Complete', 'Please verify the extracted medical biomarkers and providers.');
    navigate('/ocr-results');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 text-center">
      {/* Top Status */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
          <span>BioBERT Neural Pipeline Active</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isDone ? 'Report Successfully Processed' : 'Extracting Clinical Information...'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Parsing <strong>{activeUploadDraft?.fileName || 'Medical_Report.pdf'}</strong> through multi-stage OCR, clinical NER, and LOINC normalization.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4 text-left">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700">Overall Pipeline Execution</span>
          <span className="font-mono text-teal-600">{progressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stages Checklist */}
        <div className="divide-y divide-slate-100 pt-2">
          {stages.map((stg, idx) => {
            const isCompleted = stg.status === 'completed';
            const isProcessing = stg.status === 'processing';

            return (
              <div
                key={stg.id}
                className={`py-3 flex items-center justify-between gap-3 text-xs transition-colors ${
                  isProcessing ? 'bg-teal-50/50 -mx-3 px-3 rounded-xl' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isProcessing ? (
                      <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${
                        isCompleted
                          ? 'text-slate-900'
                          : isProcessing
                          ? 'text-teal-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {stg.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{stg.description}</p>
                  </div>
                </div>

                <div className="font-mono text-[11px] flex-shrink-0">
                  {isCompleted && <span className="text-emerald-700 font-semibold">Done</span>}
                  {isProcessing && <span className="text-teal-600 animate-pulse font-semibold">Running</span>}
                  {!isCompleted && !isProcessing && <span className="text-slate-400">Queued</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Done CTA */}
      {isDone ? (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={handleProceedToVerification}
            className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-700/25 transition-all flex items-center justify-center gap-2 mx-auto active:scale-[0.98]"
          >
            <span>Review & Verify Extracted Information</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-xs text-slate-400 flex items-center justify-center gap-2 font-mono">
          <ScanLine className="w-4 h-4 text-teal-500 animate-pulse" />
          <span>Evaluating clinical bounding boxes & normal ranges...</span>
        </div>
      )}
    </div>
  );
};
