import { useDispatch, useSelector } from 'react-redux';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { setTheme } from '@/features/ui/uiSlice';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
  };

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-slate-200 bg-white p-2 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-amber-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary-500" />
      )}
    </button>
  );
};

