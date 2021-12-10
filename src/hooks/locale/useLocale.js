import i18n from 'i18next';
import { useMemo, useCallback } from 'react';
import { useSetLocale } from 'react-admin';

import { Language } from '@utils/constants';

/** HOOK TO GET/SET LOCALE
 * - set a new locale
 */
const useLocale = () => {
  const localeRAdmin = useSetLocale();

  // current locale
  const locale = useMemo(() => {
    return i18n.language;
  }, [i18n.language]);

  // set new locale
  const setLocale = useCallback(
    (newLocale) => {
      const lang =
        newLocale === Language.FR || newLocale === Language.EN
          ? newLocale
          : Language.FR;
      localeRAdmin(lang);
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    },
    [i18n.language],
  );

  return { locale, setLocale };
};

export { useLocale };
