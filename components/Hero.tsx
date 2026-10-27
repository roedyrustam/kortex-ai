'use client';

import { useState } from 'react';
import { ChevronRight, Copy, Check, Terminal, Shield, Zap, Sparkles } from 'lucide-react';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export function Hero({ onOpenWaitlist }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npm i @kortex/runtime-sdk';

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern bg-radial-vignette">
      {/* Subtle radial ambient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-white/10 text-xs text-neutral-300 mb-8 shadow-sm backdrop-blur-md hover:border-emerald-500/40 transition-colors">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400 font-medium">v2.4 LTS</span>
            <span className="text-neutral-500">|</span>
            <span>Distributed Multi-Agent Consensus Fabric</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
            Autonomous Agent Ops for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              High-Scale Engineering
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed mb-10">
            Deploy, observe, and deterministically replay multi-agent workflows with sub-millisecond distributed tracing, hardware-isolated zero-trust enclaves, and zero cold starts.
          </p>

          {/* CTA & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-[0_0_25px_-4px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_-2px_rgba(16,185,129,0.7)] active:scale-[0.98]"
            >
              <span>Deploy Free Cluster</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-neutral-900/90 hover:bg-neutral-800 border border-white/15 hover:border-white/30 transition-all duration-200 active:scale-[0.98]"
            >
              <span>Explore SDKs</span>
            </a>

            {/* Quick NPM Copy Pill */}
            <button
              type="button"
              onClick={handleCopyCmd}
              className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-neutral-950/80 border border-white/10 hover:border-white/20 font-mono text-xs text-neutral-300 transition-colors group cursor-pointer"
              title="Copy install command"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <span>{installCmd}</span>
              </div>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
              )}
            </button>
          </div>

          {/* Interactive Live Terminal Component */}
          <div className="w-full mt-6">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
