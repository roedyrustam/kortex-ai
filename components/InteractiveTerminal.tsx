'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Pause, RefreshCw, Copy, Check, ShieldCheck, Activity } from 'lucide-react';

interface LogLine {
  id: string;
  time: string;
  node: string;
  action: string;
  latency: string;
  status: 'ok' | 'sync' | 'enclave' | 'warn';
}

const INITIAL_LOGS: LogLine[] = [
  { id: '1', time: '12:20:01.104', node: 'agent-01', action: 'DISPATCH_ORCHESTRATOR: parse_intent(query_id: "qx-908")', latency: '0.41ms', status: 'ok' },
  { id: '2', time: '12:20:01.105', node: 'enclave-sec', action: 'ATTEST_TEE: cryptographic memory isolation locked', latency: '0.19ms', status: 'enclave' },
  { id: '3', time: '12:20:01.106', node: 'agent-02', action: 'SYNTHESIS_PIPELINE: vector_fetch(hnsw_top_k: 8)', latency: '0.78ms', status: 'sync' },
  { id: '4', time: '12:20:01.107', node: 'validator-bus', action: 'CONSENSUS_REACHED: 3/3 nodes signed state transition', latency: '0.32ms', status: 'ok' },
  { id: '5', time: '12:20:01.108', node: 'journal-engine', action: 'COMMIT_WAL: append-only snapshot logged -> block #489201', latency: '0.24ms', status: 'ok' },
];

const STREAMING_TEMPLATES = [
  { node: 'agent-03', action: 'SPECULATIVE_EXEC: branch speculative sub-task (depth: 2)', latency: '0.62ms', status: 'sync' as const },
  { node: 'enclave-sec', action: 'GUARDRAIL_EVAL: prompt injection check -> 0.00% anomaly', latency: '0.28ms', status: 'enclave' as const },
  { node: 'agent-01', action: 'TRACE_PROPAGATE: OpenTelemetry context injected -> span #910a', latency: '0.15ms', status: 'ok' as const },
  { node: 'validator-bus', action: 'QUORUM_VERIFIED: multi-agent state reconciled in memory', latency: '0.39ms', status: 'ok' as const },
  { node: 'edge-cache', action: 'KV_PREFIX_PIN: warm cache hit 94.2% -> accelerated TTFT', latency: '0.08ms', status: 'ok' as const },
];

export function InteractiveTerminal() {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextTemplate = STREAMING_TEMPLATES[Math.floor(Math.random() * STREAMING_TEMPLATES.length)];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        
        const newLog: LogLine = {
          id: Math.random().toString(36).substring(2, 9),
          time: timeStr,
          node: nextTemplate.node,
          action: nextTemplate.action,
          latency: `${(Math.random() * 0.6 + 0.2).toFixed(2)}ms`,
          status: nextTemplate.status,
        };

        return [...prev.slice(-10), newLog];
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyLogs = () => {
    const text = logs.map((l) => `[${l.time}] [${l.node}] ${l.action} (${l.latency})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLogs(INITIAL_LOGS);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/10 bg-[#0d0e12]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/20">
      {/* Top Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/60 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70 border border-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70 border border-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 border border-emerald-500" />
          </div>
          <div className="h-3 w-[1px] bg-white/10 mx-1.5" />
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-neutral-300">kortex-runtime</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">cluster-us-east-1</span>
          </div>
        </div>

        {/* Telemetry Chips in Header */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300 font-mono tabular-nums">p99: 0.74ms</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300">3 Nodes</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause telemetry stream' : 'Resume telemetry stream'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Reset terminal buffer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCopyLogs}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Copy trace log buffer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollContainerRef}
        className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 min-h-[220px] max-h-[300px] overflow-y-auto selection:bg-emerald-900/60 selection:text-emerald-200"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 group hover:bg-white/[0.02] -mx-2 px-2 py-0.5 rounded transition-colors">
            <span className="text-neutral-500 select-none shrink-0 text-[11px] pt-[1px] tabular-nums">{log.time}</span>
            <span
              className={`shrink-0 px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold border ${
                log.status === 'enclave'
                  ? 'bg-purple-950/60 text-purple-300 border-purple-800/40'
                  : log.status === 'sync'
                  ? 'bg-sky-950/60 text-sky-300 border-sky-800/40'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
              }`}
            >
              {log.node}
            </span>
            <span className="text-neutral-300 break-all flex-1 font-mono">
              {log.action}
            </span>
            <span className="text-neutral-500 text-[11px] shrink-0 font-mono tabular-nums group-hover:text-neutral-300">
              {log.latency}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Bar Status Line */}
      <div className="px-4 py-2 bg-neutral-950/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>Zero-Drop Buffer Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Snapshot WAL: 0x8FA2</span>
          <span className="text-neutral-700">•</span>
          <span>Replay Engine: Synchronized</span>
        </div>
      </div>
    </div>
  );
}
