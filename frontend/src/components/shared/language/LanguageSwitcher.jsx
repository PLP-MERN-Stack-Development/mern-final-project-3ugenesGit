import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/features/ui/uiSlice';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
];

export const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLanguage = useSelector((state) => state.ui.language);

  const changeLanguage = (code) => {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex rounded-full border border-slate-200 bg-white text-xs font-semibold overflow-hidden">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-2 py-1 ${currentLanguage === lang.code ? 'bg-primary-500 text-white' : 'text-slate-600'}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

