'use client';

import { Check, ChevronRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  description: string;
  price: string;
  billingPeriod: string;
  ctaText: string;
  ctaLink?: string;
  features: { label: string; included: boolean }[];
}

const TIERS: PricingTier[] = [
  {
    id: 'oss',
    name: 'Open Source Community',
    description: '100% free under the MIT license. Runs locally in your Node.js or Edge process with zero external dependencies.',
    price: '$0',
    billingPeriod: 'free forever (MIT)',
    ctaText: 'Install via npm',
    ctaLink: 'https://www.npmjs.com/package/sinapsai',
    features: [
      { label: '100% in-process control plane (<10ms overhead)', included: true },
      { label: 'In-memory circuit breaker & auto-failover', included: true },
      { label: '9+ AI providers (OpenAI, Claude, Gemini, Groq, Ollama)', included: true },
      { label: 'Zero-dependency semantic response caching', included: true },
      { label: 'Reversible PII anonymization vault', included: true },
      { label: 'Speculative hedged requests & context compressor', included: true },
      { label: 'Unlimited tokens, calls & API keys', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Production Edge & Distributed',
    badge: 'Distributed Apps',
    popular: true,
    description: 'For teams deploying across multi-region edge clusters with shared state and distributed caching.',
    price: '$49',
    billingPeriod: 'per team / month',
    ctaText: 'Deploy Distributed Fabric',
    features: [
      { label: 'All Open Source features included', included: true },
      { label: 'Distributed storage adapters (Cloudflare KV, Redis, D1)', included: true },
      { label: 'Centralized OpenTelemetry & Prometheus exporters', included: true },
      { label: 'FinOps cumulative token budget hard-caps', included: true },
      { label: 'Cross-worker rate limiting (RPM & TPM)', included: true },
      { label: 'Priority GitHub issue triage & Discord access', included: true },
      { label: 'Multi-region failover replication guides', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Governance',
    badge: 'Mission Critical',
    description: 'Custom security guardrails, private custom model adapters, and dedicated architectural review.',
    price: 'Custom',
    billingPeriod: 'annual agreement',
    ctaText: 'Schedule Architecture Review',
    features: [
      { label: 'All Production Edge features included', included: true },
      { label: 'Bespoke custom provider plugins & internal endpoints', included: true },
      { label: 'Hardware Nitro / AMD SEV-SNP enclaves guidance', included: true },
      { label: 'Custom PII entity extractors & regex rules', included: true },
      { label: 'SOC2 Type II, HIPAA & GDPR compliance attestation', included: true },
      { label: 'Guaranteed 99.99% uptime SLA architecture audit', included: true },
      { label: 'Direct architectural pairing with core maintainers', included: true },
    ],
  },
];

interface PricingProps {
  onSelectTier: (tierId: string) => void;
}

export function Pricing({ onSelectTier }: PricingProps) {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#08090a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Open Source & Production Deployment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Free and open source. Zero hidden vendor lock-in.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            SinapsAI is a zero-dependency open source library licensed under MIT. Use it in personal projects, startups, or fortune 500 infrastructure without licensing fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-neutral-900/90 to-neutral-900/40 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.12)]'
                  : 'bg-neutral-900/30 border border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    tier.popular
                      ? 'bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/20'
                      : 'bg-sky-950 text-sky-300 border border-sky-800'
                  }`}>
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed min-h-[40px] mb-6">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10 font-mono">
                  <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                  <span className="text-xs text-neutral-500">{tier.billingPeriod}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span className="text-neutral-300">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {tier.ctaLink ? (
                <a
                  href={tier.ctaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_-1px_rgba(16,185,129,0.6)] cursor-pointer"
                >
                  <span>{tier.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    tier.popular
                      ? 'text-neutral-950 bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)]'
                      : 'text-white bg-neutral-800 hover:bg-neutral-700 border border-white/10'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
