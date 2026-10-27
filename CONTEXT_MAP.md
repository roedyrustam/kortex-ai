# Context Map & TypeSpec Contract Slices
## Project: Kortex AI Landing Page

### 1. TypeScript Domain Models & Contracts

```typescript
// lib/types.ts

export type SdkLanguage = 'typescript' | 'python' | 'go' | 'rust' | 'curl';

export type PlanBillingCycle = 'monthly' | 'annual';

export interface PlanFeature {
  label: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  ctaText: string;
  features: PlanFeature[];
}

export interface TelemetryStat {
  label: string;
  value: string;
  detail: string;
  trend?: string;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'trace';
  message: string;
  latency?: string;
}

export interface WaitlistSubmission {
  email: string;
  fullName?: string;
  company?: string;
  sdkPreference: SdkLanguage;
}

export interface ServerActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
```

---

### 2. Design Tokens & Visual Hierarchy
- **Background**: `#09090b` (Deep obsidian / `neutral-950`)
- **Card Surface**: `#121215` (`neutral-900/60` with `backdrop-blur-md`)
- **Border Default**: `rgba(255, 255, 255, 0.08)` (`border-neutral-800/80`)
- **Border Hover**: `rgba(255, 255, 255, 0.2)` (`hover:border-neutral-700`)
- **Primary Accent**: Emerald-500 (`#10b981`) for live operational status, terminal highlights, and primary CTA.
- **Font Stack**: System UI / Inter / Geist with `font-sans` and monospace `font-mono tabular-nums`.
