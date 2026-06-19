import { Bell, LogOut, Moon, Search, Sun, UserCircle } from 'lucide-react';

type HeaderProps = { darkMode: boolean; onToggleTheme: () => void };

export function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-slate-50/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="ml-16 lg:ml-0"><p className="text-sm text-slate-500 dark:text-slate-400">Bem-vindo de volta,</p><h1 className="text-2xl font-bold text-slate-950 dark:text-white">Lucas Andrade · Prime Realty</h1></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1 sm:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white" placeholder="Pesquisar imóveis, clientes ou leads" /></label>
          <button onClick={onToggleTheme} className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200" aria-label="Alternar tema">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200" aria-label="Notificações"><Bell size={20} /><span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" /></button>
          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900"><div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white">LA</div><span className="hidden text-left text-sm sm:block"><strong className="block text-slate-900 dark:text-white">Lucas Andrade</strong><small className="text-slate-500">Administrador</small></span><UserCircle className="text-slate-400" size={18} /></button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950"><LogOut size={18} /> Logout</button>
        </div>
      </div>
    </header>
  );
}
