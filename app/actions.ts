'use server';

import type { ServerActionResult, WaitlistSubmission } from '@/lib/types';

export async function submitWaitlistLead(formData: FormData): Promise<ServerActionResult<WaitlistSubmission>> {
  const email = formData.get('email')?.toString().trim();
  const fullName = formData.get('fullName')?.toString().trim();
  const company = formData.get('company')?.toString().trim();
  const sdkPreference = (formData.get('sdkPreference')?.toString() || 'typescript') as any;

  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Please provide a valid engineering or corporate email address.',
    };
  }

  // Simulate persistent write to PostgreSQL / Supabase
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: 'Access granted. Welcome to the Kortex Early Architecture Cohort.',
    data: {
      email,
      fullName: fullName || 'Engineer',
      company: company || 'Autonomous Labs',
      sdkPreference,
    },
  };
}
