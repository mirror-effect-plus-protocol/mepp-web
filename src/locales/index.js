import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { Language } from '@utils/constants';

import en from './en';
import fr from './fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources: { fr, en },
    react: {
      wait: true,
    },
    detection: {
      order: ['localStorage', 'cookie'],
      lookupLocalStorage: 'language',
    },
  });

export const LANGUAGES = Object.freeze([Language.FR, Language.EN]);
export const languageOptions = Object.freeze([Language.FR, Language.EN]);
export default i18n;
