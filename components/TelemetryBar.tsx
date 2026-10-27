import { Activity, ShieldCheck, Zap, Layers, Sparkles, Cpu } from 'lucide-react';

const METRICS = [
  {
    label: 'Added Latency',
    value: '< 8.4ms',
    change: 'in-process execution',
    desc: 'No external HTTP proxy hops or container lag',
    icon: Zap,
  },
  {
    label: 'Runtime Dependencies',
    value: '0 Deps',
    change: 'pure native fetch',
    desc: 'Zero bloated npm packages or native C++ addons',
    icon: ShieldCheck,
  },
  {
    label: 'Automated Test Suite',
    value: '404/404',
    change: '100% passing tests',
    desc: 'Strict TypeScript coverage & multi-runtime tests',
    icon: Layers,
  },
  {
    label: 'Token Cost Reduction',
    value: 'Up to 85%',
    change: 'semantic + prompt cache',
    desc: 'In-process cosine cache & KV-cache audit',
    icon: Activity,
  },
];

const PROVIDERS = [
  { name: 'OPENAI', desc: 'GPT-4o, o1, o3-mini' },
  { name: 'ANTHROPIC', desc: 'Claude 3.7 Sonnet & Haiku' },
  { name: 'GOOGLE GEMINI', desc: 'Gemini 2.5 & Flash Thinking' },
  { name: 'GROQ', desc: 'LPU Ultra-Fast Inference' },
  { name: 'DEEPSEEK', desc: 'DeepSeek R1 & V3' },
  { name: 'xAI GROK', desc: 'Grok 2 & Grok Vision' },
  { name: 'OLLAMA', desc: 'Local SLMs & Custom Endpoints' },
  { name: 'COHERE', desc: 'Command A & Embed v4' },
];

export function TelemetryBar() {
  return (
    <section id="benchmarks" className="py-16 border-y border-white/[0.08] bg-[#090a0d]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-neutral-900/40 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    {metric.label}
                  </span>
                  <div className="p-1.5 rounded-md bg-white/[0.03] text-emerald-400 group-hover:bg-emerald-950/40 border border-white/5 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-mono font-semibold tracking-tight text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Supported Unified Providers */}
        <div className="flex flex-col items-center">
          <p className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-6 text-center">
            Standardized Unified API across 9+ Frontier AI Providers & Local SLMs
          </p>
          <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {PROVIDERS.map((provider, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-400 transition-colors" />
                <span className="font-mono text-xs tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                  {provider.name}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans hidden sm:inline">
                  ({provider.desc})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
