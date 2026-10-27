'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TelemetryBar } from '@/components/TelemetryBar';
import { LivePlayground } from '@/components/LivePlayground';
import { ArchitectureShowcase } from '@/components/ArchitectureShowcase';
import { BentoGrid } from '@/components/BentoGrid';
import { CodeSandbox } from '@/components/CodeSandbox';
import { Pricing } from '@/components/Pricing';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { WaitlistModal } from '@/components/WaitlistModal';

export default function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('developer');

  const handleOpenWaitlist = (planId: string = 'developer') => {
    setSelectedPlan(planId);
    setWaitlistOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08090a] text-neutral-100 flex flex-col justify-between">
      {/* Sticky Glass Navbar */}
      <Navbar onOpenWaitlist={() => handleOpenWaitlist('developer')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero with Interactive Terminal */}
        <Hero onOpenWaitlist={() => handleOpenWaitlist('developer')} />

        {/* Real-time Telemetry Bar & Social Proof */}
        <TelemetryBar />

        {/* Interactive In-Process Failover & Cost Playground */}
        <LivePlayground />

        {/* Distributed Architecture Fabric Showcase */}
        <ArchitectureShowcase />

        {/* Architecture & Core Bento Grid */}
        <BentoGrid />

        {/* Multi-SDK Code Sandbox */}
        <CodeSandbox />

        {/* Transparent Developer Pricing */}
        <Pricing onSelectTier={(tierId) => handleOpenWaitlist(tierId)} />

        {/* Technical FAQ */}
        <Faq />
      </main>

      {/* Modern High-End Footer */}
      <Footer />

      {/* Interactive Modal */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
