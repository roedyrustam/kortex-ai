import { Activity, ShieldCheck, Zap, Layers, Sparkles, Cpu } from 'lucide-react';
import {
  OpenAILogo,
  AnthropicLogo,
  GeminiLogo,
  GroqLogo,
  DeepSeekLogo,
  XAILogo,
  MistralLogo,
  MetaLlamaLogo,
  OllamaLogo,
  CohereLogo,
} from './ProviderLogos';

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
  { name: 'OPENAI', desc: 'GPT-4o, o1, o3-mini', Logo: OpenAILogo },
  { name: 'ANTHROPIC', desc: 'Claude 3.7 Sonnet & Haiku', Logo: AnthropicLogo },
  { name: 'GOOGLE GEMINI', desc: 'Gemini 2.5 & Flash Thinking', Logo: GeminiLogo },
  { name: 'GROQ', desc: 'LPU Ultra-Fast Inference', Logo: GroqLogo },
  { name: 'DEEPSEEK', desc: 'DeepSeek R1 & V3', Logo: DeepSeekLogo },
  { name: 'xAI GROK', desc: 'Grok 2 & Grok Vision', Logo: XAILogo },
  { name: 'MISTRAL AI', desc: 'Pixtral, Large 2 & Codestral', Logo: MistralLogo },
  { name: 'META LLAMA', desc: 'Llama 3.3 70B & Quantized', Logo: MetaLlamaLogo },
  { name: 'OLLAMA', desc: 'Local SLMs & Custom Endpoints', Logo: OllamaLogo },
  { name: 'COHERE', desc: 'Command A & Embed v4', Logo: CohereLogo },
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
                className="p-5 rounded-xl bg-neutral-900/40 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    {metric.label}
                  </span>
                  <div className="p-1.5 rounded-md bg-white/[0.03] text-amber-400 group-hover:bg-amber-950/40 border border-white/5 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-mono font-semibold tracking-tight text-white tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/30 border border-amber-500/20 text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Standardized Unified API across 9+ Frontier AI Providers & Local SLMs</span>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {PROVIDERS.map((provider, i) => {
              const ProviderLogo = provider.Logo;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-neutral-900/60 border border-white/[0.07] hover:border-amber-500/40 hover:bg-neutral-900/90 transition-all duration-200 group"
                >
                  <div className="w-5 h-5 rounded flex items-center justify-center text-neutral-400 group-hover:text-amber-400 transition-colors shrink-0">
                    <ProviderLogo className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs font-medium tracking-wider text-neutral-200 group-hover:text-white transition-colors truncate">
                      {provider.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans truncate">
                      {provider.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
