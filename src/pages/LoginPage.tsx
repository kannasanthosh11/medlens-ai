import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Lock, Mail, AlertTriangle, Play, CheckCircle } from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useHealthRecord } from '../context/HealthRecordContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useHealthRecord();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      showToast('error', 'Login failed', error.message);
      return;
    }

    showToast('success', 'Authenticated', 'Welcome back!');
    navigate('/dashboard');
  };
  const handleDemoAccess = () => {
    showToast('info', 'Demo Patient Loaded', 'Session initiated for demo patient Alex Morgan');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <DisclaimerBanner variant="compact" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">MedLens <span className="text-teal-600">AI</span></span>
            </Link>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Access Health Portal</h2>
            <p className="text-xs text-slate-500">
              Sign in to manage your medical reports and intelligent timeline
            </p>
          </div>

          {/* Quick Demo Access Callout for Judges */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Hackathon Judge Quick-Access
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-teal-100 text-teal-800 font-semibold">
                HLT-03
              </span>
            </div>
            <p className="text-xs text-teal-800 leading-relaxed">
              Explore with pre-populated medical records for demo patient <strong>Alex Morgan</strong> (12 reports, labs, prescriptions, timeline).
            </p>
            <button
              onClick={handleDemoAccess}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-700/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Try Demo Patient (Alex Morgan)
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider absolute">
              or sign in
            </span>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); showToast('info', 'Demo Notice', 'In demo mode, password is pre-filled.'); }} className="text-[11px] text-teal-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Privacy Warning Footer */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              * Prototype only — do not upload real patient information. All records for demonstration are synthetic.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-slate-400 border-t border-slate-200/60">
        TENSORA 2026 • Problem HLT-03 Medical Report Management • MedLens AI
      </div>
    </div>
  );
};
