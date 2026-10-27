'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Terminal,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  ArrowLeft,
  Search,
  ExternalLink,
  Code2,
  Cpu,
  Lock,
  Workflow,
} from 'lucide-react';
import { CliSandbox } from '@/components/CliSandbox';
import { GithubIcon } from '@/components/GithubIcon';

interface DocSection {
  id: string;
  title: string;
  category: string;
}

const DOC_SECTIONS: DocSection[] = [
  { id: 'cli-sandbox', title: 'CLI Sandbox & Diagnostics', category: 'Getting Started' },
  { id: 'quickstart', title: 'Quickstart & Installation', category: 'Getting Started' },
  { id: 'unified-api', title: 'Canonical Unified API', category: 'Core Architecture' },
  { id: 'circuit-breaker', title: 'Circuit Breaker & Failover', category: 'Resilience' },
  { id: 'semantic-cache', title: 'Semantic Caching Engine', category: 'Performance' },
  { id: 'pii-vault', title: 'Reversible PII Vault', category: 'Security' },
  { id: 'multi-runtime', title: 'Multi-Runtime Deployment', category: 'Deployment' },
  { id: 'zero-deps', title: 'Zero-Dependency Invariant', category: 'Philosophy' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('cli-sandbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredSections = DOC_SECTIONS.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#08090a] text-neutral-100 font-sans antialiased selection:bg-amber-950 selection:text-amber-300">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#08090a]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Landing Page</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-amber-400 group-hover:border-amber-500/50 transition-colors">
              <Zap className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-white tracking-tight text-sm font-sans">SinapsAI Docs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
                v1.2.0
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/roedyrustam/sinapsai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-3 py-1.5 rounded-md bg-neutral-900 border border-white/10 hover:border-white/20 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href="https://www.npmjs.com/package/sinapsai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-md transition-colors"
          >
            <span>npm i sinapsai</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Main Documentation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-5">
              {/* Search bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full bg-neutral-900/70 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Navigation links by Category */}
              <nav className="space-y-4">
                {['Getting Started', 'Core Architecture', 'Resilience', 'Performance', 'Security', 'Deployment', 'Philosophy'].map(
                  (cat) => {
                    const items = filteredSections.filter((s) => s.category === cat);
                    if (items.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-2 block">
                          {cat}
                        </span>
                        <div className="space-y-0.5">
                          {items.map((sec) => (
                            <a
                              key={sec.id}
                              href={`#${sec.id}`}
                              onClick={() => setActiveSection(sec.id)}
                              className={`block px-2.5 py-1.5 rounded-md text-xs font-sans transition-all ${
                                activeSection === sec.id
                                  ? 'bg-amber-950/40 text-amber-300 font-medium border border-amber-500/30'
                                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                              }`}
                            >
                              {sec.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </nav>

              {/* Support & Community Box */}
              <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 space-y-2 text-xs">
                <span className="font-mono text-neutral-300 font-medium block">Open Source License</span>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                  SinapsAI is 100% open-source under the MIT license. Maintained by Roedy Rustam.
                </p>
                <a
                  href="https://github.com/roedyrustam/sinapsai/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 text-[11px] font-mono inline-flex items-center gap-1 pt-1"
                >
                  <span>Report an Issue</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-16 pb-24">
            {/* Header intro */}
            <div className="space-y-3 pb-8 border-b border-white/[0.08]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Technical Reference Manual</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                SinapsAI Architecture & SDK Reference
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-3xl">
                The zero-dependency in-process AI gateway and control plane for Node.js, Bun, and Edge runtimes.
                Eliminates external proxy bottlenecks, vendor SDK bloat, and unexpected LLM downtime.
              </p>
            </div>

            {/* SECTION 1: CLI Sandbox & Diagnostics */}
            <section id="cli-sandbox" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Section 1 // Interactive Sandbox</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                CLI Sandbox & Diagnostics
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Execute live diagnostics directly in the sandbox below to simulate provider connection health, Time-To-First-Token (TTFT),
                in-process router benchmark, and reversible PII masking.
              </p>

              <div className="pt-2">
                <CliSandbox />
              </div>
            </section>

            {/* SECTION 2: Quickstart & Installation */}
            <section id="quickstart" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Section 2 // Setup</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Quickstart & Installation
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                SinapsAI has <strong className="text-white">0 runtime dependencies</strong>. It ships pure TypeScript and compiled ESM/CJS utilizing native Web Streams, <code className="text-amber-300 font-mono">crypto.subtle</code>, and native <code className="text-amber-300 font-mono">fetch</code>.
              </p>

              <div className="rounded-xl bg-neutral-950 border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-white/5 text-xs font-mono text-neutral-400">
                  <span>Terminal</span>
                  <button
                    onClick={() => handleCopyCode('install-cmd', 'npm install sinapsai')}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedCodeId === 'install-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCodeId === 'install-cmd' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 font-mono text-xs text-amber-300 bg-[#07080a]">
                  <code>npm install sinapsai</code>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">Basic In-Process Gateway Example</h3>
                <div className="rounded-xl bg-neutral-950 border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-white/5 text-xs font-mono text-neutral-400">
                    <span>app/api/chat/route.ts</span>
                    <button
                      onClick={() =>
                        handleCopyCode(
                          'quickstart-code',
                          `import { SinapsAI } from 'sinapsai';

const sinaps = new SinapsAI({
  defaultProvider: 'openai',
  circuitBreaker: { failureThreshold: 3, resetTimeoutMs: 5000 },
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await sinaps.chat({
    model: 'openai/gpt-4o',
    fallback: ['anthropic/claude-3-7-sonnet', 'google/gemini-2.5-flash'],
    messages: [{ role: 'user', content: prompt }],
  });

  return Response.json(response);
}`
                        )
                      }
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {copiedCodeId === 'quickstart-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCodeId === 'quickstart-code' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 font-mono text-xs text-neutral-300 bg-[#07080a] overflow-x-auto leading-relaxed">
                    <code>{`import { SinapsAI } from 'sinapsai';

const sinaps = new SinapsAI({
  defaultProvider: 'openai',
  circuitBreaker: { failureThreshold: 3, resetTimeoutMs: 5000 },
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await sinaps.chat({
    model: 'openai/gpt-4o',
    fallback: ['anthropic/claude-3-7-sonnet', 'google/gemini-2.5-flash'],
    messages: [{ role: 'user', content: prompt }],
  });

  return Response.json(response);
}`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 3: Canonical Unified API */}
            <section id="unified-api" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Workflow className="w-4 h-4" />
                <span>Section 3 // Unified API</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Canonical Unified API Specification
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                SinapsAI translates differing provider request/response formats into a canonical standard.
                Never rewrite client code when switching from OpenAI to Anthropic, DeepSeek, or a local Ollama instance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-2">
                  <span className="font-mono text-xs font-semibold text-amber-400 block">sinaps.chat(params)</span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Synchronous completion with multi-provider failover, timeout guards, and automated token counting.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-2">
                  <span className="font-mono text-xs font-semibold text-amber-400 block">sinaps.stream(params)</span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Zero-alloc native ReadableStream yielding Server-Sent Events (SSE) chunks with live PII detokenization.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-2">
                  <span className="font-mono text-xs font-semibold text-amber-400 block">sinaps.embed(text)</span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Normalized dense vector embeddings across text-embedding-3, Cohere Embed v4, and local Ollama embeddings.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-2">
                  <span className="font-mono text-xs font-semibold text-amber-400 block">sinaps.rerank(docs, query)</span>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Cross-encoder semantic document reranking for precision retrieval-augmented generation (RAG).
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Circuit Breaker & Failover */}
            <section id="circuit-breaker" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                <span>Section 4 // Reliability</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Circuit Breaker State Machine & Auto-Failover
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Unlike external gateways that suffer when cloud vendors encounter API rate limits or HTTP 503 errors,
                SinapsAI executes an in-memory 3-state finite state machine in <strong className="text-white">&lt;0.05ms</strong>.
              </p>

              <div className="p-5 rounded-xl bg-neutral-950 border border-white/10 font-mono text-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <span className="text-neutral-400">State Transition Topology</span>
                  <span className="text-[11px] text-amber-400">Zero Thread Blocking</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-300">
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                    <span className="text-emerald-400 font-semibold block mb-1">1. CLOSED (Normal)</span>
                    <span className="text-[11px] text-neutral-400 leading-tight block">
                      Requests flow freely to primary model. Failure counter reset to 0 upon 200 OK.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20">
                    <span className="text-rose-400 font-semibold block mb-1">2. OPEN (Tripped)</span>
                    <span className="text-[11px] text-neutral-400 leading-tight block">
                      Exceeded 3 consecutive 429/503 errors. Primary bypassed immediately to fallback provider.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                    <span className="text-amber-400 font-semibold block mb-1">3. HALF-OPEN (Testing)</span>
                    <span className="text-[11px] text-neutral-400 leading-tight block">
                      After resetTimeout (e.g. 5000ms), dispatches 1 probe request. If healthy, resets to CLOSED.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Semantic Caching Engine */}
            <section id="semantic-cache" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Section 5 // Caching</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                In-Process Semantic Caching & Cosine Similarity
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Reduces frontier model token spend by up to <strong className="text-amber-400">85%</strong>.
                When a user submits a prompt semantically equivalent to a prior query (e.g. cosine distance &gt; 0.92),
                SinapsAI returns the cached completion in <strong className="text-white">&lt;0.1ms</strong> without sending a network packet to OpenAI or Anthropic.
              </p>

              <div className="rounded-xl bg-neutral-950 border border-white/10 p-4 font-mono text-xs space-y-2">
                <span className="text-amber-300 font-semibold">Semantic Cache Configuration</span>
                <pre className="text-neutral-300 leading-relaxed overflow-x-auto">
                  <code>{`const sinaps = new SinapsAI({
  cache: {
    enabled: true,
    strategy: 'semantic-cosine',
    similarityThreshold: 0.92, // Cosine similarity threshold
    ttlSeconds: 86400,          // 24 hours
    maxMemoryEntries: 10000,    // LRU memory cap
  }
});`}</code>
                </pre>
              </div>
            </section>

            {/* SECTION 6: Reversible PII Vault */}
            <section id="pii-vault" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Section 6 // Security</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Reversible Zero-Leak PII Tokenization Vault
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Comply with GDPR, HIPAA, and regional privacy acts (such as Indonesian UU PDP / SNAP BI).
                SinapsAI automatically tokenizes sensitive entities into cryptographically unique, reversible nonces before sending requests across the network, and restores them in real-time as SSE chunks stream back.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-neutral-400 block font-semibold">Supported Detection Patterns:</span>
                  <ul className="text-neutral-500 space-y-1 list-disc list-inside text-[11px] font-sans">
                    <li>Credit Cards (Visa, Mastercard, Amex, JCB Luhn)</li>
                    <li>Email Addresses & Domain IDs</li>
                    <li>Social Security Numbers & National IDs (NIK / NPWP)</li>
                    <li>API Keys, JWT Tokens, Bearer Secrets</li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-neutral-400 block font-semibold">Zero Inversion Leakage:</span>
                  <p className="text-neutral-500 text-[11px] font-sans leading-relaxed">
                    Nonce maps exist only in memory within the local runtime scope of that specific request.
                    No persistent database or third-party vault is ever contacted.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Multi-Runtime Deployment */}
            <section id="multi-runtime" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Section 7 // Portability</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Universal Multi-Runtime Deployment
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Runs identically in Node.js, Bun, Deno, and V8 edge isolates without shim polyfills.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
                <div className="p-3 rounded-lg bg-neutral-900/50 border border-white/5">
                  <span className="text-amber-400 font-semibold block mb-0.5">Node.js</span>
                  <span className="text-[10px] text-neutral-500">v18.0+ Native</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/50 border border-white/5">
                  <span className="text-amber-400 font-semibold block mb-0.5">Bun</span>
                  <span className="text-[10px] text-neutral-500">v1.2+ Bun.fetch</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/50 border border-white/5">
                  <span className="text-amber-400 font-semibold block mb-0.5">Cloudflare</span>
                  <span className="text-[10px] text-neutral-500">Workers / Pages</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900/50 border border-white/5">
                  <span className="text-amber-400 font-semibold block mb-0.5">Vercel</span>
                  <span className="text-[10px] text-neutral-500">Edge & Node Runtime</span>
                </div>
              </div>
            </section>

            {/* SECTION 8: Zero-Dependency Invariant */}
            <section id="zero-deps" className="space-y-5 scroll-mt-24">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 8 // Philosophy</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                The Zero-Dependency Invariant
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Most AI SDKs install 40+ transitive dependencies (causing prototype pollution vulnerabilities, CVEs, and slow cold-starts).
                SinapsAI guarantees exactly <strong className="text-amber-400">0 dependencies</strong> in its production package.
              </p>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs font-mono text-amber-200/90 leading-relaxed">
                <div className="flex items-center gap-2 mb-2 font-semibold text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>Production Guarantees:</span>
                </div>
                <p className="font-sans text-neutral-300">
                  • 0 transitive node_modules dependencies.<br />
                  • Package install size under 150KB.<br />
                  • Microsecond cold start time in serverless functions.<br />
                  • Immune to upstream supply chain attacks.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
