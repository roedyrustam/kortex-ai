'use client';

import { useState } from 'react';
import { Cpu, ShieldCheck, Database, Zap, GitCommit, CheckCircle2, Play, Activity, Layers, Server, AlertTriangle } from 'lucide-react';

interface ModuleDetail {
  id: string;
  name: string;
  role: string;
  icon: typeof Cpu;
  overhead: string;
  throughput: string;
  status: 'active' | 'breaker' | 'security';
  description: string;
  guarantees: { label: string; value: string }[];
}

const MODULES: ModuleDetail[] = [
  {
    id: 'router',
    name: 'Smart Dynamic Router',
    role: 'Adaptive, Latency & Cost Optimization',
    icon: Zap,
    overhead: '0.14ms',
    throughput: '350k req/s',
    status: 'active',
    description: 'Calculates Laplace-smoothed reliability scores, running moving-average latencies, and dual-token prices to route prompts to optimal providers dynamically.',
    guarantees: [
      { label: 'Routing Algorithms', value: 'adaptive | lowest-latency | lowest-cost | failover' },
      { label: 'Model Fallbacks', value: 'Hierarchical (e.g. gpt-4o -> gpt-4o-mini)' },
      { label: 'Fast Failover', value: 'Instant switch on 401 Unauthorized' },
    ],
  },
  {
    id: 'circuit-breaker',
    name: 'In-Memory Circuit Breaker',
    role: 'Zero-Infra Cascading Failure Protection',
    icon: AlertTriangle,
    overhead: '0.04ms',
    throughput: 'Memory-Bound',
    status: 'breaker',
    description: 'Tracks consecutive provider errors (5xx, 429 rate limits, network timeouts). Trips to OPEN state to prevent blocking the event loop, probing recovery in HALF-OPEN state.',
    guarantees: [
      { label: 'State Machine', value: 'CLOSED -> OPEN -> HALF_OPEN' },
      { label: 'Zero Infrastructure', value: 'No Redis or external daemon required' },
      { label: 'Jitter & Backoff', value: 'Exponential with full randomized jitter' },
    ],
  },
  {
    id: 'pii-vault',
    name: 'Reversible PII Vault',
    role: 'Client-Side Privacy Anonymization',
    icon: ShieldCheck,
    overhead: '0.22ms',
    throughput: 'In-Memory Encrypted',
    status: 'security',
    description: 'Scans prompts for emails, phone numbers, SSNs, and credit cards. Replaces them with encrypted tokens before dispatch, then transparently restores original values in responses.',
    guarantees: [
      { label: 'Zero Cloud Leakage', value: 'Raw PII never reaches third-party LLMs' },
      { label: 'Streaming Detokenize', value: 'Restores real values in live SSE streams' },
      { label: 'Encryption Standard', value: 'Native Web Crypto AES-GCM' },
    ],
  },
  {
    id: 'semantic-cache',
    name: 'Zero-Dep Semantic Cache',
    role: 'In-Process Cosine Vector Similarity',
    icon: Database,
    overhead: '0.31ms',
    throughput: 'Cosine Search',
    status: 'active',
    description: 'High-speed in-process semantic response cache matching prompt embeddings within configurable similarity thresholds (0.0 to 1.0) with zero external vector DBs.',
    guarantees: [
      { label: 'Similarity Metric', value: 'Pure In-Process Cosine Dot Product' },
      { label: 'Cost Reduction', value: '70% - 90% duplicate inference avoided' },
      { label: 'Configurable TTL', value: 'Sliding LRU window + absolute expiry' },
    ],
  },
  {
    id: 'hedged-executor',
    name: 'Speculative Hedged Requests',
    role: 'P99 Tail-Latency Elimination',
    icon: Activity,
    overhead: '0.08ms',
    throughput: 'Parallel Racing',
    status: 'active',
    description: 'Dispatches speculative backup requests after a configured delay (e.g. 350ms) to redundant providers, automatically canceling the slower stream when the first token arrives.',
    guarantees: [
      { label: 'Target Metric', value: 'P99 & P99.9 latency tail reduction' },
      { label: 'Cancellation', value: 'Automatic AbortController cleanup' },
      { label: 'Cost Shield', value: 'Only fires when primary breaches SLA' },
    ],
  },
];

export function ArchitectureShowcase() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('circuit-breaker');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const selectedModule = MODULES.find((m) => m.id === selectedModuleId) || MODULES[1];

  const handleSimulateOutage = () => {
    setIsSimulating(true);
    setSimulationLog('Simulating OpenAI HTTP 429 RateLimit spike...');
    
    setTimeout(() => {
      setSimulationLog('Circuit Breaker tripped OPEN (failureThreshold: 3 reached in 0.4ms)');
    }, 600);

    setTimeout(() => {
      setSimulationLog('Auto-Failover executed: prompt routed to Anthropic Claude 3.7 Sonnet (0 downtime).');
    }, 1300);

    setTimeout(() => {
      setIsSimulating(false);
    }, 2400);
  };

  return (
    <section id="architecture" className="py-24 md:py-32 bg-[#090a0d] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>100% In-Process Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Zero-infrastructure control plane inside your Node.js runtime
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Unlike external proxy servers that add network hops and require Docker/Redis setups, SinapsAI runs directly in your application thread with &lt;10ms overhead.
          </p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Modules List (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b0c10] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-neutral-300">CORE PIPELINE MODULES</span>
              </div>
              <button
                type="button"
                onClick={handleSimulateOutage}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Play className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Simulating...' : 'Simulate Provider Outage'}</span>
              </button>
            </div>

            {/* Circuit Node Grid */}
            <div className="space-y-4">
              {MODULES.map((module) => {
                const Icon = module.icon;
                const isSelected = selectedModuleId === module.id;
                return (
                  <div
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-neutral-800/90 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40'
                        : 'bg-neutral-900/40 border-white/[0.08] hover:bg-neutral-900/80 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                            : 'bg-neutral-950 border-white/10 text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {module.name}
                          </h4>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                              module.status === 'security'
                                ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                                : module.status === 'breaker'
                                ? 'bg-rose-950/70 text-rose-300 border-rose-800/40'
                                : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                            }`}
                          >
                            {module.overhead}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{module.role}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end text-right font-mono text-xs">
                      <span className="text-neutral-300">{module.throughput}</span>
                      <span className="text-[11px] text-emerald-400">Zero Network Hop</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulation feedback bar */}
            {simulationLog && (
              <div className="mt-5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-xs font-mono text-emerald-300 animate-in fade-in duration-200">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{simulationLog}</span>
              </div>
            )}
          </div>

          {/* Module Inspector Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900/70 to-neutral-900/30 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                MODULE SPECIFICATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                IN-PROCESS
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/15 flex items-center justify-center text-emerald-400 shadow-md">
                {<selectedModule.icon className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">{selectedModule.name}</h3>
                <p className="text-xs text-neutral-400 font-mono">{selectedModule.role}</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedModule.description}
            </p>

            {/* Architectural Metric Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Overhead Latency</span>
                <span className="text-base font-semibold font-mono text-emerald-400">{selectedModule.overhead}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Runtime Memory</span>
                <span className="text-base font-semibold font-mono text-white">Direct Heap</span>
              </div>
            </div>

            {/* Module Guarantees */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                Architectural Guarantees
              </span>
              {selectedModule.guarantees.map((g, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs py-2 px-3 rounded bg-white/[0.02] border border-white/5 font-mono">
                  <span className="text-neutral-500 text-[11px]">{g.label}</span>
                  <span className="text-neutral-200 font-semibold">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
