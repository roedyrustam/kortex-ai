'use client';

import { useState } from 'react';
import { Cpu, RotateCcw, ShieldCheck, Zap, ArrowRight, CheckCircle2, Lock, Sliders } from 'lucide-react';

export function BentoGrid() {
  const [replayStep, setReplayStep] = useState(3);

  const REPLAY_STEPS = [
    { step: 1, title: 'Input Parse', detail: 'User intent parsed & sanitized' },
    { step: 2, title: 'Context Fetch', detail: 'Hybrid Vector & Graph RAG executed' },
    { step: 3, title: 'Consensus Vote', detail: '3 Subagents reached 100% agreement' },
    { step: 4, title: 'State Replay', detail: 'Deterministic snapshot committed to WAL' },
    { step: 5, title: 'Final Dispatch', detail: 'Payload streamed to edge client' },
  ];

  return (
    <section id="bento" className="py-24 md:py-32 relative bg-[#08090a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Architecture Specification</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Engineered for deterministic precision at scale
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminate non-deterministic agent failure modes with cryptographic state logs, hardware-isolated memory enclaves, and sub-millisecond columnar telemetry.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Multi-Agent Consensus Bus (Span 2) */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-white/[0.18] transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
              <Cpu className="w-48 h-48 text-emerald-500/20" />
            </div>

            <div className="relative z-10 mb-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Distributed Multi-Agent Consensus Bus
              </h3>
              <p className="text-sm text-neutral-400 max-w-md">
                Decoupled actor nodes coordinate via gossip protocols with guaranteed ordering, preventing deadlocks and speculative hallucination branches.
              </p>
            </div>

            {/* Interactive Node Visualizer */}
            <div className="w-full bg-[#0b0c10] border border-white/10 rounded-xl p-4 sm:p-5 relative overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 pb-3 border-b border-white/5 mb-4">
                <span>SWARM TOPOLOGY // ACTIVE RING</span>
                <span className="text-emerald-400">STATUS: CONVERGED</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
                  <span className="text-emerald-400 text-sm font-semibold">Node Alpha</span>
                  <span className="text-[10px] text-neutral-500 mt-1">Intent Planner</span>
                  <span className="mt-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Leader • 0.3ms
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
                  <span className="text-sky-400 text-sm font-semibold">Node Beta</span>
                  <span className="text-[10px] text-neutral-500 mt-1">Vector Retriever</span>
                  <span className="mt-2 text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    Sync • 0.5ms
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col items-center text-center">
                  <span className="text-purple-400 text-sm font-semibold">Node Gamma</span>
                  <span className="text-[10px] text-neutral-500 mt-1">Policy Auditor</span>
                  <span className="mt-2 text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    Quorum • 0.2ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Deterministic Replay (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Deterministic Time-Travel Replay
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Scrub backward and forward through any agent run to inspect state mutations, LLM logits, and network calls frame-by-frame.
              </p>
            </div>

            {/* Interactive Scrubber Demo */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-xl p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Snapshot Step</span>
                </span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {replayStep} / 5
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                value={replayStep}
                onChange={(e) => setReplayStep(Number(e.target.value))}
                className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer mb-3"
              />

              <div className="p-2.5 rounded bg-neutral-900 border border-white/5">
                <span className="text-white font-medium block">
                  {REPLAY_STEPS[replayStep - 1].title}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  {REPLAY_STEPS[replayStep - 1].detail}
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Zero-Trust Enclaves (Span 1) */}
          <div className="rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative hover:border-white/[0.18] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Cryptographic Hardware Enclaves
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Zero-leak memory isolation via Nitro Enclaves. Your proprietary prompt weights and user data are never visible to host OS or unauthorized agents.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0c10] border border-white/10">
                <span className="text-neutral-400">SOC2 Type II Attestation</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-[#0b0c10] border border-white/10">
                <span className="text-neutral-400">AES-256-GCM Ephemeral Keys</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Columnar Real-time Tracing Engine (Span 2) */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-b from-neutral-900/60 to-neutral-900/20 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group hover:border-white/[0.18] transition-all">
            <div className="mb-6">
              <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Wide-Event Columnar Observability
              </h3>
              <p className="text-sm text-neutral-400 max-w-lg">
                High-cardinality OpenTelemetry traces streamed directly into DuckDB/ClickHouse with sub-millisecond query execution on billions of token events.
              </p>
            </div>

            {/* Sparkline & Latency Stream */}
            <div className="bg-[#0b0c10] border border-white/10 rounded-xl p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400 mb-3">
                <span>TRACE EXECUTION TIMELINE (P99 SPAN METRICS)</span>
                <span className="text-sky-400 tabular-nums">Average: 0.72ms</span>
              </div>

              {/* Graphical latency bars */}
              <div className="grid grid-cols-12 gap-1.5 h-16 items-end pb-1">
                {[35, 45, 28, 52, 40, 30, 22, 48, 60, 32, 26, 38].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-full bg-sky-500/40 hover:bg-sky-400 rounded-t transition-all duration-300 group relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] bg-neutral-900 text-sky-300 px-1 py-0.5 rounded border border-sky-800 pointer-events-none">
                      {h * 0.02}ms
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-neutral-500">
                <span>Span #1091 — Agent Dispatched</span>
                <span>Span #1099 — Response Flushed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
