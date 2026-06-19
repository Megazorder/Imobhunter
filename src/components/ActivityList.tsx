type Activity = { title: string; description: string; time: string };

export function ActivityList({ activities }: { activities: Activity[] }) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="text-lg font-bold text-slate-950 dark:text-white">Atividades recentes</h2><div className="mt-5 space-y-5">{activities.map((activity) => <div key={`${activity.title}-${activity.time}`} className="flex gap-4"><span className="mt-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-950" /><div><p className="font-semibold text-slate-900 dark:text-white">{activity.title}</p><p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p><small className="text-xs font-medium text-blue-600 dark:text-blue-400">{activity.time}</small></div></div>)}</div></section>;
}
