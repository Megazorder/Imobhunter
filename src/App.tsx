import { useState } from 'react';
import { ActivityList } from './components/ActivityList';
import { DashboardCard } from './components/DashboardCard';
import { DashboardChart } from './components/DashboardChart';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UpcomingAppointments } from './components/UpcomingAppointments';
import { activities, appointments, dashboardCards, leadChart, propertyChart } from './data/dashboard';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileMenuOpen} onToggle={() => setSidebarCollapsed((value) => !value)} onCloseMobile={() => setMobileMenuOpen((value) => !value)} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
          <Header darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />
          <main id="dashboard" className="space-y-8 p-4 sm:p-6 lg:p-8">
            <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 p-8 text-white shadow-xl"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Dashboard</p><h2 className="mt-3 text-3xl font-bold">Visão geral da operação imobiliária</h2><p className="mt-3 max-w-3xl text-blue-50">Acompanhe imóveis, clientes, leads e compromissos em uma experiência administrativa responsiva com dados simulados para demonstração.</p></section>
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{dashboardCards.map((card) => <DashboardCard key={card.title} {...card} />)}</section>
            <section className="grid gap-6 xl:grid-cols-2"><DashboardChart title="Gráfico de imóveis" subtitle="Evolução da carteira nos últimos 12 meses" data={propertyChart} color="bg-blue-500" /><DashboardChart title="Gráfico de leads" subtitle="Captação e qualificação mensal" data={leadChart} color="bg-emerald-500" /></section>
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><ActivityList activities={activities} /><UpcomingAppointments appointments={appointments} /></section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
