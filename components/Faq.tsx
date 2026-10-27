'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How is SinapsAI different from LiteLLM, Portkey, or Helicone?',
    answer:
      'Unlike LiteLLM (which runs as a separate Python Docker proxy) or Portkey/Helicone (which route your API keys and prompt data through third-party cloud servers with +50-250ms of network latency), SinapsAI is 100% in-process TypeScript. It runs directly inside your Node.js or Edge runtime with zero third-party data leakage, zero Redis dependencies, and under 10ms of total overhead.',
  },
  {
    question: 'Does SinapsAI require Docker, Redis, or external databases?',
    answer:
      'No. SinapsAI is strictly zero-dependency. All circuit breaker state machines, semantic vector caching, routing telemetry, and PII vaults operate in-process using native Node.js data structures and Web Crypto. If you need distributed state across multi-region serverless workers, optional storage adapters for Cloudflare KV, Redis, and D1 are available.',
  },
  {
    question: 'How does the in-memory circuit breaker prevent downtime?',
    answer:
      'SinapsAI continuously monitors provider responses. If a provider throws consecutive 5xx errors, HTTP 429 rate limits, or network timeouts exceeding your failureThreshold (e.g., 3 failures), the circuit trips OPEN in 0.04ms. Subsequent requests immediately bypass the broken provider and cascade to secondary providers (e.g., Anthropic Claude or Gemini) without blocking your event loop.',
  },
  {
    question: 'How does the Reversible PII Vault protect customer data?',
    answer:
      'Before sending your prompt to any external LLM provider, SinapsAI scans for PII entities (emails, phone numbers, SSNs, credit cards). It replaces them with cryptographic in-memory tokens (<PII_TOKEN_892F>) using AES-GCM. When the provider streams back its response, SinapsAI transparently detokenizes the stream in-memory so your application receives the natural values without raw PII ever touching external LLM logs.',
  },
  {
    question: 'Is SinapsAI compatible with Next.js App Router and Vercel AI SDK?',
    answer:
      'Yes! SinapsAI includes an official zero-dependency adapter for the Vercel AI SDK (`sinapsai/ai-sdk`). You can use `createSinapsai(client)` with `streamText`, `generateText`, and React 19 Server Actions with zero friction.',
  },
  {
    question: 'How does SinapsAI reduce monthly API bills by up to 85%?',
    answer:
      'SinapsAI employs dual cost-reduction mechanisms: (1) Zero-dependency in-process semantic caching matches similar prompts via cosine similarity, returning cached answers in 0.3ms without calling the LLM; (2) Built-in KV-cache and prompt-cache telemetry (`cachedPromptTokens`) enables automatic prompt prefix engineering that yields 70-90% discounts on Claude, OpenAI, and Gemini.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#08090a] border-t border-white/[0.08] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Architecture & Gateway FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about in-process routing, circuit breaker mechanics, and data privacy.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-neutral-900/40 overflow-hidden transition-colors hover:border-white/15"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm sm:text-base font-medium text-white transition-colors hover:text-amber-400 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                    {faq.answer}
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
