import React from 'react';

interface LogoProps {
  className?: string;
}

export function OpenAILogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="OpenAI Logo">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zm-12.641 4.135l-2.02-1.1639a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4597a.7948.7948 0 0 0-.3928.6814zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.6069 1.4997-2.602-1.4997z"/>
    </svg>
  );
}

export function AnthropicLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Anthropic Logo">
      <path d="M13.827 3.5h3.693L24 20.5h-3.693l-1.579-3.793H11.75l-1.58 3.793H6.477L13.827 3.5zm3.54 10.74l-2.607-6.26-2.607 6.26h5.214zM0 20.5l4.582-11.003h3.693L3.693 20.5H0z"/>
    </svg>
  );
}

export function GeminiLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Google Gemini Logo">
      <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
    </svg>
  );
}

export function GroqLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Groq Logo">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm4-9h-5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h-3v-1h4a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z"/>
    </svg>
  );
}

export function DeepSeekLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="DeepSeek Logo">
      <path d="M2.5 13.5c1.8-3.2 5.5-5.5 9.8-5.5 5.8 0 10.5 4.2 10.5 9.5 0 .7-.1 1.4-.3 2-1.5-1.2-3.8-2-6.5-2-4.2 0-7.8 1.8-9.8 4.5-.4-1.2-.6-2.5-.6-3.8 0-1.8.4-3.4 1.2-4.7l-4.3 0zm9.8-7.5c-1.1 0-2.1.2-3.1.5C9.9 4.2 11.5 3 13.5 3c2.5 0 4.6 1.8 5 4.2-1.8-.7-3.9-1.2-6.2-1.2z"/>
    </svg>
  );
}

export function XAILogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="xAI Grok Logo">
      <path d="M3.2 2h4.5l5.3 7.8L18.3 2h4.5l-7.6 11.1L23 22h-4.5l-5.6-8.2L7.6 22H3.1l7.8-11.4L3.2 2z"/>
    </svg>
  );
}

export function MistralLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Mistral AI Logo">
      <path d="M3 3h3.6v3.6H3zm14.4 0H21v3.6h-3.6zM3 6.6h7.2v3.6H3zm10.8 0H21v3.6h-7.2zM3 10.2h10.8v3.6H3zm7.2 0H21v3.6h-10.8zM3 13.8h7.2v3.6H3zm10.8 0H21v3.6h-7.2zM3 17.4h3.6V21H3zm14.4 0H21V21h-3.6z"/>
    </svg>
  );
}

export function MetaLlamaLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Meta Llama Logo">
      <path d="M12 7.2c-3.1 0-5.4 2.2-6.7 4.5-1.1 2-1.7 4.1-1.7 5.1 0 2 1.3 3.6 3.4 3.6 2.3 0 4.1-1.9 5-3.7 1 1.8 2.8 3.7 5.1 3.7 2.1 0 3.4-1.6 3.4-3.6 0-1-.6-3.1-1.7-5.1-1.3-2.3-3.6-4.5-6.8-4.5zm-3.8 9.9c-.9 0-1.5-.7-1.5-1.7 0-.7.5-2.2 1.4-3.8 1-1.8 2.5-3.3 3.9-3.3.4 0 .7.1 1 .3-1.6 2.5-3.4 6.7-4.8 8.5zm7.6 0c-1.4-1.8-3.2-6-4.8-8.5.3-.2.6-.3 1-.3 1.4 0 2.9 1.5 3.9 3.3.9 1.6 1.4 3.1 1.4 3.8 0 1-.6 1.7-1.5 1.7z"/>
    </svg>
  );
}

export function OllamaLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Ollama Logo">
      <path d="M9.5 2C8.67 2 8 2.67 8 3.5V8H7a3 3 0 0 0-3 3v2a3 3 0 0 0 2 2.82V20a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-4h2v4a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-4.18A3 3 0 0 0 20 13v-2a3 3 0 0 0-3-3h-5V3.5C12 2.67 11.33 2 10.5 2h-1zm.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
  );
}

export function CohereLogo({ className = 'w-4 h-4' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Cohere Logo">
      <path d="M16.5 4a5.5 5.5 0 0 1 5.5 5.5c0 3.04-2.46 5.5-5.5 5.5a5.5 5.5 0 0 1-5.5-5.5C11 6.46 13.46 4 16.5 4zm-9 6a5.5 5.5 0 0 1 5.5 5.5c0 3.04-2.46 5.5-5.5 5.5A5.5 5.5 0 0 1 2 15.5C2 12.46 4.46 10 7.5 10z"/>
    </svg>
  );
}
