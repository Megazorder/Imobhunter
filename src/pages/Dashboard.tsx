import { Building2, LogOut, UserRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { profile, user, signOut } = useAuth();

  return (
    <main className="dashboard">
      <header>
        <div>
          <span className="eyebrow">Área protegida</span>
          <h1>Bem-vindo ao ImobHunter</h1>
        </div>
        <button className="secondary" onClick={() => void signOut()}><LogOut size={18} /> Sair</button>
      </header>
      <section className="profile-grid">
        <article><UserRound /><strong>{profile?.full_name ?? user?.email}</strong><span>{profile?.email ?? user?.email}</span></article>
        <article><Building2 /><strong>Empresa</strong><span>{profile?.company_id ?? 'Sem empresa vinculada'}</span></article>
      </section>
    </main>
  );
}
