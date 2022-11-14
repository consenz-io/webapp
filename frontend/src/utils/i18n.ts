import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar, en, he } from 'strings';

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: ar,
    },
    en: {
      translation: en,
    },
    he: {
      translation: he,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});
