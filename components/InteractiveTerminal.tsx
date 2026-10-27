'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Pause, RefreshCw, Copy, Check, ShieldCheck, Activity, Cpu } from 'lucide-react';

interface LogLine {
  id: string;
  time: string;
  module: string;
  action: string;
  latency: string;
  status: 'ok' | 'failover' | 'breaker' | 'security';
}

const INITIAL_LOGS: LogLine[] = [
  { id: '1', time: '18:20:01.104', module: 'sinaps.router', action: 'INIT_REQUEST: strategy="adaptive" (candidates: OpenAI, Claude, Gemini, Groq)', latency: '0.12ms', status: 'ok' },
  { id: '2', time: '18:20:01.105', module: 'pii.vault', action: 'REVERSIBLE_TOKENIZE: detected user email -> replaced with <PII_TOKEN_892F>', latency: '0.18ms', status: 'security' },
  { id: '3', time: '18:20:01.106', module: 'circuit.breaker', action: 'STATE_CHECK: OpenAI circuit CLOSED (failure count: 0/3)', latency: '0.04ms', status: 'ok' },
  { id: '4', time: '18:20:01.107', module: 'semantic.cache', action: 'COSINE_EVAL: prompt similarity 0.94 >= 0.85 threshold -> IN-PROCESS CACHE HIT', latency: '0.31ms', status: 'ok' },
  { id: '5', time: '18:20:01.108', module: 'pii.restore', action: 'VAULT_DETOKENIZE: streaming tokens reconstructed with original PII in-memory', latency: '0.11ms', status: 'security' },
];

const STREAMING_TEMPLATES = [
  { module: 'circuit.breaker', action: 'TRIP_WARNING: OpenAI returned HTTP 429 (Rate Limit) -> tripped to OPEN state', latency: '0.45ms', status: 'breaker' as const },
  { module: 'sinaps.router', action: 'AUTO_FAILOVER: cascading from OpenAI -> Anthropic Claude 3.7 Sonnet', latency: '0.82ms', status: 'failover' as const },
  { module: 'reasoning.engine', action: 'THINKING_BUDGET: Claude 3.7 emitted 1,280 reasoning tokens in message.reasoning_content', latency: '1.24ms', status: 'ok' as const },
  { module: 'finops.cache', action: 'PROMPT_CACHE_AUDIT: cachedPromptTokens=2,480 -> saved 82% token cost', latency: '0.08ms', status: 'ok' as const },
  { module: 'hedged.executor', action: 'SPECULATIVE_HEDGE: primary provider delayed > 350ms -> secondary Groq LPU won race', latency: '0.38ms', status: 'failover' as const },
  { module: 'pii.vault', action: 'ANONYMIZE_ENCLAVE: SSN & credit card numbers zeroed before LLM dispatch', latency: '0.22ms', status: 'security' as const },
  { module: 'streaming.ttft', action: 'SSE_STREAM_TELEMETRY: Time-To-First-Token (TTFT) recorded at 142ms', latency: '0.15ms', status: 'ok' as const },
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
          module: nextTemplate.module,
          action: nextTemplate.action,
          latency: `${(Math.random() * 0.5 + 0.1).toFixed(2)}ms`,
          status: nextTemplate.status,
        };

        return [...prev.slice(-9), newLog];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyLogs = () => {
    const text = logs.map((l) => `[${l.time}] [${l.module}] ${l.action} (${l.latency})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setLogs(INITIAL_LOGS);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/10 bg-[#0d0e12]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/20 text-left">
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
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-neutral-300">sinapsai-runtime</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">in-process-control-plane</span>
          </div>
        </div>

        {/* Telemetry Chips in Header */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span className="inline-flex items-center gap-1 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              0 External Proxies
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300">&lt; 8.4ms Overhead</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title={isPlaying ? 'Pause telemetry stream' : 'Resume telemetry stream'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
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
              {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollContainerRef}
        className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 min-h-[220px] max-h-[300px] overflow-y-auto selection:bg-amber-900/60 selection:text-amber-200"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 group hover:bg-white/[0.02] -mx-2 px-2 py-0.5 rounded transition-colors">
            <span className="text-neutral-500 select-none shrink-0 text-[11px] pt-[1px] tabular-nums">{log.time}</span>
            <span
              className={`shrink-0 px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold border ${
                log.status === 'breaker'
                  ? 'bg-rose-950/70 text-rose-300 border-rose-800/40'
                  : log.status === 'failover'
                  ? 'bg-orange-950/70 text-orange-300 border-orange-800/40'
                  : log.status === 'security'
                  ? 'bg-purple-950/70 text-purple-300 border-purple-800/40'
                  : 'bg-amber-950/70 text-amber-300 border-amber-800/40'
              }`}
            >
              {log.module}
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
          <Activity className="w-3 h-3 text-amber-400" />
          <span>In-Process Circuit Breaker Engine: Healthy</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Active Providers: 9</span>
          <span className="text-neutral-700">•</span>
          <span>Zero-Copy Stream Buffer</span>
        </div>
      </div>
    </div>
  );
}
