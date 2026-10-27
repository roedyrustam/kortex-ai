'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does Kortex guarantee deterministic agent execution and replay?',
    a: 'Kortex records all external I/O, LLM token logits, pseudo-random seeds, and tool side-effects into an immutable append-only Write-Ahead Log (WAL). During replay, external calls are deterministically intercepted and re-hydrated from snapshot blocks without re-querying third-party APIs or incurring duplicate LLM billing.',
  },
  {
    q: 'Can Kortex be deployed inside our own AWS, GCP, or Azure VPC?',
    a: 'Yes. Enterprise Fabric plans support self-hosted agent clusters deployable via Terraform, Pulumi, or our native Kubernetes Helm operator with automated AWS Nitro Enclaves / GCP Confidential VM attestation.',
  },
  {
    q: 'Which frontier and open-weight models are natively supported?',
    a: 'Kortex is strictly model-agnostic. We provide out-of-the-box optimized runtime adapters for Gemini 3.8 / 4 Argon & Pro, Claude Opus 4.6 / Sonnet 5.5, OpenAI GPT-5 / GPT-4o, DeepSeek-R1, and local SLM inference runners via ONNX Runtime & WebGPU.',
  },
  {
    q: 'How does the hardware TEE enclave safeguard sensitive enterprise data?',
    a: 'Each agent execution occurs inside an isolated Trusted Execution Environment (TEE). Memory contents, system prompts, API keys, and context embeddings are encrypted at rest and in transit via hardware-bound AES-256-GCM keys. The host OS and hypervisor cannot inspect active runtime memory.',
  },
  {
    q: 'What occurs when an agent encounters network timeouts or rate limits?',
    a: 'Our gossip consensus protocol features automatic exponential backoff, circuit breaking, and subagent state handoff. If a node degrades, remaining quorum nodes speculatively resume the DAG branch within 2 milliseconds without failing the overarching workflow.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#090a0d] border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Architecture FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-lg">
            Answers for system architects, security auditors, and engineering teams.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-neutral-900/40 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-sans focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
