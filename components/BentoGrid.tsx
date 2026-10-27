'use client';

import { useState } from 'react';
import { Cpu, RotateCcw, ShieldCheck, Zap, ArrowRight, CheckCircle2, Lock, Sliders, AlertTriangle, Eye, EyeOff, Brain, Sparkles } from 'lucide-react';

export function BentoGrid() {
  const [breakerState, setBreakerState] = useState<'CLOSED' | 'OPEN' | 'HALF_OPEN'>('CLOSED');
  const [piiMasked, setPiiMasked] = useState(true);

  return (
    <section id="circuit-breaker" className="py-24 md:py-32 relative bg-[#08090a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Autonomous Resilience Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Zero-infra resilience against LLM outages & latency spikes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminate runtime crashes from provider downtime, rate limits (HTTP 429), and cascading network timeouts with pure in-process state machines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: In-Memory Circuit Breaker (Span 2) */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-white/[0.18] transition-all">
            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                In-Memory Circuit Breaker State Machine
              </h3>
              <p className="text-sm text-neutral-400 max-w-md">
                Tracks consecutive provider errors (5xx, 429 rate limits, timeouts) and trips open instantly to protect your thread pool without Redis or external servers.
              </p>
            </div>

            {/* Interactive State Machine Demo */}
            <div className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-4 sm:p-5 relative overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 pb-3 border-b border-white/5 mb-4">
                <span>CIRCUIT BREAKER STATE MACHINE</span>
                <span className={`font-semibold ${
                  breakerState === 'CLOSED' ? 'text-amber-400' : breakerState === 'OPEN' ? 'text-rose-400' : 'text-orange-400'
                }`}>
                  STATE: {breakerState}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setBreakerState('CLOSED')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    breakerState === 'CLOSED'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold block">CLOSED</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Normal Traffic</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBreakerState('OPEN')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    breakerState === 'OPEN'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold block">OPEN</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Fast Failover</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBreakerState('HALF_OPEN')}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    breakerState === 'HALF_OPEN'
                      ? 'bg-orange-950/80 border-orange-500 text-orange-300 ring-1 ring-orange-500/50'
                      : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-semibold block">HALF-OPEN</span>
                  <span className="text-[10px] text-neutral-500 mt-1 block">Probing Recovery</span>
                </button>
              </div>

              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Config: failureThreshold: 3 | resetTimeoutMs: 30000 | recoverySuccessThreshold: 2</span>
                <span className="text-amber-400">Zero Added Overhead (&lt; 0.04ms)</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Reversible PII Vault (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Reversible PII Vault
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Anonymizes sensitive customer data before sending to providers, restoring original values in responses transparently.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 pb-2 mb-2 border-b border-white/5">
                <span>ENCRYPTED VAULT</span>
                <button
                  type="button"
                  onClick={() => setPiiMasked(!piiMasked)}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  {piiMasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{piiMasked ? 'Masked' : 'Revealed'}</span>
                </button>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                {piiMasked ? (
                  <>Contact user at <span className="px-1 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">&lt;PII_EM_92A&gt;</span> with card <span className="px-1 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">&lt;PII_CC_10B&gt;</span></>
                ) : (
                  <>Contact user at <span className="text-amber-400">john.doe@company.com</span> with card <span className="text-amber-400">4532-XXXX-XXXX-8921</span></>
                )}
              </p>
            </div>
          </div>

          {/* Bento Card 3: Universal Frontier Reasoning Engine (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Universal Frontier Reasoning
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Standardized deep reasoning parameters across Claude 3.7 Sonnet, OpenAI o1/o3/o4, and Gemini Flash Thinking.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10 font-mono text-[11px] space-y-1.5 text-neutral-300">
              <div className="flex justify-between text-neutral-500 pb-1 border-b border-white/5">
                <span>REASONING OUTPUT</span>
                <span className="text-sky-400">1,280 tokens</span>
              </div>
              <p className="text-neutral-400 italic">
                &quot;Evaluating database shard split... analyzing foreign key constraints across partitions...&quot;
              </p>
            </div>
          </div>

          {/* Bento Card 4: Zero-Dependency Semantic Caching (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Semantic Caching
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                In-process cosine vector similarity cache. Detects semantically identical prompts and returns cached responses in 0.3ms.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10 font-mono text-[11px]">
              <div className="flex items-center justify-between text-neutral-500 pb-2 mb-2 border-b border-white/5">
                <span>SIMILARITY THRESHOLD</span>
                <span className="text-amber-400 font-semibold">0.85 Cosine</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-amber-400 h-full w-[94%]" />
              </div>
              <span className="text-neutral-400 text-[10px]">Score 0.94 → Cache Hit (0.3ms latency)</span>
            </div>
          </div>

          {/* Bento Card 5: Speculative Hedged Requests (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Speculative Hedging
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Crushes P99 tail latency by launching backup requests after a threshold delay, automatically aborting the slower provider stream.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10 font-mono text-[11px] flex items-center justify-between">
              <div>
                <span className="text-neutral-500 block text-[10px]">P99 TAIL LATENCY</span>
                <span className="text-amber-400 font-semibold text-sm">Reduced by 72%</span>
              </div>
              <span className="text-[10px] px-2 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                hedgeDelayMs: 350
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
