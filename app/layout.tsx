import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kortex AI — Autonomous Multi-Agent Infrastructure & Observability',
  description:
    'Deploy, observe, and deterministically replay multi-agent swarms with sub-millisecond trace propagation, hardware Nitro Enclaves, and zero-trust policy gates.',
  keywords: [
    'AI agent infrastructure',
    'multi-agent orchestration',
    'deterministic replay',
    'distributed tracing',
    'autonomous agents',
    'Linear style UI',
  ],
  authors: [{ name: 'Kortex Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#08090a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} min-h-screen bg-[#08090a] text-neutral-100 antialiased selection:bg-emerald-950 selection:text-emerald-300`}>
        {children}
      </body>
    </html>
  );
}
