import ReactAdminFr from 'ra-language-french';

import a11y from './a11y';
import admin from './admin';
import api from './api';
import cta from './cta';
import exercise from './exercise';
import footer from './footer';
import form from './form';
import intro from './intro';
import settings from './settings';

const reactAdminFrOverride = { ...ReactAdminFr };
reactAdminFrOverride.ra.action.show = 'Voir';
reactAdminFrOverride.ra.action.edit = 'Modifier';
reactAdminFrOverride.ra.notification.updated = 'Élément mis à jour avec succès |||| %{smart_count} élements mis à jour avec succès';
reactAdminFrOverride.ra.notification.created = 'Élément créé avec succès';

export default {
  ...reactAdminFrOverride,
  ...admin,
  ...a11y,
  ...cta,
  ...form,
  ...footer,
  ...intro,
  ...exercise,
  ...settings,
  ...api,

  temporaryProfile: {
    label: 'Vous êtes connecté(e) dans une session temporaire',
  },
};
