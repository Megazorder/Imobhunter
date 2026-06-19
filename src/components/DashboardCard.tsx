import type { LucideIcon } from 'lucide-react';

type DashboardCardProps = { title: string; value: string; change: string; icon: LucideIcon; accent: string };

export function DashboardCard({ title, value, change, icon: Icon, accent }: DashboardCardProps) {
  return <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p><strong className="mt-3 block text-3xl font-bold text-slate-950 dark:text-white">{value}</strong></div><div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white`}><Icon size={22} /></div></div><p className="mt-5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{change}</p></article>;
}
