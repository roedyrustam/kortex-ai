'use client';

import { useState } from 'react';
import { Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';
import type { SdkLanguage } from '@/lib/types';

interface CodeSnippet {
  language: SdkLanguage;
  label: string;
  filename: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    language: 'typescript',
    label: 'TypeScript',
    filename: 'agent.ts',
    code: `import { KortexCluster, AgentNode } from '@kortex/runtime-sdk';

// Initialize deterministic agent cluster
const cluster = new KortexCluster({
  apiKey: process.env.KORTEX_API_KEY!,
  enclave: 'tee-nitro',
  replayJournal: true,
});

// Register distributed subagent
const planner = new AgentNode({
  name: 'strategic-planner',
  model: 'gemini-3.8-flash',
  maxLatencyMs: 250,
});

const trace = await cluster.dispatch(planner, {
  intent: 'reconcile_ledger_transactions',
  timeout: '5s',
});

console.log(\`Trace span: \${trace.id} in \${trace.latencyMs}ms\`);`,
  },
  {
    language: 'python',
    label: 'Python',
    filename: 'agent.py',
    code: `from kortex import KortexCluster, AgentNode
import asyncio

async def main():
    cluster = KortexCluster(
        api_key="kx_live_098234",
        enclave_isolation="hardware_nitro",
        wal_logging=True
    )
    
    auditor = AgentNode(
        name="policy-enforcer",
        zero_shot_guardrails=True
    )
    
    result = await cluster.dispatch_async(
        agent=auditor,
        payload={"query": "validate_snap_bi_signatures"}
    )
    print(f"Quorum acknowledged: {result.quorum_ack} | Latency: {result.p99}ms")

asyncio.run(main())`,
  },
  {
    language: 'go',
    label: 'Go',
    filename: 'main.go',
    code: `package main

import (
	"context"
	"fmt"
	"github.com/kortex-ai/sdk-go/v2"
)

func main() {
	client := kortex.NewClient(kortex.Config{
		ClusterRegion: "iad-edge",
		EnableReplay:  true,
	})

	span, err := client.Dispatch(context.Background(), kortex.TaskRequest{
		AgentID: "db-optimizer",
		Payload: []byte(\`{"optimize": "hnsw_indexes"}\`),
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("State snapshot logged: %s (%0.2fms)\\n", span.TraceID, span.DurationMs)
}`,
  },
  {
    language: 'rust',
    label: 'Rust',
    filename: 'main.rs',
    code: `use kortex_rs::{KortexCluster, AgentBuilder};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cluster = KortexCluster::builder()
        .with_enclave_nitro()
        .connect("kx_live_token")
        .await?;

    let agent = AgentBuilder::new("wasm-sandbox-worker")
        .timeout_ms(150)
        .build();

    let trace = cluster.run_task(&agent, "audit_contract").await?;
    println!("Zero-copy snapshot committed: {}", trace.block_hash);
    Ok(())
}`,
  },
  {
    language: 'curl',
    label: 'cURL',
    filename: 'terminal.sh',
    code: `curl -X POST https://api.kortex.ai/v2/clusters/dispatch \\
  -H "Authorization: Bearer $KORTEX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "X-Kortex-Enclave: hardware-nitro" \\
  -d '{
    "agent": "consensus-orchestrator",
    "intent": "evaluate_model_drift",
    "replay_level": "strict"
  }'`,
  },
];

export function CodeSandbox() {
  const [activeLang, setActiveLang] = useState<SdkLanguage>('typescript');
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS.find((s) => s.language === activeLang) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sandbox" className="py-24 bg-[#090a0d] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
              <Code2 className="w-4 h-4" />
              <span>Developer Ergonomics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              Drop into your existing stack in under 60 seconds
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              First-class idiomatic client SDKs for TypeScript, Python, Go, Rust, and standard POSIX cURL.
            </p>
          </div>

          {/* Language Switcher Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-neutral-900 border border-white/10 self-start md:self-auto">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.language}
                type="button"
                onClick={() => setActiveLang(snippet.language)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  activeLang === snippet.language
                    ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-white/10'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                }`}
              >
                {snippet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Box */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0e12] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/70 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <span className="h-3 w-[1px] bg-white/10 mx-2" />
              <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                {currentSnippet.filename}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 border border-white/10 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="p-6 overflow-x-auto bg-[#0a0b0e] font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-300">
            <pre>
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-neutral-950/90 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Deterministic Runtime Engine • TypeSafe Signatures Guaranteed</span>
            <span className="text-emerald-400">0.00% Silent Fallback Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
