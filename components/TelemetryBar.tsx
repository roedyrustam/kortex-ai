'use client';

import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Wifi,
} from 'lucide-react';
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

interface ProviderData {
  id: string;
  name: string;
  badge: string;
  desc: string;
  brandColor: string;
  accentBg: string;
  borderHover: string;
  latency: string;
  tier: string;
  models: string;
  codeSnippet: string;
  Logo: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const PROVIDERS: ProviderData[] = [
  {
    id: 'openai',
    name: 'OPENAI',
    badge: 'GPT-4o & o3',
    desc: 'GPT-4o, o1, o3-mini & Structured Output',
    brandColor: '#10A37F',
    accentBg: 'rgba(16, 163, 127, 0.12)',
    borderHover: 'rgba(16, 163, 127, 0.45)',
    latency: '11.4ms',
    tier: 'Frontier AI',
    models: 'gpt-4o, o3-mini, gpt-4o-realtime',
    codeSnippet: `const chat = await sinaps.chat({
  model: 'openai/gpt-4o',
  fallback: ['anthropic/claude-3-7-sonnet', 'google/gemini-2.5-flash'],
  circuitBreaker: { failureThreshold: 3, resetTimeoutMs: 5000 }
});`,
    Logo: OpenAILogo,
  },
  {
    id: 'anthropic',
    name: 'ANTHROPIC',
    badge: 'Claude 3.7',
    desc: 'Claude 3.7 Sonnet & Haiku Hybrid Reasoning',
    brandColor: '#D97757',
    accentBg: 'rgba(217, 119, 87, 0.12)',
    borderHover: 'rgba(217, 119, 87, 0.45)',
    latency: '16.2ms',
    tier: 'Frontier AI',
    models: 'claude-3-7-sonnet, claude-3-5-haiku',
    codeSnippet: `const chat = await sinaps.chat({
  model: 'anthropic/claude-3-7-sonnet',
  fallback: ['google/gemini-2.5-pro', 'deepseek/deepseek-r1'],
  thinkingBudget: 4096
});`,
    Logo: AnthropicLogo,
  },
  {
    id: 'gemini',
    name: 'GOOGLE GEMINI',
    badge: 'Gemini 2.5',
    desc: 'Gemini 2.5 Pro & Flash Thinking 2M Context',
    brandColor: '#4285F4',
    accentBg: 'rgba(66, 133, 244, 0.12)',
    borderHover: 'rgba(66, 133, 244, 0.45)',
    latency: '9.8ms',
    tier: 'Multimodal',
    models: 'gemini-2.5-pro, gemini-2.5-flash',
    codeSnippet: `const chat = await sinaps.chat({
  model: 'google/gemini-2.5-flash',
  fallback: ['groq/llama-3.3-70b-versatile'],
  cachePolicy: 'semantic-first'
});`,
    Logo: GeminiLogo,
  },
  {
    id: 'groq',
    name: 'GROQ',
    badge: 'LPU Speed',
    desc: 'LPU Ultra-Fast Inference (<10ms TTFT)',
    brandColor: '#F55036',
    accentBg: 'rgba(245, 80, 54, 0.12)',
    borderHover: 'rgba(245, 80, 54, 0.45)',
    latency: '3.1ms',
    tier: 'Ultra-Fast LPU',
    models: 'llama-3.3-70b-versatile, mixtral-8x7b',
    codeSnippet: `const stream = await sinaps.stream({
  model: 'groq/llama-3.3-70b-versatile',
  stream: true,
  maxTokens: 1024
});`,
    Logo: GroqLogo,
  },
  {
    id: 'deepseek',
    name: 'DEEPSEEK',
    badge: 'R1 Reasoning',
    desc: 'DeepSeek R1 & V3 Open Reasoning Engines',
    brandColor: '#0066FF',
    accentBg: 'rgba(0, 102, 255, 0.12)',
    borderHover: 'rgba(0, 102, 255, 0.45)',
    latency: '14.8ms',
    tier: 'Open Weights',
    models: 'deepseek-r1, deepseek-v3',
    codeSnippet: `const reasoning = await sinaps.chat({
  model: 'deepseek/deepseek-r1',
  fallback: ['anthropic/claude-3-7-sonnet'],
  stripChainOfThought: false
});`,
    Logo: DeepSeekLogo,
  },
  {
    id: 'xai',
    name: 'xAI GROK',
    badge: 'Grok 2',
    desc: 'Grok 2 & Grok Vision Real-Time Knowledge',
    brandColor: '#E5E7EB',
    accentBg: 'rgba(229, 231, 235, 0.12)',
    borderHover: 'rgba(229, 231, 235, 0.45)',
    latency: '15.5ms',
    tier: 'Frontier AI',
    models: 'grok-2-1212, grok-2-vision',
    codeSnippet: `const chat = await sinaps.chat({
  model: 'xai/grok-2-1212',
  fallback: ['openai/gpt-4o'],
  temperature: 0.7
});`,
    Logo: XAILogo,
  },
  {
    id: 'mistral',
    name: 'MISTRAL AI',
    badge: 'Codestral & Large',
    desc: 'Pixtral 12B, Codestral & Mistral Large 2',
    brandColor: '#FF7000',
    accentBg: 'rgba(255, 112, 0, 0.12)',
    borderHover: 'rgba(255, 112, 0, 0.45)',
    latency: '12.6ms',
    tier: 'European Edge',
    models: 'codestral-latest, mistral-large-2411',
    codeSnippet: `const code = await sinaps.complete({
  model: 'mistral/codestral-latest',
  prompt: 'export function binarySearch(...)',
  stopSequences: ['\n\n']
});`,
    Logo: MistralLogo,
  },
  {
    id: 'meta',
    name: 'META LLAMA',
    badge: 'Llama 3.3',
    desc: 'Llama 3.3 70B & Quantized Edge Weights',
    brandColor: '#0081FB',
    accentBg: 'rgba(0, 129, 251, 0.12)',
    borderHover: 'rgba(0, 129, 251, 0.45)',
    latency: '7.9ms',
    tier: 'Open Architecture',
    models: 'meta-llama-3.3-70b-instruct',
    codeSnippet: `const chat = await sinaps.chat({
  model: 'meta/llama-3.3-70b-instruct',
  providerRoute: 'groq | cloudflare | local',
  autoSelectCheapest: true
});`,
    Logo: MetaLlamaLogo,
  },
  {
    id: 'ollama',
    name: 'OLLAMA',
    badge: 'Local SLM',
    desc: 'Local Air-Gapped SLMs & Custom Endpoints',
    brandColor: '#F3F4F6',
    accentBg: 'rgba(243, 244, 246, 0.12)',
    borderHover: 'rgba(243, 244, 246, 0.45)',
    latency: '1.9ms',
    tier: 'Zero Egress Air-Gap',
    models: 'llama3.2:3b, phi4, qwen2.5-coder',
    codeSnippet: `const local = await sinaps.chat({
  model: 'ollama/qwen2.5-coder:7b',
  baseUrl: 'http://localhost:11434',
  requireZeroEgress: true
});`,
    Logo: OllamaLogo,
  },
  {
    id: 'cohere',
    name: 'COHERE',
    badge: 'Command R+',
    desc: 'Command R+, Embed v4 & Rerank 3.5 Engine',
    brandColor: '#FF7759',
    accentBg: 'rgba(255, 119, 89, 0.12)',
    borderHover: 'rgba(255, 119, 89, 0.45)',
    latency: '13.1ms',
    tier: 'Enterprise RAG',
    models: 'command-r-plus, rerank-v3.5',
    codeSnippet: `const reranked = await sinaps.rerank({
  model: 'cohere/rerank-v3.5',
  query: 'database isolation level snapshot',
  documents: chunks
});`,
    Logo: CohereLogo,
  },
];

export function TelemetryBar() {
  const [selectedProvider, setSelectedProvider] = useState<ProviderData>(PROVIDERS[4]); // Default to DeepSeek

  return (
    <section id="benchmarks" className="py-20 border-y border-white/[0.08] bg-[#090a0d]/60 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
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

        {/* SECTION HEADER: Standardized Unified API across 9+ Frontier AI Providers & Local SLMs */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Standardized Unified API across 9+ Frontier AI Providers & Local SLMs</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            One Canonical Interface. Zero SDK Lock-In.
          </h3>
          <p className="text-sm text-neutral-400 max-w-2xl font-sans">
            Hot-swap between frontier closed models and open local SLMs with native automatic failover, circuit breakers, and sub-10ms in-process routing.
          </p>

          {/* Live telemetry radar status badge */}
          <div className="flex items-center gap-3 mt-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-neutral-300">10/10 Providers Healthy</span>
            </div>
            <span className="text-neutral-700">•</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Wifi className="w-3 h-3" />
              <span>In-Memory Ping Active</span>
            </div>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <span className="text-neutral-500 hidden sm:inline">Click any provider to inspect live route</span>
          </div>
        </div>

        {/* ANIMATED CARRIER STREAM (Continuous Infinite Loop) */}
        <div className="mb-8 relative">
          <div className="overflow-hidden mask-fade-edges py-2">
            <div className="animate-marquee flex items-center gap-4">
              {PROVIDERS.concat(PROVIDERS).map((provider, idx) => {
                const ProviderLogo = provider.Logo;
                return (
                  <div
                    key={`${provider.id}-marquee-${idx}`}
                    onClick={() => setSelectedProvider(provider)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-neutral-900/70 border border-white/[0.08] hover:border-amber-500/40 hover:bg-neutral-800/80 transition-all duration-200 cursor-pointer shrink-0 group select-none shadow-sm"
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{
                        color: provider.brandColor,
                        backgroundColor: provider.accentBg,
                      }}
                    >
                      <ProviderLogo className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
                          {provider.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400 tabular-nums">
                          {provider.latency}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-sans">
                        {provider.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* INTERACTIVE PROVIDER MATRIX (10 Cards with Radar Scanner Beam) */}
        <div className="relative rounded-2xl bg-neutral-950/70 border border-white/[0.08] p-5 sm:p-6 shadow-2xl overflow-hidden mb-8">
          {/* Subtle radar scanline beam across the matrix */}
          <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-amber-400/[0.08] to-transparent pointer-events-none animate-radar-sweep" />

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-3.5 relative z-10">
            {PROVIDERS.map((provider) => {
              const ProviderLogo = provider.Logo;
              const isSelected = selectedProvider.id === provider.id;

              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedProvider(provider)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all duration-200 group relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                    isSelected
                      ? 'bg-neutral-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-900/40 border-white/[0.07] hover:border-white/20 hover:bg-neutral-900/80 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active highlight corner bar */}
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: provider.brandColor }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        color: isSelected ? provider.brandColor : '#9ca3af',
                        backgroundColor: isSelected ? provider.accentBg : 'rgba(255, 255, 255, 0.04)',
                        boxShadow: isSelected ? `0 0 15px -3px ${provider.brandColor}40` : 'none',
                      }}
                    >
                      <ProviderLogo className="w-5 h-5" />
                    </div>

                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors tabular-nums"
                      style={{
                        borderColor: isSelected ? `${provider.brandColor}50` : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? provider.brandColor : '#737373',
                        backgroundColor: isSelected ? provider.accentBg : 'transparent',
                      }}
                    >
                      {provider.latency}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white transition-colors truncate mb-1">
                    {provider.name}
                  </span>

                  <span className="text-[11px] text-neutral-400 font-sans line-clamp-1 mb-2">
                    {provider.desc}
                  </span>

                  <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span className="truncate">{provider.tier}</span>
                    {isSelected ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="group-hover:text-neutral-300 flex items-center gap-0.5 transition-colors">
                        Route <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LIVE CANONICAL ROUTE INSPECTOR (Terminal View for Selected Provider) */}
        <div className="rounded-xl bg-[#08090b] border border-white/[0.08] p-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono font-medium text-neutral-200">
                Live Routing Spec: <span className="text-amber-400">{selectedProvider.name}</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 hidden sm:inline">
                models: {selectedProvider.models}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Native In-Process Route</span>
              <span className="text-neutral-700">•</span>
              <span className="text-amber-400 font-semibold">Zero Network Proxy Lag</span>
            </div>
          </div>

          <div className="pt-4 font-mono text-xs overflow-x-auto text-neutral-300 leading-relaxed">
            <pre className="text-amber-200/90 whitespace-pre">
              <code>{selectedProvider.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
