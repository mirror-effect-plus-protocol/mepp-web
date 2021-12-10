import {
  useTranslate,
} from 'react-admin';
import { LANGUAGES } from '../../../locales';

const Options = () => {

  const t = useTranslate();

  return {
    audio: [
      { id: 'false', name: t('resources.patients.shared.audio.false') },
      { id: 'true', name: t('resources.patients.shared.audio.true') }
    ],

    languages: LANGUAGES.map((language) => (
      { id: language, name: t(`languages.${language}`) }
    )),

    sides: [
      { id: 0, name: t('resources.patients.shared.side.0') },
      { id: 1, name: t('resources.patients.shared.side.1') }
    ]

  };
};

export default Options;

