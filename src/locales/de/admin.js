/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */

export default {
  admin: {
    shared: {
      labels: {
        archives: 'Archive',
        cancelButton: 'Abbrechen',
        confirmButton: 'Bestätigen',
        archiveButton: 'Archivieren',
        unarchiveButton: 'Entpacken',
        activateButton: 'Aktivieren',
        deactivateButton: 'Deaktivieren',
        backButton: 'Zurück',
        exportButton: 'Exportieren',
        filterButton: 'Filtern',
        card: {
          identity: 'Identität',
          informations: 'Profil',
          reset_password: 'Passwort zurücksetzen',
          create_password: 'Ein Passwort erstellen',
        },
        profile: 'Mein Profil',
      },
      notifications: {
        archive: {
          success: 'Element erfolgreich archiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        unarchive: {
          success: 'Element erfolgreich wiederhergestellt',
          failure: 'Ein Fehler ist aufgetreten',
        },
        activate: {
          success: 'Element erfolgreich aktiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        deactivate: {
          success: 'Element erfolgreich deaktiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        bulkArchive: {
          success: 'Archivierte Elemente erfolgreich',
          failure: 'Ein Fehler ist aufgetreten',
        },
        bulkUnarchive: {
          success: 'Erfolgreich entarchivierte Elemente',
          failure: 'Ein Fehler ist aufgetreten',
        },
        'exportieren': {
          start: 'Der Download wird bald beginnen.',
          failure: 'Ein Fehler ist aufgetreten',
        },
        mirror: {
          failure: 'Ein Fehler ist aufgetreten',
        },
        language: {
          success: 'Ihre Sprache wurde erfolgreich aktualisiert.',
          failure:
            'Ein Fehler ist aufgetreten, Ihr Profil wurde nicht aktualisiert.',
        },
        profile: {
          success: 'Ihr Profil wurde erfolgreich aktualisiert.',
        },
      },
      text: {
        cancelDialog: {
          title: 'Möchten Sie wirklich abbrechen?',
          body: 'Alle Änderungen gehen verloren.',
        },
        emailDialog: {
          title: 'Willkommens-E-Mail',
          body: 'Möchten Sie die E-Mail erneut senden?',
        },
        exerciseFilter: {
          loading: 'Laden...',
          notfound: 'Keine Übung in dieser Kategorie gefunden!',
        },
      },
      errors: {
        field_required: 'Dieses Feld ist erforderlich',
        password_mismatch: 'Die Passwörter stimmen nicht überein',
        password_too_short:
          'Das Passwort muss %{min_length} Zeichen enthalten.',
        password_not_secure:
          'Das Passwort muss mindestens einen Kleinbuchstaben, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (-_ @$!%*#?&) enthalten.',
        password_required: 'Dieses Feld ist erforderlich',
        url_missing_scheme:
          'Das Linkformat scheint nicht gültig zu sein (z. B. https://example.org)',
        gt_zero: 'Muss größer als null sein',
      },
    },
    dashboard: {
      title: 'Willkommen %{name}',
      labels: {
        openMirrorButton: 'Gesichtsspiegel öffnen',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Tägliche Frequenzen erreicht',
        },
        sessions: {
          card_header: 'Sitzungen',
        },
        choices: {
          one_week: 'die letzten 7 Tage',
          two_weeks: 'die letzten 14 Tage',
          one_month: 'die letzten 30 Tage',
          all: 'der Anfang',
        },
        labels: {
          completed: 'Vollständig ausgeführt',
          uncompleted: 'Teilweise ausgeführt',
          since: 'Seit',
        },
      },
      mirror_dialog: {
        title: 'Gesichtsspiegel öffnen',
        labels: {
          autocomplete: 'Wählen Sie einen Patienten',
        },
      },
    },
  },

  languages: {
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
    de: 'Deutsch',
    pt: 'Português',
  },

  resources: {
    articles: {
      name: 'Artikel |||| Artikel',
      fields: {
        'i18n.title': 'Titel',
        'i18n.title.de': 'Titel',
        'i18n.description': 'Beschreibung',
        'i18n.description.de': 'Beschreibung',
        'i18n.external_url': 'Externer Link',
        'i18n.external_url.de': 'Externer Link',
      },
      card: {
        labels: {
          add: 'Artikel hinzufügen',
          more_details: 'Mehr Details',
          title: 'Titel',
          description: 'Beschreibung',
          external_url: 'Externer Link',
        },
      },
      delete: {
        confirmTitle: 'Artikel %{placeholder} löschen',
      },
      errors: {
        i18n: 'Einige Felder sind nicht gültig',
      },
    },
    categories: {
      name: 'Kategorie |||| Kategorien',
      fields: {
        'i18n.name.de': 'Name',
        'i18n.name': 'Name',
      },
      labels: {
        category: 'Kategorie',
      },
    },
    clinicians: {
      name: 'Kliniker(in) |||| Kliniker(innen)',
      fields: {
        email: 'E-Mail',
        first_name: 'Vorname',
        full_name: 'Vollständiger Name',
        last_name: 'Name',
        language: 'Sprache',
        password: 'Passwort',
        confirm_password: 'Bestätigen Sie das Passwort',
        archived: 'Archive',
        is_superuser: 'Administrator',
      },
      list: {
        labels: {
          patients_count: 'Patienten',
        },
      },
      card: {
        title: {
          default: 'Kliniker(in) %{placeholder}',
          create: 'Einen/eine Kliniker/in hinzufügen',
        },
      },
      delete: {
        confirmTitle: 'Den klinischen %{placeholder} entfernen.',
      },
      errors: {
        email: 'E-Mail-Adresse bereits verwendet',
      },
    },
    exercises: {
      name: 'Übung |||| Übungen',
      empty: {
        title: 'Keine Übung',
        description:
          'Bitte wählen Sie eine Kategorie, indem Sie auf die Schaltfläche Filtern klicken.',
      },
      fields: {
        archived: 'Archive',
        'i18n.description.de': 'Beschreibung',
        'i18n.description': 'Beschreibung',
        movement_duration: 'Dauer',
        pause: 'Pause',
        repetition: 'Wiederholungen',
        clinician_uid: 'Kliniker(in)',
        category__uid: 'Kategorie',
        uid: 'Kategorie',
        categories: 'Kategorien',
        empty: {
          categories: {
            label: 'Wählen Sie eine Kategorie',
          },
        },
      },
      card: {
        title: {
          default: 'Übung %{placeholder}',
          create: 'Übung hinzufügen',
        },
        labels: {
          definition: 'Merkmale',
          classification: 'Klassifizierung',
          video: 'Video',
        },
        text: {
          no_video_available: 'Keine Video verfügbar',
        },
      },
      list: {
        labels: {
          user: 'Meine Übungen',
          system: 'System',
        },
      },
      delete: {
        confirmTitle: 'Übung %{placeholder} löschen',
      },
      errors: {
        categories: 'Sie müssen mindestens eine Kategorie auswählen.',
        gt_zero: 'Muss größer als null sein',
        movement_duration: 'Ungültiges Format',
        repetition: 'Ungültiges Format',
        pause: 'Ungültiges Format',
      },
    },
    patients: {
      name: 'Patient(in) |||| Patient(inn)en',
      fields: {
        archived: 'Archive',
        clinician_uid: 'Kliniker(in)',
        email: 'E-Mail',
        first_name: 'Vorname',
        full_name: 'Vollständiger Name',
        last_name: 'Name',
        side: 'Gelähmte Seite',
        use_audio: 'Aktiver Audio',
        has_cognitive_issues: 'Kognitive Probleme',
        language: 'Sprache',
        password: 'Passwort',
        confirm_password: 'Bestätigen Sie das Passwort',
      },
      card: {
        title: {
          default: 'Patient(in) %{placeholder}',
          create: 'Einen Patienten/eine Patientin hinzufügen',
        },
        labels: {
          plans: 'Interventionspläne',
        },
        plan_dialog: {
          title: 'Einen Interventionsplan hinzufügen',
          labels: {
            autocomplete: 'Name',
            radio_new: 'Einen neuen Interventionsplan erstellen',
            radio_template: 'Verwenden Sie eine vorhandene Vorlage',
          },
        },
        actions: {
          copy: 'Ein Modell erstellen',
        },
      },
      errors: {
        email: 'E-Mail-Adresse bereits verwendet',
      },
      filters: {
        last_visited: 'Letzte Besuch',
        today: 'Heute',
        this_week: 'Diese Woche',
        this_month: 'Diesen Monat',
      },
      shared: {
        side: {
          '0': 'Links',
          '1': 'Recht',
        },
        audio: {
          'true': 'Ja',
          'false': 'Nein',
        },
        video: {
          'true': 'Ja',
          'false': 'Nein',
        },
      },
      delete: {
        confirmTitle: 'Patient(en) %{placeholder} löschen',
      },
      notifications: {
        plans: {
          add: {
            success: 'Interventionsplan erfolgreich hinzugefügt',
            failure: 'Ein Fehler ist aufgetreten',
          },
        },
        email: {
          send: {
            success: 'E-Mail erfolgreich gesendet',
            failure:
              'Ein Fehler ist aufgetreten. Es wurde keine E-Mail gesendet.',
          },
        },
      },
    },
    plans: {
      name: 'Interventionsplan |||| Interventionspläne',
      fields: {
        name: 'Name',
        'i18n.name': 'Name',
        'i18n.name.de': 'Name',
        'i18n.description': 'Zusätzliche Informationen',
        'i18n.description.de': 'Zusätzliche Informationen',
        clinician_uid: 'Kliniker(in)',
        archived: 'Archive',
        daily_repeat: 'Tägliche Frequenzen',
        randomize: 'Zufällige Reihenfolge',
        is_system: 'System',
        start_date: 'Startdatum',
        end_date: 'Enddatum',
        exercise: {
          description: 'Beschreibung',
          movement_duration: 'Dauer',
          pause: 'Pause',
          repetition: 'Wiederholungen',
          empty: {
            exercise: {
              label: 'Wählen Sie eine Übung',
            },
          },
        },
      },
      list: {
        labels: {
          exercises_count: 'Übungen',
          user: 'Meine Modelle',
          admin: 'Modelle',
          system: 'System',
        },
      },
      edit: {
        title: 'Interventionsplan %{placeholder}',
      },
      show: {
        title: 'Interventionsplan %{placeholder}',
      },
      delete: {
        confirmTitle: 'Löschen Sie den Interventionsplan %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Übung hinzufügen',
          labels: {
            autocomplete: {
              category: 'Kategorie',
              sub_category: 'Unterkategorie',
              exercise: 'Beschreibung',
              sub_category_empty_label: 'Alle',
            },
          },
        },
        title: {
          default: 'Interventionsplan %{placeholder}',
          create: 'Einen Interventionsplan hinzufügen',
        },
        labels: {
          definition: 'Merkmale',
          exercises: 'Übungen',
        },
      },
      errors: {
        is_system: 'Sie dürfen den Wert von `is_system` nicht ändern',
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'Beim Speichern wird dieses Feld automatisch in Sprachen übersetzt, in denen keine Daten eingegeben wurden',
        overwrite_existing_translations:
          'Ersetzen Sie auch die vorhandenen Übersetzungen.',
        copy_on_save:
          'Beim Speichern wird dieses Feld automatisch in die Sprachen kopiert, für die keine manuelle Eingabe erfolgt ist',
      },
    },
  },
};
