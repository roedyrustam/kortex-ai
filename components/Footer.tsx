import { Zap, Shield, Heart } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060708] py-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-emerald-400">
                <Zap className="w-3.5 h-3.5 fill-emerald-400/20 text-emerald-400" />
              </div>
              <span className="font-semibold text-white tracking-tight text-sm font-sans">SinapsAI</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                v1.2.0
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              High-performance, zero-dependency in-process AI gateway and smart router for Node.js, Edge Runtimes, and TypeScript.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>404 Tests Passing • Zero Runtime Dependencies</span>
            </div>
          </div>

          {/* Col 2: Core Engine */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Router & Engine</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#architecture" className="hover:text-white transition-colors">Adaptive Smart Routing</a></li>
              <li><a href="#circuit-breaker" className="hover:text-white transition-colors">In-Memory Circuit Breakers</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Semantic Vector Caching</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Reversible PII Vault</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Speculative Hedged Requests</a></li>
            </ul>
          </div>

          {/* Col 3: Supported LLMs */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Supported Providers</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><span className="text-neutral-300">OpenAI</span> (GPT-4o, o1, o3-mini)</li>
              <li><span className="text-neutral-300">Anthropic Claude</span> (3.7 Sonnet)</li>
              <li><span className="text-neutral-300">Google Gemini</span> (2.5 & Flash)</li>
              <li><span className="text-neutral-300">Groq LPU</span> & DeepSeek R1</li>
              <li><span className="text-neutral-300">Ollama</span> (Local SLMs & custom)</li>
            </ul>
          </div>

          {/* Col 4: Open Source & Community */}
          <div className="space-y-3 font-mono">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Open Source</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a
                  href="https://github.com/roedyrustam/sinapsai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/sinapsai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  npm Package Registry
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/roedyrustam/sinapsai/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/roedyrustam/sinapsai/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Contributing Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} SinapsAI. Released under the MIT License by Roedy Rustam.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <span className="text-neutral-700">•</span>
            <a
              href="https://www.npmjs.com/package/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              npm
            </a>
            <span className="text-neutral-700">•</span>
            <span className="text-emerald-400">Zero Dependencies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
