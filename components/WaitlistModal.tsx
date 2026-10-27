'use client';

import { useState, useTransition } from 'react';
import { X, CheckCircle2, Cpu, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { submitWaitlistLead } from '@/app/actions';
import type { SdkLanguage } from '@/lib/types';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export function WaitlistModal({ isOpen, onClose, defaultPlan }: WaitlistModalProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitWaitlistLead(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0d0e12] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Cluster Key Provisioned</h3>
            <p className="text-xs text-neutral-400 max-w-xs mb-6 leading-relaxed">
              We have sent your cryptographic verification token and cluster setup instructions to your inbox.
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
            >
              Return to Architecture
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-neutral-900 border border-white/15 flex items-center justify-center text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
                Early Access Cohort
              </span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-1.5">
              Access SinapsAI Edge & Architecture Kit
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Receive distributed Cloudflare KV/Redis recipes, enterprise compliance guides, and early access to new frontier provider adapters.
            </p>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Engineering Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="alex@acme.engineering"
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900/80 border border-white/10 text-white placeholder:text-neutral-600 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Full Name / Handle
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Alex Mercer"
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900/80 border border-white/10 text-white placeholder:text-neutral-600 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Preferred SDK Language
                </label>
                <select
                  name="sdkPreference"
                  defaultValue="typescript"
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-white/10 text-neutral-300 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="typescript">TypeScript / Node.js</option>
                  <option value="python">Python 3.12+</option>
                  <option value="go">Go 1.24+</option>
                  <option value="rust">Rust Axum / Tokio</option>
                  <option value="curl">Raw HTTP / cURL</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Attesting Key Generation...</span>
                  </>
                ) : (
                  <>
                    <span>Request Cluster API Key</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
