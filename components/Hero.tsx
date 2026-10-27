'use client';

import { useState } from 'react';
import { ChevronRight, Copy, Check, Terminal, Shield, Zap, Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export function Hero({ onOpenWaitlist }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = 'npm i sinapsai';

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-vignette">
      {/* Subtle radial ambient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Release Badge */}
          <a
            href="https://github.com/roedyrustam/sinapsai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-white/10 text-xs text-neutral-300 mb-8 shadow-sm backdrop-blur-md hover:border-amber-500/40 transition-colors group cursor-pointer"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-amber-400 font-medium">v1.2.0 Release</span>
            <span className="text-neutral-500">|</span>
            <span>404 Tests Passed • Zero Runtime Dependencies</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          </a>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white max-w-5xl leading-[1.08] mb-6">
            Universal AI Control Plane & Smart Router for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              Node.js & Edge
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-3xl font-normal leading-relaxed mb-10">
            A 100% in-process universal AI gateway. Route prompts across OpenAI, Claude, Gemini, DeepSeek, and Groq with in-memory circuit breakers, semantic caching, and reversible PII vaults—without Docker, Redis, or cloud proxy latency.
          </p>

          {/* CTA & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            {/* Quick NPM Copy Pill */}
            <button
              type="button"
              onClick={handleCopyCmd}
              className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-5 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800/90 border border-amber-500/30 hover:border-amber-500/50 font-mono text-xs sm:text-sm text-neutral-200 transition-all shadow-[0_0_20px_-5px_rgba(245,158,11,0.25)] group cursor-pointer"
              title="Copy install command"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">$</span>
                <span className="font-semibold">{installCmd}</span>
              </div>
              {copied ? (
                <Check className="w-4 h-4 text-amber-400" />
              ) : (
                <Copy className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
              )}
            </button>

            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all duration-200 shadow-[0_0_25px_-4px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_-2px_rgba(245,158,11,0.7)] active:scale-[0.98]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View on GitHub</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-neutral-900/90 hover:bg-neutral-800 border border-white/15 hover:border-white/30 transition-all duration-200 active:scale-[0.98]"
            >
              <span>Explore Code Examples</span>
            </a>
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
