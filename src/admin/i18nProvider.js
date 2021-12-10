import i18n from 'locales';
import en from 'locales/en';
import fr from 'locales/fr';
import polyglotI18nProvider from 'ra-i18n-polyglot';

export default polyglotI18nProvider((locale) => {
  localStorage.setItem('language', locale);
  if (locale === 'en') {
    return en;
  }
  return fr;
}, i18n.language);
