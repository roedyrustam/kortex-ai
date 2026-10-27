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
