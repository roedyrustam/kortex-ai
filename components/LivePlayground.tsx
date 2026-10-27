'use client';

import { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Calculator, 
  Copy, 
  Check, 
  Sliders, 
  ArrowRight, 
  Sparkles,
  Server,
  Lock,
  Activity
} from 'lucide-react';

interface SimulationResult {
  attemptedProvider: string;
  status: 'success' | 'failover' | 'blocked';
  routedTo: string;
  circuitState: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  addedLatency: string;
  outboundPayload: string;
  inboundRestored: string;
  cached: boolean;
}

export function LivePlayground() {
  // Tab: 'simulator' | 'calculator'
  const [activeTab, setActiveTab] = useState<'simulator' | 'calculator'>('simulator');

  // Simulator States
  const [simulateOutage, setSimulateOutage] = useState(true);
  const [enablePiiVault, setEnablePiiVault] = useState(true);
  const [enableSemanticCache, setEnableSemanticCache] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(
    'Please verify account for customer Sarah Jenkins (email: sarah.j@acmefinance.com, card: 4532-8901-2345-6789) and refund transaction #89201.'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  // Calculator States
  const [monthlyRequests, setMonthlyRequests] = useState<number>(1000000); // 1M requests
  const [avgTokens, setAvgTokens] = useState<number>(1200);

  // Code Copy
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRunSimulation = () => {
    setIsExecuting(true);
    setSimResult(null);

    setTimeout(() => {
      if (enableSemanticCache) {
        setSimResult({
          attemptedProvider: 'SinapsAI In-Process Cache',
          status: 'success',
          routedTo: 'In-Memory Cosine Cache',
          circuitState: 'CLOSED',
          addedLatency: '0.24ms',
          outboundPayload: '[Cached Response - 0 External Network Calls Made]',
          inboundRestored: 'Transaction #89201 for Sarah Jenkins (sarah.j@acmefinance.com) verified and refunded successfully.',
          cached: true,
        });
        setIsExecuting(false);
        return;
      }

      if (simulateOutage) {
        setSimResult({
          attemptedProvider: 'OpenAI (Primary)',
          status: 'failover',
          routedTo: 'Anthropic Claude 3.7 Sonnet',
          circuitState: 'OPEN',
          addedLatency: '1.42ms',
          outboundPayload: enablePiiVault 
            ? 'Please verify account for customer Sarah Jenkins (email: <PII_EMAIL_8A2F>, card: <PII_CARD_901B>) and refund transaction #89201.'
            : customPrompt,
          inboundRestored: 'Transaction #89201 for Sarah Jenkins (sarah.j@acmefinance.com, card: 4532-8901-2345-6789) has been verified and processed.',
          cached: false,
        });
      } else {
        setSimResult({
          attemptedProvider: 'OpenAI GPT-4o',
          status: 'success',
          routedTo: 'OpenAI GPT-4o',
          circuitState: 'CLOSED',
          addedLatency: '0.86ms',
          outboundPayload: enablePiiVault 
            ? 'Please verify account for customer Sarah Jenkins (email: <PII_EMAIL_8A2F>, card: <PII_CARD_901B>) and refund transaction #89201.'
            : customPrompt,
          inboundRestored: 'Transaction #89201 for Sarah Jenkins (sarah.j@acmefinance.com) has been verified and processed.',
          cached: false,
        });
      }
      setIsExecuting(false);
    }, 700);
  };

  // Calculations:
  // Latency saved: Cloud gateways add ~120ms network hop. SinapsAI is ~8ms. Diff = 112ms per call.
  const hoursSaved = Math.round((monthlyRequests * 0.112) / 3600);
  // Infra saved: LiteLLM Docker container + Redis cluster + Portkey cloud costs ~$180 - $450/mo
  const infraCostSaved = monthlyRequests >= 5000000 ? 550 : monthlyRequests >= 1000000 ? 240 : 90;
  // Token cost saved via semantic caching (~30% duplicate rate on production prompts)
  const estimatedTokenSavings = Math.round((monthlyRequests * 0.3 * (avgTokens / 1000) * 0.005));

  const generatedCode = `import { SinapsClient, OpenAiProvider, AnthropicProvider } from 'sinapsai';

const client = new SinapsClient({
  strategy: 'adaptive',
  providers: [
    new OpenAiProvider({ apiKey: process.env.OPENAI_API_KEY! }),
    new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY! }),
  ],
  circuitBreaker: {
    failureThreshold: ${simulateOutage ? '3' : '5'},
    resetTimeoutMs: 30000,
  },
  guardrails: {
    pii: { action: '${enablePiiVault ? 'mask-reversible' : 'none'}' },
  },
});`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="playground" className="py-24 bg-[#08090a] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Test In-Process Failover & Privacy in Real Time
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Experience how SinapsAI trips circuit breakers, routes to healthy fallback providers, and anonymizes sensitive PII—without making external proxy hops.
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-900 border border-white/10 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Live Gateway Simulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Latency & Cost Savings Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls & Prompt (5 cols) */}
            <div className="lg:col-span-5 bg-[#0b0c10] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  SIMULATOR CONTROLS
                </span>
                <span className="text-[10px] font-mono text-amber-400">Zero Cloud Hop</span>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-colors cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-medium text-white block">Simulate OpenAI Outage (429 RateLimit)</span>
                    <span className="text-[11px] text-neutral-500">Trips circuit breaker to test fallback routing</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={simulateOutage}
                    onChange={(e) => setSimulateOutage(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-colors cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-medium text-white block">Reversible PII Anonymization Vault</span>
                    <span className="text-[11px] text-neutral-500">Encrypts email/card before sending to LLM</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enablePiiVault}
                    onChange={(e) => setEnablePiiVault(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-colors cursor-pointer">
                  <div className="pr-3">
                    <span className="text-xs font-medium text-white block">Semantic Response Cache Hit</span>
                    <span className="text-[11px] text-neutral-500">Emulate &gt;0.85 cosine similarity hit (0.2ms)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableSemanticCache}
                    onChange={(e) => setEnableSemanticCache(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Input Prompt Box */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2">
                  Input User Prompt (Includes PII)
                </label>
                <textarea
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-white/10 text-neutral-200 text-xs font-mono focus:outline-none focus:border-amber-500 leading-relaxed resize-none"
                />
              </div>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isExecuting}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer"
              >
                <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
                <span>{isExecuting ? 'Executing In-Process Routing...' : 'Dispatch Request via SinapsAI'}</span>
              </button>
            </div>

            {/* Right Live Visualizer & Output (7 cols) */}
            <div className="lg:col-span-7 bg-[#0b0c10] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  ROUTING TRACE & DATA PRIVACY AUDIT
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Live Visual Inspection</span>
              </div>

              {/* Status Header Bar */}
              {simResult ? (
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-3 font-mono text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">Circuit State:</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        simResult.circuitState === 'CLOSED'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {simResult.circuitState}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">Added Overhead:</span>
                      <span className="text-amber-400 font-semibold">{simResult.addedLatency}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">Destination:</span>
                      <span className="text-amber-300 font-semibold">{simResult.routedTo}</span>
                    </div>
                  </div>

                  {simResult.status === 'failover' && (
                    <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Primary OpenAI failed (429 RateLimit). Tripped OPEN & auto-routed to Anthropic Claude seamlessly.</span>
                    </div>
                  )}

                  {simResult.cached && (
                    <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Zero network calls made. Semantic similarity hit saved 100% provider token cost.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-white/10 text-center text-xs text-neutral-500 font-mono">
                  Click &quot;Dispatch Request via SinapsAI&quot; to inspect real-time in-process routing.
                </div>
              )}

              {/* Dual Panel: What LLM Sees vs What Client Receives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Outbound to Provider */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-[11px]">
                    <span className="text-purple-400 flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      Payload Sent to LLM
                    </span>
                    <span className="text-[10px] text-neutral-500">Anonymized</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 leading-relaxed break-words min-h-[90px]">
                    {simResult ? simResult.outboundPayload : 'No request dispatched yet...'}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-500 block pt-1 border-t border-white/5">
                    Zero raw PII leaves your Node.js process memory
                  </span>
                </div>

                {/* Inbound Restored to Application */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-[11px]">
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Stream Received by Client
                    </span>
                    <span className="text-[10px] text-neutral-500">Restored</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-300 leading-relaxed break-words min-h-[90px]">
                    {simResult ? simResult.inboundRestored : 'Awaiting streaming response...'}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-500 block pt-1 border-t border-white/5">
                    Reversible vault decrypts tokens into natural text
                  </span>
                </div>
              </div>

              {/* Code Snippet for this config */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2 font-mono text-[11px]">
                  <span className="text-neutral-400">Generated Configuration:</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy TypeScript'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-white/10 font-mono text-[11px] text-neutral-400 overflow-x-auto">
                  <pre><code>{generatedCode}</code></pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Latency & Cost Savings Calculator */}
        {activeTab === 'calculator' && (
          <div className="bg-[#0b0c10] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Sliders (6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-white">Monthly AI Requests</label>
                    <span className="text-sm font-mono font-bold text-amber-400">
                      {monthlyRequests.toLocaleString()} req/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={monthlyRequests}
                    onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>100k</span>
                    <span>2.5M</span>
                    <span>5M</span>
                    <span>10M</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-white">Avg. Tokens Per Prompt</label>
                    <span className="text-sm font-mono font-bold text-sky-400">
                      {avgTokens.toLocaleString()} tokens
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="8000"
                    step="200"
                    value={avgTokens}
                    onChange={(e) => setAvgTokens(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>200</span>
                    <span>2,000</span>
                    <span>4,000</span>
                    <span>8,000</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 space-y-2 text-xs text-neutral-400 font-sans">
                  <p>
                    <strong className="text-white">Why the savings?</strong> External cloud AI proxies (Portkey, Helicone) add a 120ms round-trip hop over public WAN for every call, plus separate hosting costs for LiteLLM Docker containers.
                  </p>
                  <p className="text-amber-400 font-mono text-[11px]">
                    SinapsAI eliminates intermediary proxy servers completely.
                  </p>
                </div>
              </div>

              {/* Calculated Outputs (6 cols) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-amber-500/30 flex flex-col justify-between shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      User Latency Saved
                    </span>
                    <span className="text-3xl font-mono font-bold text-amber-400 tabular-nums">
                      ~{hoursSaved} Hours
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-4">
                    Cumulative developer/user wait time saved by avoiding proxy WAN hops.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Proxy Infrastructure Saved
                    </span>
                    <span className="text-3xl font-mono font-bold text-white tabular-nums">
                      ${infraCostSaved}/mo
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-4">
                    Saved on external Redis clusters, Docker EC2 instances & cloud markups.
                  </p>
                </div>

                <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-neutral-900/90 to-neutral-900/40 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Estimated Monthly Token Savings
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-mono font-bold text-white">
                        ~${estimatedTokenSavings.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">/ month</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                      Achieved via in-process cosine semantic caching and automated prompt prefix KV-cache reuse.
                    </p>
                  </div>

                  <a
                    href="https://github.com/roedyrustam/sinapsai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-all shrink-0 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <span>Start Saving with SinapsAI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
