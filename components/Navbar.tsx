'use client';

import { useState, useEffect } from 'react';
import { Zap, ChevronRight, Menu, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090a]/85 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors shadow-sm">
                <Zap className="w-4 h-4 fill-emerald-400/20 text-emerald-400 transition-transform group-hover:scale-110" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-white tracking-tight text-base font-sans">SinapsAI</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  v1.2.0
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 px-1 py-0.2 rounded border border-white/5 bg-white/[0.02]">
                  0 Deps
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <a
              href="#playground"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <span>Playground</span>
            </a>
            <a
              href="#architecture"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Architecture
            </a>
            <a
              href="#circuit-breaker"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Circuit Breaker
            </a>
            <a
              href="#sandbox"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              SDK & Examples
            </a>
            <a
              href="#benchmarks"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Benchmarks
            </a>
            <a
              href="#faq"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-3 py-1.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 hover:border-white/25 transition-all shadow-sm"
              title="View SinapsAI on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] text-emerald-400 font-sans ml-1">★ 404 tests</span>
            </a>

            <a
              href="https://www.npmjs.com/package/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-all duration-200 shadow-[0_0_20px_-3px_rgba(16,185,129,0.45)] hover:shadow-[0_0_25px_-1px_rgba(16,185,129,0.6)] active:scale-95 font-sans"
            >
              <span>npm i sinapsai</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-400 hover:text-white p-2 rounded-md hover:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08090a] border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-400 hover:text-emerald-300 font-medium py-1"
            >
              Playground & Calculator
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-1"
            >
              Architecture
            </a>
            <a
              href="#circuit-breaker"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-1"
            >
              Circuit Breaker
            </a>
            <a
              href="#sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-1"
            >
              SDK & Examples
            </a>
            <a
              href="#benchmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-1"
            >
              Benchmarks
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-1"
            >
              FAQ
            </a>
          </div>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://github.com/roedyrustam/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-xs font-medium text-white bg-neutral-900 border border-white/15 rounded-md transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/package/sinapsai"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 text-xs font-medium text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors text-center"
            >
              npm install sinapsai
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
