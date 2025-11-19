import { NavLink } from 'react-router-dom';
import {
  MapIcon,
  ChartPieIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  TrophyIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const navItems = [
  { label: 'Dashboard', href: '/', icon: HomeIcon },
  { label: 'Reports', href: '/reports', icon: ChartPieIcon },
  { label: 'Map', href: '/map', icon: MapIcon },
  { label: 'Rewards', href: '/rewards', icon: TrophyIcon },
  { label: 'Community', href: '/leaderboard', icon: UserGroupIcon },
  { label: 'Admin', href: '/admin', icon: Cog6ToothIcon, roles: ['admin'] },
];

export const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <aside
      className={clsx(
        'w-64 bg-slate-900 text-white min-h-screen flex-col transition-transform duration-200 md:translate-x-0 md:flex',
        sidebarOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'
      )}
    >
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-tight">WasteWise</h1>
        <p className="text-sm text-slate-300">Impact through action</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems
          .filter((item) => !item.roles || item.roles.includes(user?.role))
          .map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
      </nav>
      <div className="px-4 py-4 border-t border-white/10 text-xs text-slate-400">
        © {new Date().getFullYear()} WasteWise Collective
      </div>
    </aside>
  );
};

