import { Building2, LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/settings', label: 'Configurações', icon: Settings },
];

export function AdminLayout() {
  const { signOut, user } = useAuth();
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="hidden border-r bg-card lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6 font-semibold">
          <Building2 className="h-5 w-5" /> ImobHunter
        </div>
        <nav className="space-y-1 p-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary',
                  isActive && 'bg-secondary font-medium',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Menu className="h-5 w-5 lg:hidden" />
            <span className="font-semibold lg:hidden">ImobHunter</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden sm:inline">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
