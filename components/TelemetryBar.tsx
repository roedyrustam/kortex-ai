import { Activity, ShieldCheck, Zap, Layers } from 'lucide-react';

const METRICS = [
  {
    label: 'Edge Availability',
    value: '99.995%',
    change: '+0.004%',
    desc: 'Cross-region multi-active failover',
    icon: Activity,
  },
  {
    label: 'Trace Latency',
    value: '< 0.82ms',
    change: 'p99 kernel bypass',
    desc: 'Sub-millisecond state propagation',
    icon: Zap,
  },
  {
    label: 'Autonomous Runs',
    value: '14.8M+',
    change: 'per 24h cycle',
    desc: 'Distributed swarm consensus tasks',
    icon: Layers,
  },
  {
    label: 'Prompt Drift Rate',
    value: '0.00%',
    change: 'deterministic',
    desc: 'Hardware TEE replay validation',
    icon: ShieldCheck,
  },
];

const LOGOS = [
  'SYNTHESIS', 'VECTORLINE', 'AURAEDGE', 'NEXUSFLOW', 'HYPERSCALE', 'COREQUANT'
];

export function TelemetryBar() {
  return (
    <section className="py-16 border-y border-white/[0.08] bg-[#090a0d]/50 relative">
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

        {/* Social Proof / Partner Logos */}
        <div className="flex flex-col items-center">
          <p className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-6 text-center">
            Powering Autonomous Agent Fabric at Modern Engineering Orgs
          </p>
          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-50 grayscale hover:opacity-80 transition-opacity">
            {LOGOS.map((logo, i) => (
              <span
                key={i}
                className="font-mono text-sm tracking-widest text-neutral-300 border-b border-transparent hover:border-neutral-500 transition-colors"
              >
                // {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
