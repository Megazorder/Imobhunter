import type { ReactNode } from 'react';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="auth-shell">
      <section className="brand-panel">
        <span className="eyebrow">ImobHunter</span>
        <h1>Gestão imobiliária segura para equipes de alta performance.</h1>
        <p>Autenticação integrada ao Supabase com sessão persistente e Row Level Security.</p>
      </section>
      <section className="auth-card">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
