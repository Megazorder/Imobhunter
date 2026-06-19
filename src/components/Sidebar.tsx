import { ChevronLeft, Menu } from 'lucide-react';
import { menuItems } from '../data/dashboard';

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
};

export function Sidebar({ collapsed, mobileOpen, onToggle, onCloseMobile }: SidebarProps) {
  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-2xl bg-white p-3 text-slate-700 shadow-lg dark:bg-slate-900 dark:text-slate-100 lg:hidden"
        onClick={onCloseMobile}
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </button>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={onCloseMobile} aria-label="Fechar menu" />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200/70 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/90 ${collapsed ? 'lg:w-24' : 'lg:w-72'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-72`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">IH</div>
            {!collapsed && <div><p className="font-bold text-slate-950 dark:text-white">ImobHunter</p><p className="text-xs text-slate-500">Admin Suite</p></div>}
          </div>
          <button className="hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:block" onClick={onToggle} aria-label="Recolher sidebar">
            <ChevronLeft className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-2 px-4 py-4">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300">
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
