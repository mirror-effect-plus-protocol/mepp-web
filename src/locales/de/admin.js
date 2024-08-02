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
        archives: 'Archiv',
        cancelButton: 'Stornieren',
        confirmButton: 'Bestätigen',
        archiveButton: 'Archiv',
        unarchiveButton: 'Dearchivieren',
        activateButton: 'Aktivieren',
        deactivateButton: 'Deaktivieren',
        backButton: 'Zurück',
        exportButton: 'Exporteur',
        card: {
          identity: 'Identifizieren',
          informations: 'Profil',
          reset_password: 'Passwort zurücksetzen',
          create_password: 'Erstellen Sie das Passwort',
        },
        profile: 'Mein Profil'
      },
      notifications: {
        archive: {
          success: 'Artikel erfolgreich archiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        unarchive: {
          success: 'Artikel erfolgreich dearchiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        activate: {
          success: 'Artikel erfolgreich aktiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        deactivate: {
          success: 'Artikel erfolgreich deaktiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        bulkArchive: {
          success: 'Elemente erfolgreich archiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        bulkUnarchive: {
          success: 'Elemente erfolgreich dearchiviert',
          failure: 'Ein Fehler ist aufgetreten',
        },
        'Export': {
          start: 'Der Download beginnt bald',
          failure: 'Ein Fehler ist aufgetreten',
        },
        mirror: {
          failure: 'Ein Fehler ist aufgetreten',
        },
        language: {
          success: 'Ihre Sprache wurde erfolgreich aktualisiert',
          failure: 'Es ist ein Fehler aufgetreten, Ihr Profil wurde nicht aktualisiert',
        },
        profile: {
          success: 'Dein Profil wurde erfolgreich aktualisiert',
        },
      },
      text: {
        cancelDialog: {
          title: 'Bist du sicher, dass du abbrechen möchtest?',
          body: 'Alle Änderungen gehen verloren.',
        },
        emailDialog: {
          title: 'Willkommens-E-Mail',
          body: 'Möchten Sie die E-Mail erneut senden?',
        },
      },
      errors: {
        field_required: 'Dieses Feld ist erforderlich',
        password_mismatch: 'Passwörter stimmen nicht überein',
        password_too_short: 'Das Passwort muss %{min_length} Zeichen enthalten',
        password_not_secure: 'Das Passwort muss mindestens einen Kleinbuchstaben, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (-_ @$!%*#?&amp;) enthalten.',
        password_required: 'Dieses Feld ist erforderlich',
      }
    },
    dashboard: {
      title: 'Willkommen %{name}',
      labels: {
        openMirrorButton: 'Offener Spiegel'
      },
      widgets: {
        daily_repeats: {
          card_header: 'Tägliche Frequenzen erreicht'
        },
        sessions: {
          card_header: 'Offene Sitzungen',
        },
        choices: {
          one_week: 'die letzten 7 Tage',
          two_weeks: 'die letzten 14 Tage',
          one_month: 'die letzten 30 Tage',
          all: 'der Anfang'
        },
        labels: {
          completed: 'Vollständig ausgeführt',
          uncompleted: 'Teilweise ausgeführt',
          since: 'Aus'
        }
      },
      mirror_dialog: {
        title: 'Offener Spiegel',
        labels: {
          autocomplete: 'Wählen Sie einen Patienten'
        }
      }
    },
  },

  languages: {
    'en': 'English',
    'fr': 'Français',
    'it': 'Italiano',
    'es': 'Español',
    'de': 'Deutsch',
    'pt': 'Português',
  },

  resources: {
    categories: {
      name: 'Kategorie |||| Kategorien',
      fields: {
        'i18n.name.fr': 'Name',
        'i18n.name': 'Name'
      },
      labels: {
        category: 'Kategorie',
        sub_category: 'Unterkategorie'
      }
    },
    clinicians: {
      name: 'Kliniker |||| Kliniker',
      fields: {
        email: 'Email',
        first_name: 'Vorname',
        full_name: 'Vollständiger Name',
        last_name: 'Name',
        language: 'Sprache',
        password: 'Passwort',
        confirm_password: 'Bestätige das Passwort',
        archived: 'Archiv',
        is_superuser: 'Administrator'
      },
      list: {
        labels: {
          patients_count: 'Patienten',
        },
      },
      card: {
        title: {
          default: 'Kliniker %{placeholder}',
          create: 'Fügen Sie einen Arzt hinzu'
        },
      },
      delete: {
        confirmTitle: 'Kliniker %{placeholder} löschen',
      },
      errors: {
        email: 'E-Mail-Adresse wird schon verwendet'
      },
    },
    exercises: {
      name: 'Übung |||| Übungen',
      fields: {
        archived: 'Archiv',
        'i18n.description.fr': 'Beschreibung',
        'i18n.Beschreibung': 'Beschreibung',
        movement_duration: 'Dauer',
        pause: 'Pause',
        repetition: 'Proben',
        clinician_uid: 'Kliniker',
        category__uid: 'Kategorie',
        uid: 'Unterkategorie',
        is_system: 'System',
        sub_categories: 'Kategorien und Unterkategorien'
      },
      card: {
        title: {
          default: 'Übung %{placeholder}',
          create: 'Fügen Sie eine Übung hinzu'
        },
        labels: {
          definition: 'Merkmale',
          classification: 'Einstufung'
        }
      },
      list: {
        labels: {
          user: 'Meine Übungen',
          system: 'System'
        }
      },
      delete: {
        confirmTitle: 'Übung %{placeholder} löschen',
      },
      errors: {
        sub_categories: 'Sie müssen mindestens eine Kategorie/Unterkategorie auswählen',
        gt_zero: 'Muss größer als Null sein'
      }
    },
    patients: {
      name: 'Patient(en) |||| Patient(en)',
      fields: {
        archived: 'Archiv',
        clinician_uid: 'Kliniker',
        email: 'Email',
        first_name: 'Vorname',
        full_name: 'Vollständiger Name',
        last_name: 'Name',
        side: 'Gelähmte Seite',
        use_audio: 'Aktives Audio',
        language: 'Sprache',
        password: 'Passwort',
        confirm_password: 'Bestätige das Passwort',
      },
      card: {
        title: {
          default: 'Patient(in) %{placeholder}',
          create: 'Fügen Sie einen Patienten hinzu'
        },
        labels: {
          plans: 'Interventionspläne',
        },
        plan_dialog: {
          title: 'Fügen Sie einen Interventionsplan hinzu',
          labels: {
            autocomplete: 'Name',
            radio_new: 'Erstellen Sie einen neuen Interventionsplan',
            radio_template: 'Verwenden Sie eine vorhandene Vorlage'
          }
        },
        actions: {
          copy: 'Erstellen Sie eine Vorlage'
        }
      },
      errors: {
        email: 'E-Mail-Adresse wird schon verwendet'
      },
      filters: {
        last_visited: 'letzter Besuch',
        today: 'Heute',
        this_week: 'Diese Woche',
        this_month: 'Diesen Monat'
      },
      shared: {
        side: {
          '0': 'LINKS',
          '1': 'Rechts',
        },
        audio: {
          'WAHR': 'Ja',
          'FALSCH': 'Nicht',
        },
      },
      delete: {
        confirmTitle: 'Patient %{placeholder} löschen',
      },
      notifications: {
        plans: {
          add: {
            success: 'Aktionsplan erfolgreich hinzugefügt',
            failure: 'Ein Fehler ist aufgetreten',
          },
        },
        email: {
          send: {
            success: 'Email wurde erfolgreich Versendet',
            failure: 'Ein Fehler ist aufgetreten. Es wurde keine E-Mail gesendet',
          }
        },
      },
    },
    plans: {
      name: 'Interventionsplan |||| Interventionspläne',
      fields: {
        name: 'Name',
        'i18n.name.fr': 'Name',
        'i18n.name': 'Name',
        'i18n.description.fr': 'Zusatzinformation',
        'i18n.Beschreibung': 'Zusatzinformation',
        clinician_uid: 'Kliniker',
        archived: 'Archiv',
        daily_repeat: 'Tägliche Frequenzen',
        randomize: 'Zufällige Reihenfolge',
        is_system: 'System',
        start_date: 'Startdatum',
        end_date: 'Endtermin',
        exercise: {
          description: 'Beschreibung',
          movement_duration: 'Dauer',
          pause: 'Pause',
          repetition: 'Proben'
        }
      },
      list: {
        labels: {
          exercises_count: 'Übungen',
          user: 'Meine Modelle',
          admin: 'Modelle',
          system: 'System'
        },
      },
      edit: {
        title: 'Interventionsplan %{placeholder}',
      },
      show: {
        title: 'Interventionsplan %{placeholder}',
      },
      delete: {
        confirmTitle: 'Interventionsplan %{placeholder} löschen',
      },
      card: {
        exercise_dialog: {
          title: 'Fügen Sie eine Übung hinzu',
          labels: {
            autocomplete: {
              category: 'Kategorie',
              sub_category: 'Unterkategorie',
              exercise: 'Beschreibung',
              sub_category_empty_label: 'Alle'
            }
          }
        },
        title: {
          default: 'Interventionsplan %{placeholder}',
          create: 'Fügen Sie einen Interventionsplan hinzu'
        },
        labels: {
          definition: 'Merkmale',
          exercises: 'Übungen',
          is_system_warning: 'Alle dazugehörigen Übungen werden auch öffentlich zugänglich sein'
        }
      }
    },
    shared: {
      labels: {
        translate_on_save: 'Dieses Feld wird beim Speichern automatisch in andere (nicht manuell eingegebene) Sprachen übersetzt',
        overwrite_existing_translations: 'Ersetzen Sie vorhandene Übersetzungen'
      }
    }
  },
};
