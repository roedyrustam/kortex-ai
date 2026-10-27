import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'SinapsAI — Zero-Dependency Universal AI Control Plane & Smart Router for Node.js',
  description:
    '100% in-process universal AI gateway and router for Node.js & Edge runtimes. Features in-memory circuit breakers, multi-provider failover, semantic caching, reversible PII vaults, and <10ms overhead.',
  keywords: [
    'SinapsAI',
    'AI gateway',
    'smart router',
    'in-process LLM gateway',
    'circuit breaker',
    'OpenAI failover',
    'Anthropic Claude',
    'Google Gemini',
    'DeepSeek R1',
    'Groq LPU',
    'zero dependencies',
    'semantic caching',
    'PII vault',
    'Node.js',
    'TypeScript',
  ],
  authors: [{ name: 'Roedy Rustam', url: 'https://github.com/roedyrustam' }],
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
    <html
      lang="en"
      className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${GeistSans.className} min-h-screen bg-[#08090a] text-neutral-100 antialiased selection:bg-amber-950 selection:text-amber-300`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
