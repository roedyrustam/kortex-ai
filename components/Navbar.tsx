'use client';

import { useState, useEffect } from 'react';
import {
  Zap,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Terminal,
  Activity,
  Layers,
  HelpCircle,
  Play,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  onOpenWaitlist?: () => void;
}

export function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090a]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* LEFT: Logo & Brand Identity */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-amber-400 group-hover:border-amber-500/50 transition-all shadow-sm shrink-0">
                <Zap className="w-4 h-4 fill-amber-400/20 text-amber-400 transition-transform group-hover:scale-110" />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-semibold text-white tracking-tight text-base font-sans whitespace-nowrap">
                  SinapsAI
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                  v1.2.0
                </span>
                <span className="hidden xl:inline-block text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] whitespace-nowrap">
                  0 Deps
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Desktop Navigation Links (Clean, No-Wrap, Well-Spaced) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium whitespace-nowrap">
            <a
              href="/docs"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-200 flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-amber-950/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs & CLI</span>
            </a>
            <a
              href="/#playground"
              className="text-neutral-300 hover:text-white transition-colors duration-200"
            >
              Playground
            </a>
            <a
              href="/#architecture"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Architecture
            </a>
            <a
              href="/#circuit-breaker"
              className="text-neutral-400 hover:text-white transition-colors duration-200 hidden xl:inline-block"
            >
              Circuit Breaker
            </a>
            <a
              href="/#sandbox"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              SDK & Examples
            </a>
            <a
              href="/#benchmarks"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Benchmarks
            </a>
            <a
              href="/#faq"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* RIGHT: Action Buttons Group (No-Wrap, Balanced Hierarchy) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/25 transition-all shadow-sm shrink-0 whitespace-nowrap"
              title="View SinapsAI on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] text-amber-400 font-sans ml-0.5">★ 404 tests</span>
            </a>

            <a
              href="https://www.npmjs.com/package/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-200 shadow-[0_0_15px_-2px_rgba(245,158,11,0.4)] hover:shadow-[0_0_20px_0px_rgba(245,158,11,0.6)] active:scale-95 font-sans whitespace-nowrap shrink-0 leading-none"
            >
              <span>npm i sinapsai</span>
              <ChevronRight className="w-3 h-3" />
            </a>

            {/* Mobile / Tablet Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-md hover:bg-neutral-900 border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08090a]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 text-sm font-medium">
            <a
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-400 hover:text-amber-300 font-medium py-2 px-3 rounded-lg bg-amber-950/30 border border-amber-500/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Technical Documentation & CLI</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-amber-500/70" />
            </a>

            <a
              href="/#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-200 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <Play className="w-4 h-4 text-neutral-400" />
              <span>Interactive Playground</span>
            </a>

            <a
              href="/#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-neutral-400" />
              <span>Architecture & Topology</span>
            </a>

            <a
              href="/#circuit-breaker"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <Activity className="w-4 h-4 text-neutral-400" />
              <span>Circuit Breaker State Machine</span>
            </a>

            <a
              href="/#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>SDK & Code Examples</span>
            </a>

            <a
              href="/#benchmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <Zap className="w-4 h-4 text-neutral-400" />
              <span>Latency Benchmarks</span>
            </a>

            <a
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors flex items-center gap-2.5"
            >
              <HelpCircle className="w-4 h-4 text-neutral-400" />
              <span>Frequently Asked Questions</span>
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-xs font-mono text-white bg-neutral-900 border border-white/15 rounded-md transition-colors text-center inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Star on GitHub (404 tests passing)</span>
            </a>
            <a
              href="https://www.npmjs.com/package/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors text-center font-sans shadow-md"
            >
              npm install sinapsai
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
