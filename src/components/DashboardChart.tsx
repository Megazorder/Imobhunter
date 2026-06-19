type DashboardChartProps = { title: string; subtitle: string; data: number[]; color: string };

export function DashboardChart({ title, subtitle, data, color }: DashboardChartProps) {
  const max = Math.max(...data);
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-6"><h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2><p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p></div><div className="flex h-56 items-end gap-2 sm:gap-3">{data.map((value, index) => <div key={`${title}-${index}`} className="flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-xl ${color} opacity-85 transition hover:opacity-100`} style={{ height: `${(value / max) * 100}%` }} title={`${value}`} /><span className="text-[10px] text-slate-400">{index + 1}</span></div>)}</div></section>;
}
