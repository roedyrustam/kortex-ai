'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Activity,
  Server,
  HelpCircle,
} from 'lucide-react';

interface CommandPreset {
  cmd: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRESET_COMMANDS: CommandPreset[] = [
  {
    cmd: 'npx sinapsai doctor',
    label: 'doctor',
    desc: 'Verify provider health, API keys & measure Time-To-First-Token',
    icon: Activity,
  },
  {
    cmd: 'npx sinapsai benchmark',
    label: 'benchmark',
    desc: 'Benchmark in-process zero-dependency router vs cloud proxy lag',
    icon: Zap,
  },
  {
    cmd: 'npx sinapsai pii-test',
    label: 'pii-test',
    desc: 'Simulate zero-leak regex masking and tokenization reversal',
    icon: ShieldCheck,
  },
  {
    cmd: 'npx sinapsai init',
    label: 'init',
    desc: 'Generate zero-dependency sinaps.config.ts for your runtime',
    icon: Server,
  },
];

interface LogEntry {
  type: 'input' | 'output' | 'info' | 'success' | 'warn' | 'error';
  text: string;
}

export function CliSandbox() {
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: 'info',
      text: 'SinapsAI CLI Sandbox v1.2.0 (Zero-Dependency Node.js & Edge Control Plane)',
    },
    {
      type: 'info',
      text: 'Type a command below or click any preset to simulate in-process execution.',
    },
    {
      type: 'info',
      text: 'Try: "npx sinapsai doctor", "npx sinapsai benchmark", or "help"',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = async (commandStr: string) => {
    const trimmed = commandStr.trim();
    if (!trimmed || isRunning) return;

    setIsRunning(true);
    setInputVal('');

    // Append user input
    setLogs((prev) => [...prev, { type: 'input', text: `$ ${trimmed}` }]);

    const cmdLower = trimmed.toLowerCase();

    if (cmdLower === 'clear' || cmdLower === 'cls') {
      setLogs([]);
      setIsRunning(false);
      return;
    }

    if (cmdLower === 'help') {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { type: 'info', text: 'Available SinapsAI CLI Sandbox Commands:' },
          { type: 'output', text: '  npx sinapsai doctor       - Probe 10+ provider endpoints & ping latency' },
          { type: 'output', text: '  npx sinapsai benchmark    - Benchmark in-process latency overhead vs proxy' },
          { type: 'output', text: '  npx sinapsai pii-test     - Run test suite for reversible PII vault' },
          { type: 'output', text: '  npx sinapsai init         - Generate sinaps.config.ts config file' },
          { type: 'output', text: '  clear                     - Clear sandbox terminal screen' },
          { type: 'output', text: '  help                      - Show this command reference list' },
        ]);
        setIsRunning(false);
      }, 250);
      return;
    }

    if (cmdLower.includes('doctor')) {
      const steps = [
        { text: '→ Probing environment: Node.js 22.13.0 (x64-win32), Native Fetch OK', delay: 200 },
        { text: '→ Checking runtime dependencies: 0 external node_modules detected (Pure Native)', delay: 450 },
        { text: '  [✓] OpenAI           Endpoint: api.openai.com          RTT: 11.2ms (gpt-4o, o3-mini)', delay: 700 },
        { text: '  [✓] Anthropic        Endpoint: api.anthropic.com       RTT: 15.8ms (claude-3-7-sonnet)', delay: 950 },
        { text: '  [✓] Google Gemini    Endpoint: generativelanguage.googleapis.com RTT: 9.4ms (gemini-2.5-flash)', delay: 1150 },
        { text: '  [✓] Groq LPU         Endpoint: api.groq.com            RTT: 3.1ms  (llama-3.3-70b)', delay: 1350 },
        { text: '  [✓] DeepSeek         Endpoint: api.deepseek.com        RTT: 14.6ms (deepseek-r1)', delay: 1550 },
        { text: '  [✓] xAI Grok         Endpoint: api.x.ai                RTT: 15.1ms (grok-2)', delay: 1750 },
        { text: '  [✓] Mistral AI       Endpoint: api.mistral.ai          RTT: 12.3ms (codestral-latest)', delay: 1950 },
        { text: '  [✓] Ollama (Local)   Endpoint: http://localhost:11434  RTT: 1.8ms  (zero egress air-gap)', delay: 2150 },
        { text: '→ In-memory Circuit Breaker status: 10/10 CLOSED (Healthy, 0 failures recorded)', delay: 2350 },
        { text: '✔ Doctor check complete: All providers operational. Control plane overhead: 0.24ms.', delay: 2550 },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay - (steps[steps.indexOf(step) - 1]?.delay || 0)));
        setLogs((prev) => [
          ...prev,
          {
            type: step.text.startsWith('✔') ? 'success' : step.text.includes('[✓]') ? 'output' : 'info',
            text: step.text,
          },
        ]);
      }
      setIsRunning(false);
      return;
    }

    if (cmdLower.includes('benchmark')) {
      const steps = [
        { text: '→ Starting 10,000 in-process routing iterations benchmark...', delay: 250 },
        { text: '  [1/3] In-Process Zero-Dependency Router: mean latency 0.18ms | p99: 0.42ms', delay: 700 },
        { text: '  [2/3] Traditional External Cloud Gateway: mean latency 42.6ms | p99: 98.3ms', delay: 1200 },
        { text: '  [3/3] Semantic Cosine Cache Lookup: mean latency 0.08ms (4,096 dimension)', delay: 1700 },
        { text: '✔ Result: SinapsAI in-process routing is 236x faster than external HTTP gateway proxies.', delay: 2100 },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay - (steps[steps.indexOf(step) - 1]?.delay || 0)));
        setLogs((prev) => [
          ...prev,
          { type: step.text.startsWith('✔') ? 'success' : 'output', text: step.text },
        ]);
      }
      setIsRunning(false);
      return;
    }

    if (cmdLower.includes('pii-test')) {
      const steps = [
        { text: '→ Executing Reversible Zero-Leak PII Tokenization Engine...', delay: 250 },
        { text: '  Input text: "Customer Alice (alice@acme.corp, 4532-1100-2233-4455) requested refund of $450."', delay: 650 },
        { text: '  Masked payload to LLM: "Customer Alice (<SINAPS_EMAIL_8F9A>, <SINAPS_CC_3B2C>) requested refund of $450."', delay: 1100 },
        { text: '  Stream chunk detokenized on return: "Confirmation sent to alice@acme.corp for card ending in 4455."', delay: 1600 },
        { text: '✔ Zero PII data touched external frontier LLM servers. Invertible nonce destroyed.', delay: 2000 },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay - (steps[steps.indexOf(step) - 1]?.delay || 0)));
        setLogs((prev) => [
          ...prev,
          { type: step.text.startsWith('✔') ? 'success' : 'output', text: step.text },
        ]);
      }
      setIsRunning(false);
      return;
    }

    if (cmdLower.includes('init')) {
      const steps = [
        { text: '→ Creating sinaps.config.ts in project root...', delay: 200 },
        { text: '→ Detected runtime: Node.js / Next.js 15 (TypeScript)', delay: 600 },
        { text: '→ Writing zero-dependency configuration file...', delay: 1000 },
        { text: '✔ Successfully created sinaps.config.ts. Import via: import { sinaps } from "./sinaps.config";', delay: 1400 },
      ];

      for (const step of steps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay - (steps[steps.indexOf(step) - 1]?.delay || 0)));
        setLogs((prev) => [
          ...prev,
          { type: step.text.startsWith('✔') ? 'success' : 'output', text: step.text },
        ]);
      }
      setIsRunning(false);
      return;
    }

    // Default unhandled
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          type: 'warn',
          text: `Command not recognized: "${trimmed}". Type "help" to see available sandbox commands.`,
        },
      ]);
      setIsRunning(false);
    }, 250);
  };

  const handleCopy = () => {
    const rawText = logs.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-neutral-950 border border-white/[0.08] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-neutral-900/90 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          </div>
          <span className="text-[11px] text-neutral-400 font-mono pl-2 border-l border-white/10 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>sinapsai-cli-sandbox (~/workspace)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors text-[11px]"
            title="Copy terminal output"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            onClick={() => setLogs([])}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors text-[11px]"
            title="Clear screen"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Preset Command Shortcuts Bar */}
      <div className="px-4 py-2.5 bg-neutral-900/40 border-b border-white/5 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mr-1">
          Quick Run:
        </span>
        {PRESET_COMMANDS.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.cmd}
              type="button"
              disabled={isRunning}
              onClick={() => executeCommand(preset.cmd)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-amber-950/40 border border-white/5 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 transition-all text-[11px] disabled:opacity-50"
            >
              <Icon className="w-3 h-3 text-amber-400" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 h-[340px] overflow-y-auto space-y-1.5 font-mono text-[12px] leading-relaxed select-text bg-[#07080a]">
        {logs.map((log, i) => {
          if (log.type === 'input') {
            return (
              <div key={i} className="text-amber-400 font-semibold flex items-center gap-2">
                <span className="text-neutral-500">user@sinapsai:~$</span>
                <span>{log.text.replace('$ ', '')}</span>
              </div>
            );
          }
          if (log.type === 'success') {
            return (
              <div key={i} className="text-emerald-400 font-medium">
                {log.text}
              </div>
            );
          }
          if (log.type === 'warn') {
            return (
              <div key={i} className="text-amber-300/90">
                {log.text}
              </div>
            );
          }
          if (log.type === 'info') {
            return (
              <div key={i} className="text-neutral-500">
                {log.text}
              </div>
            );
          }
          return (
            <div key={i} className="text-neutral-300">
              {log.text}
            </div>
          );
        })}

        {isRunning && (
          <div className="flex items-center gap-2 text-amber-400 text-xs py-1">
            <span className="animate-spin inline-block w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full" />
            <span>Executing in-process control plane...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(inputVal);
        }}
        className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900/80 border-t border-white/5"
      >
        <span className="text-amber-400 text-xs select-none">user@sinapsai:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isRunning}
          placeholder="Type command (e.g. npx sinapsai doctor, benchmark, help)..."
          className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-600 focus:outline-none text-xs font-mono"
        />
        <button
          type="submit"
          disabled={isRunning || !inputVal.trim()}
          className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-medium transition-colors text-xs flex items-center gap-1 disabled:opacity-40"
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden sm:inline">Run</span>
        </button>
      </form>
    </div>
  );
}
