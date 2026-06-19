import { Building2, CalendarClock, FileText, Home, LayoutDashboard, Settings, TrendingUp, Users, UserRoundCheck } from 'lucide-react';

export const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
  { label: 'Imóveis', icon: Home, href: '#imoveis' },
  { label: 'Clientes', icon: Users, href: '#clientes' },
  { label: 'Leads', icon: TrendingUp, href: '#leads' },
  { label: 'Agenda', icon: CalendarClock, href: '#agenda' },
  { label: 'Documentos', icon: FileText, href: '#documentos' },
  { label: 'Relatórios', icon: Building2, href: '#relatorios' },
  { label: 'Configurações', icon: Settings, href: '#configuracoes' },
];

export const dashboardCards = [
  { title: 'Total de imóveis', value: '248', change: '+12 este mês', icon: Building2, accent: 'from-blue-500 to-cyan-500' },
  { title: 'Imóveis disponíveis', value: '186', change: '75% da carteira', icon: Home, accent: 'from-emerald-500 to-teal-500' },
  { title: 'Clientes', value: '1.420', change: '+8% vs. mês anterior', icon: Users, accent: 'from-violet-500 to-purple-500' },
  { title: 'Leads ativos', value: '94', change: '23 novos leads', icon: UserRoundCheck, accent: 'from-amber-500 to-orange-500' },
];

export const propertyChart = [62, 78, 58, 92, 85, 110, 124, 118, 138, 145, 132, 158];
export const leadChart = [24, 31, 36, 29, 42, 48, 44, 57, 61, 66, 72, 81];

export const activities = [
  { title: 'Novo imóvel cadastrado', description: 'Apartamento Vista Parque foi adicionado à carteira.', time: 'há 12 min' },
  { title: 'Lead qualificado', description: 'Mariana Souza demonstrou interesse em cobertura.', time: 'há 38 min' },
  { title: 'Contrato atualizado', description: 'Documentação do imóvel #IH-204 enviada para revisão.', time: 'há 2 h' },
  { title: 'Visita concluída', description: 'Cliente avaliou positivamente o imóvel Jardim Sul.', time: 'ontem' },
];

export const appointments = [
  { client: 'Rafael Lima', subject: 'Visita ao Loft Central', date: 'Hoje', time: '14:30' },
  { client: 'Carla Mendes', subject: 'Assinatura de contrato', date: 'Hoje', time: '17:00' },
  { client: 'Grupo Solaris', subject: 'Reunião de proposta', date: 'Amanhã', time: '09:15' },
  { client: 'Ana Beatriz', subject: 'Tour virtual', date: 'Sex, 21', time: '11:00' },
];
