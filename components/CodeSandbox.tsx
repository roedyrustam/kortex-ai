'use client';

import { useState } from 'react';
import { Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';

interface CodeSnippet {
  id: string;
  label: string;
  filename: string;
  description: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'failover',
    label: 'Failover & Circuit Breaker',
    filename: 'failover-gateway.ts',
    description: 'Automatic multi-provider failover with in-memory circuit breaking and zero third-party proxy servers.',
    code: `import { 
  SinapsClient, 
  OpenAiProvider, 
  AnthropicProvider, 
  GeminiProvider 
} from 'sinapsai';

const client = new SinapsClient({
  strategy: 'failover',
  providers: [
    new OpenAiProvider({ apiKey: process.env.OPENAI_API_KEY! }),
    new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY! }),
    new GeminiProvider({ apiKey: process.env.GEMINI_API_KEY! }),
  ],
  circuitBreaker: {
    failureThreshold: 3,         // Trip circuit after 3 consecutive failures
    recoverySuccessThreshold: 2, // Restore circuit after 2 successful probes
    resetTimeoutMs: 30000,       // Wait 30s before testing recovery (Half-Open)
  },
  hooks: {
    onFallback: (error, fromProvider, toProvider) => {
      console.warn(\`[Failover] \${fromProvider.name} failed -> switching to \${toProvider.name}\`);
    },
    onCircuitOpen: (provider) => {
      console.error(\`[Circuit Breaker] Tripped OPEN for \${provider.name}\`);
    },
  },
});

const response = await client.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Explain zero-dependency architecture' }],
});

console.log(response.choices[0].message.content);`,
  },
  {
    id: 'adaptive',
    label: 'Adaptive & Smart Routing',
    filename: 'smart-router.ts',
    description: 'Dynamic Laplace-smoothed reliability algorithm prioritizing fastest, lowest-cost, and healthiest endpoints.',
    code: `import { SinapsClient, OpenAiProvider, GroqProvider, DeepSeekProvider } from 'sinapsai';

const client = new SinapsClient({
  strategy: 'adaptive', // Smart-hybrid reliability & latency scoring
  providers: [
    new GroqProvider({ apiKey: process.env.GROQ_API_KEY! }),
    new DeepSeekProvider({ apiKey: process.env.DEEPSEEK_API_KEY! }),
    new OpenAiProvider({ apiKey: process.env.OPENAI_API_KEY! }),
  ],
  hedging: {
    enabled: true,
    hedgeDelayMs: 350, // Launch backup request if primary exceeds 350ms
  },
});

// SinapsAI dynamically routes to the lowest-latency available provider
const completion = await client.chat.completions.create({
  model: 'deepseek-chat',
  messages: [{ role: 'user', content: 'Generate high-throughput pipeline in TypeScript' }],
  stream: true,
});

for await (const chunk of completion) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`,
  },
  {
    id: 'pii',
    label: 'Reversible PII Vault',
    filename: 'pii-guardrails.ts',
    description: 'Zero-knowledge in-memory anonymization preserving privacy without altering LLM reasoning quality.',
    code: `import { SinapsClient, AnthropicProvider } from 'sinapsai';

const client = new SinapsClient({
  providers: [new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY! })],
  guardrails: {
    pii: {
      action: 'mask-reversible', // Masks before send, detokenizes on stream
      entities: ['email', 'phone', 'ssn', 'credit-card'],
    },
  },
});

// Prompt contains sensitive customer email and phone
const response = await client.chat.completions.create({
  model: 'claude-3-7-sonnet-20250219',
  messages: [{ 
    role: 'user', 
    content: 'Send refund receipt to alice@enterprise.com (Phone: +1-555-0199)' 
  }],
});

// Third-party LLM only sees encrypted tokens <PII_EM_92A>
// Client response automatically restores real values!
console.log(response.choices[0].message.content);`,
  },
  {
    id: 'ai-sdk',
    label: 'Vercel AI SDK Adapter',
    filename: 'ai-sdk-adapter.ts',
    description: 'Official zero-dependency adapter for Vercel AI SDK Core & React 19 UI streaming.',
    code: `import { createSinapsai } from 'sinapsai/ai-sdk';
import { streamText } from 'ai';

const sinapsai = createSinapsai({
  strategy: 'lowest-latency',
  providers: [
    { provider: 'groq', apiKey: process.env.GROQ_API_KEY },
    { provider: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY },
    { provider: 'openai', apiKey: process.env.OPENAI_API_KEY },
  ],
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: sinapsai('smart-model-alias'),
    messages,
  });

  return result.toDataStreamResponse();
}`,
  },
  {
    id: 'reasoning',
    label: 'Universal Frontier Reasoning',
    filename: 'frontier-reasoning.ts',
    description: 'Unified deep thinking control across Claude 3.7 Sonnet, OpenAI o1/o3/o4, and Gemini Flash Thinking.',
    code: `import { SinapsClient, AnthropicProvider, OpenAiProvider } from 'sinapsai';

const client = new SinapsClient({
  providers: [
    new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY! }),
    new OpenAiProvider({ apiKey: process.env.OPENAI_API_KEY! }),
  ],
});

const response = await client.chat.completions.create({
  model: 'claude-3-7-sonnet-20250219',
  messages: [{ role: 'user', content: 'Solve concurrency edge-case with formal proof' }],
  // Unified reasoning configuration:
  thinkingBudget: 2048,           // Claude 3.7 Sonnet CoT token budget
  reasoningEffort: 'high',         // o1 / o3 / o4 reasoning effort
});

// Reasoning tokens are standardized across all providers:
console.log('[Thinking Path]:', response.choices[0].message.reasoning_content);
console.log('[Final Answer]:', response.choices[0].message.content);`,
  },
];

export function CodeSandbox() {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('failover');
  const [copied, setCopied] = useState(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === selectedSnippetId) || SNIPPETS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="py-24 bg-[#090a0d] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Language Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
              <Code2 className="w-4 h-4" />
              <span>Standardized TypeScript SDK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              Drop into your existing stack in under 60 seconds
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Compatible with the OpenAI Chat Completions standard. Zero vendor lock-in, zero Docker infrastructure, zero Redis instances.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-neutral-900 border border-white/10 self-start md:self-auto">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.id}
                type="button"
                onClick={() => setSelectedSnippetId(snippet.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedSnippetId === snippet.id
                    ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-white/10'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {snippet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0e12] overflow-hidden shadow-2xl">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/70 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <span className="h-3 w-[1px] bg-white/10 mx-2" />
              <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                {activeSnippet.filename}
              </span>
              <span className="hidden sm:inline-block text-[11px] text-neutral-500 font-sans ml-2">
                — {activeSnippet.description}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700/80 border border-white/10 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="p-6 overflow-x-auto bg-[#0a0b0e] font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-300">
            <pre>
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
