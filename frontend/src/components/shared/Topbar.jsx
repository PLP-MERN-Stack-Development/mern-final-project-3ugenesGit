import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleSidebar, toggleNotifications } from '@/features/ui/uiSlice';
import { LanguageSwitcher } from './language/LanguageSwitcher';
import { ThemeToggle } from './theme/ThemeToggle';
import { useNotifications } from '@/hooks/useNotifications';

export const Topbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { data: notifications = [] } = useNotifications({ enabled: Boolean(token) });
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden rounded-lg border border-slate-200 p-2"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Bars3Icon className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">{t('welcome', { name: user?.name || 'Eco hero' })}</p>
          <h2 className="text-lg font-semibold text-slate-900">Impact dashboard</h2>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          className="relative rounded-full border border-slate-200 p-2"
          onClick={() => dispatch(toggleNotifications())}
        >
          <BellIcon className="h-5 w-5 text-slate-600" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
              {unread}
            </span>
          )}
        </button>
        <div className="h-9 w-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold uppercase">
          {user?.name?.[0] || 'W'}
        </div>
      </div>
    </header>
  );
};

