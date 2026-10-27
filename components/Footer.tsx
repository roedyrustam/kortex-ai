import { Cpu, Shield, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white tracking-tight text-sm font-sans">Kortex AI</span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed text-xs">
              Autonomous multi-agent orchestration fabric with sub-millisecond trace latency, deterministic replay logs, and Nitro Enclaves.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-white/10 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-neutral-600">|</span>
              <span className="text-emerald-400">42 Edge Nodes</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#bento" className="hover:text-white transition-colors">Consensus Mesh</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">Time-Travel Replay</a></li>
              <li><a href="#bento" className="hover:text-white transition-colors">Columnar Tracing</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Matrix</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-3">Developers</h4>
            <ul className="space-y-2">
              <li><a href="#sandbox" className="hover:text-white transition-colors">TypeScript SDK</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Python SDK</a></li>
              <li><a href="#sandbox" className="hover:text-white transition-colors">Go Client</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-3">Security</h4>
            <ul className="space-y-2">
              <li><span className="text-neutral-300">SOC2 Type II</span></li>
              <li><span className="text-neutral-300">HIPAA Compliant</span></li>
              <li><span className="text-neutral-300">Nitro Enclaves</span></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Whitepaper</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Kortex Engine Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
