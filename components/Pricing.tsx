'use client';

import { useState } from 'react';
import { Check, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import type { PricingTier } from '@/lib/types';

interface PricingProps {
  onSelectTier: (tierId: string) => void;
}

const TIERS: PricingTier[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'For independent architects and prototypes testing deterministic agent graphs.',
    monthlyPrice: 0,
    annualPrice: 0,
    ctaText: 'Start Building Free',
    features: [
      { label: 'Up to 3 concurrent agent nodes', included: true },
      { label: '100,000 trace events / mo', included: true },
      { label: 'Deterministic replay (24h retention)', included: true },
      { label: 'Community Discord & GitHub support', included: true },
      { label: 'Dedicated VPC & Nitro Enclave', included: false },
      { label: 'Custom SLA & 99.99% uptime', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Production Pro',
    badge: 'Most Popular',
    popular: true,
    description: 'For high-scale engineering teams shipping multi-agent applications to production.',
    monthlyPrice: 49,
    annualPrice: 39,
    ctaText: 'Deploy Pro Cluster',
    features: [
      { label: 'Unlimited concurrent agent nodes', included: true },
      { label: '5,000,000 trace events / mo', included: true },
      { label: 'Deterministic replay (30-day retention)', included: true },
      { label: 'Zero-trust cryptographic enclaves', included: true },
      { label: 'Sub-millisecond trace propagation', included: true },
      { label: '99.95% availability SLA guarantee', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Fabric',
    badge: 'Mission Critical',
    description: 'Dedicated isolated infrastructure, custom hardware enclaves, and 24/7 SRE response.',
    monthlyPrice: 499,
    annualPrice: 399,
    ctaText: 'Schedule Architecture Review',
    features: [
      { label: 'Custom multi-region VPC deployment', included: true },
      { label: 'Bespoke volume token tracing & analytics', included: true },
      { label: 'Hardware Nitro / AMD SEV-SNP enclaves', included: true },
      { label: 'Custom model adapter & local SLM runner', included: true },
      { label: 'SOC2, HIPAA, ISO27001 attestation', included: true },
      { label: '99.995% SLA with 15-min emergency response', included: true },
    ],
  },
];

export function Pricing({ onSelectTier }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#08090a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Transparent Developer Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Predictable scale with zero hidden ingress fees
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
            Simple, transparent tiers built for individual engineers to hyper-growth enterprise organizations.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-neutral-900 border border-white/10">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isAnnual
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isAnnual
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? 'bg-neutral-900/80 border-2 border-emerald-500/50 shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)] md:-translate-y-2'
                    : 'bg-neutral-900/40 border border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                  </div>
                  <p className="text-xs text-neutral-400 mb-6 leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-white/[0.08]">
                    <span className="text-4xl font-mono font-bold text-white tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      / month {isAnnual && price > 0 && '(billed annually)'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            feature.included ? 'text-emerald-400' : 'text-neutral-600'
                          }`}
                        />
                        <span
                          className={
                            feature.included ? 'text-neutral-300' : 'text-neutral-600 line-through'
                          }
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-neutral-950 shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
