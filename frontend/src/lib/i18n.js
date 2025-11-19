import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome back, {{name}}',
      totalRewards: 'Total Rewards',
      reportsSubmitted: 'Reports Submitted',
      lottery: 'Weekly Lottery',
      streak: 'Daily streak',
    },
  },
  fr: {
    translation: {
      welcome: 'Bon retour, {{name}}',
      totalRewards: 'Récompenses totales',
      reportsSubmitted: 'Rapports soumis',
      lottery: 'Loterie hebdomadaire',
      streak: 'Série quotidienne',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido, {{name}}',
      totalRewards: 'Recompensas totales',
      reportsSubmitted: 'Reportes enviados',
      lottery: 'Lotería semanal',
      streak: 'Racha diaria',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

