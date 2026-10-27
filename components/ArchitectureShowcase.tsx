'use client';

import { useState } from 'react';
import { Cpu, ShieldCheck, Database, Zap, GitCommit, CheckCircle2, Play, Activity, Layers, Server } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  role: string;
  icon: typeof Cpu;
  latency: string;
  throughput: string;
  security: string;
  status: 'active' | 'enclave' | 'sync';
  description: string;
  metrics: { label: string; value: string }[];
}

const NODES: NodeDetail[] = [
  {
    id: 'gateway',
    name: 'Edge Ingress Gateway',
    role: 'Global Routing & TLS Termination',
    icon: Zap,
    latency: '0.12ms',
    throughput: '120k req/s',
    security: 'mTLS 1.3 / Kernel Bypass',
    status: 'active',
    description: 'Ultra-low latency ingress operating directly at Cloudflare/AWS edge POPS with zero-copy packet forwarding.',
    metrics: [
      { label: 'Cold Start', value: '0.00ms' },
      { label: 'Cipher Suite', value: 'ChaCha20-Poly1305' },
      { label: 'DDoS Scrubbing', value: 'Automated Layer 7' },
    ],
  },
  {
    id: 'orchestrator',
    name: 'Swarm Orchestrator',
    role: 'Actor Model Task Dispatch',
    icon: Cpu,
    latency: '0.34ms',
    throughput: '45k tasks/s',
    security: 'Deterministic Consensus',
    status: 'active',
    description: 'Decoupled multi-agent state machines communicating through typed gossip channels without distributed deadlocks.',
    metrics: [
      { label: 'Consensus Quorum', value: '3/3 Nodes' },
      { label: 'Speculative Depth', value: '3-tier sub-agents' },
      { label: 'Actor Model', value: 'Supervised DAG' },
    ],
  },
  {
    id: 'memory',
    name: 'Hybrid Vector & Graph Engine',
    role: 'Episodic Memory & Relational Retrieval',
    icon: Database,
    latency: '0.68ms',
    throughput: '85k ops/s',
    security: 'HNSW Partitioned Shards',
    status: 'sync',
    description: 'Sub-millisecond semantic similarity search combined with graph entity resolution for long-term agent memory.',
    metrics: [
      { label: 'Vector Index', value: 'pgvector HNSW (M=16)' },
      { label: 'Recall @ 10', value: '99.4%' },
      { label: 'Graph Traversal', value: 'Multi-hop BFS' },
    ],
  },
  {
    id: 'enclave',
    name: 'Nitro Hardware Enclave',
    role: 'Zero-Trust Memory Isolation',
    icon: ShieldCheck,
    latency: '0.19ms',
    throughput: 'Hardware Bound',
    security: 'AWS Nitro / AMD SEV-SNP',
    status: 'enclave',
    description: 'Cryptographically sealed physical CPU enclaves ensuring prompt weights and user secrets can never be exfiltrated.',
    metrics: [
      { label: 'Attestation', value: 'Hardware PCR Sign' },
      { label: 'Side-Channel Protection', value: 'L1 Terminal Fault Immune' },
      { label: 'Memory Encryption', value: 'AES-256 Hardware' },
    ],
  },
  {
    id: 'wal',
    name: 'Immutable State Journal',
    role: 'Write-Ahead Log & Time-Travel',
    icon: GitCommit,
    latency: '0.28ms',
    throughput: '300k writes/s',
    security: 'Cryptographic Hash Chain',
    status: 'active',
    description: 'Append-only ledger guaranteeing 100% deterministic replay and instantaneous rollback to any previous execution tick.',
    metrics: [
      { label: 'WAL Format', value: 'Binary FlatBuffers' },
      { label: 'Replay Fidelity', value: 'Frame-deterministic' },
      { label: 'Retention Window', value: '30 Days Configurable' },
    ],
  },
];

export function ArchitectureShowcase() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('orchestrator');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[1];

  const handleSimulateBurst = () => {
    setIsSimulating(true);
    setSimulationLog('Injecting 1,000 synthetic multi-agent intent requests across edge cluster...');
    
    setTimeout(() => {
      setSimulationLog('Quorum verified in 0.42ms: 100% state hash consensus signed by 3 nodes.');
    }, 900);

    setTimeout(() => {
      setIsSimulating(false);
    }, 2200);
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
            <span>Distributed Core Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Sub-millisecond fabric engineered for autonomous swarms
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Explore the multi-layer pipeline that separates Kortex AI from legacy orchestration scripts. Click any node to inspect real-time metrics and cryptographic isolation guarantees.
          </p>
        </div>

        {/* Interactive Architecture Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Node Mesh Diagram (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b0c10] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-neutral-300">INTERACTIVE FABRIC TOPOLOGY</span>
              </div>
              <button
                type="button"
                onClick={handleSimulateBurst}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Simulating...' : 'Simulate Swarm Burst'}</span>
              </button>
            </div>

            {/* Circuit Node Grid */}
            <div className="space-y-4">
              {NODES.map((node, idx) => {
                const Icon = node.icon;
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
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
                            {node.name}
                          </h4>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                              node.status === 'enclave'
                                ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                                : node.status === 'sync'
                                ? 'bg-sky-950/70 text-sky-300 border-sky-800/40'
                                : 'bg-emerald-950/70 text-emerald-300 border-emerald-800/40'
                            }`}
                          >
                            {node.latency}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{node.role}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-end text-right font-mono text-xs">
                      <span className="text-neutral-300">{node.throughput}</span>
                      <span className="text-[11px] text-neutral-500">{node.security}</span>
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

          {/* Node Inspector Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900/70 to-neutral-900/30 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                NODE TELEMETRY INSPECTOR
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE SYNC
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/15 flex items-center justify-center text-emerald-400 shadow-md">
                {<selectedNode.icon className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">{selectedNode.name}</h3>
                <p className="text-xs text-neutral-400 font-mono">{selectedNode.role}</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            {/* Architectural Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Latency (P99)</span>
                <span className="text-base font-semibold font-mono text-emerald-400">{selectedNode.latency}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Throughput</span>
                <span className="text-base font-semibold font-mono text-white">{selectedNode.throughput}</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">Security Gate</span>
                <span className="text-xs font-semibold font-mono text-purple-300 truncate block">{selectedNode.security}</span>
              </div>
            </div>

            {/* Deep Specs */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                Hardware & Enclave Guarantees
              </span>
              {selectedNode.metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-white/[0.02] border border-white/5 font-mono">
                  <span className="text-neutral-400">{m.label}</span>
                  <span className="text-neutral-200 font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
