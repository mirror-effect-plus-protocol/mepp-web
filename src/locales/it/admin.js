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
        archives: 'Archivio',
        cancelButton: 'Annulla',
        confirmButton: 'Confermare',
        archiveButton: 'Archiviare',
        unarchiveButton: 'Estrarre',
        activateButton: 'Attivare',
        deactivateButton: 'Disattivare',
        backButton: 'Ritorna',
        exportButton: 'Esporta',
        filterButton: 'Filtrare',
        resetFilterButton: 'Reimposta',
        card: {
          identity: 'Identità',
          informations: 'Profilo',
          instructions: 'Istruzioni per gli esercizi',
          reset_password: 'Reimposta la password',
          create_password: 'Crea la password',
        },
        modal: {
          title: {
            category_filter: 'Si prega di scegliere una categoria',
            exercise_filter: 'Seleziona prima una categoria'
          }
        },
        profile: 'Il mio profilo',
      },
      notifications: {
        archive: {
          success: 'Elemento archiviato con successo',
          failure: 'Si è verificato un errore',
        },
        unarchive: {
          success: 'Elemento dearchiviato con successo',
          failure: 'Si è verificato un errore',
        },
        activate: {
          success: 'Elemento attivato con successo',
          failure: 'Si è verificato un errore',
        },
        deactivate: {
          success: 'Elemento disattivato con successo',
          failure: 'Si è verificato un errore',
        },
        bulkArchive: {
          success: 'Elementi archiviati con successo',
          failure: 'Si è verificato un errore',
        },
        bulkUnarchive: {
          success: 'Elementi dearchiviati con successo',
          failure: 'Si è verificato un errore',
        },
        export: {
          start: 'Il download inizierà a breve.',
          failure: 'Si è verificato un errore',
        },
        mirror: {
          failure: 'Si è verificato un errore',
        },
        language: {
          success: 'La tua lingua è stata aggiornata con successo.',
          failure:
            'Si è verificato un errore, il tuo profilo non è stato aggiornato.',
        },
        profile: {
          success: 'Il tuo profilo è stato aggiornato con successo.',
        },
      },
      text: {
        cancelDialog: {
          title: 'Vuoi davvero annullare?',
          body: 'Tutte le modifiche saranno perse.',
        },
        emailDialog: {
          title: 'Email di benvenuto',
          body: 'Vuoi rinviare l’e-mail?',
        },
        exerciseFilter: {
          loading: 'Caricamento in corso...',
          notfound: 'Nessun esercizio trovato in questa categoria!',
        },
      },
      errors: {
        field_required: 'Questo campo è obbligatorio',
        password_mismatch: 'Le password non corrispondono.',
        password_too_short:
          'La password deve contenere %{min_length} caratteri.',
        password_not_secure:
          'La password deve contenere almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale (-_ @$!%*#?&)',
        password_required: 'Questo campo è obbligatorio',
        url_missing_scheme:
          'Il formato del link non sembra valido (es.: https://example.org)',
        gt_zero: 'Deve essere maggiore di zero',
      },
    },
    dashboard: {
      title: 'Benvenuto %{name}',
      labels: {
        openMirrorButton: 'Apri lo specchio facciale',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frequenze quotidiane raggiunte',
        },
        sessions: {
          card_header: 'Sessioni',
        },
        choices: {
          one_week: 'gli ultimi 7 giorni',
          two_weeks: 'gli ultimi 14 giorni',
          one_month: 'gli ultimi 30 giorni',
          all: 'l’inizio',
        },
        labels: {
          completed: 'Completamente eseguite',
          uncompleted: 'Parzialmente eseguite',
          since: 'Da',
        },
      },
      mirror_dialog: {
        title: 'Apri lo specchio facciale',
        labels: {
          autocomplete: 'Scegliere un paziente',
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
      name: 'Articolo |||| Articoli',
      fields: {
        'i18n.title': 'Titolo',
        'i18n.title.it': 'Titolo',
        'i18n.description.it': 'Descrizione',
        'i18n.description': 'Descrizione',
        'i18n.external_url': 'Collegamento esterno',
        'i18n.external_url.it': 'Collegamento esterno',
      },
      card: {
        labels: {
          add: 'Aggiungi un articolo',
          more_details: 'Maggiore dettaglio',
          title: 'Titolo',
          description: 'Descrizione',
          external_url: 'Collegamento esterno',
        },
      },
      delete: {
        confirmTitle: 'Elimina l’articolo %{placeholder}',
      },
      errors: {
        i18n: 'Alcuni campi non sono validi',
      },
    },
    categories: {
      name: 'Categoria |||| Categorie',
      fields: {
        'i18n.name': 'Nome',
        'i18n.name.it': 'Nome',
      },
      labels: {
        category: 'Categoria',
      },
    },
    clinicians: {
      name: 'Clinico(a) |||| Clinici(e)',
      fields: {
        email: 'Email',
        first_name: 'Nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        language: 'Lingua',
        password: 'Password',
        confirm_password: 'Conferma la password',
        archived: 'Archivio',
        is_superuser: 'Amministratore',
      },
      list: {
        labels: {
          patients_count: 'Pazienti',
        },
      },
      card: {
        title: {
          default: 'Clinico(a) %{placeholder}',
          create: 'Aggiungere un(a) clinico(a)',
        },
      },
      delete: {
        confirmTitle: 'Eliminare il(la) clinico(a) %{placeholder}',
      },
      errors: {
        email: 'Indirizzo email già utilizzato',
      },
    },
    exercises: {
      name: 'Esercizio |||| Esercizi',
      empty: {
        title: 'Nessun esercizio',
        description:
          'Si prega di scegliere una categoria facendo clic sul pulsante Filtra.',
      },
      fields: {
        archived: 'Archivio',
        'i18n.description': 'Descrizione',
        'i18n.description.it': 'Descrizione',
        movement_duration: 'Durata',
        pause: 'Pausa',
        repetition: 'Ripetizioni',
        clinician_uid: 'Clinico(a)',
        category__uid: 'Categoria',
        uid: 'Categoria',
        categories: 'Categorie',
        empty: {
          categories: {
            label: 'Scegliere una categoria',
          },
        },
      },
      card: {
        title: {
          default: 'Esercizio %{placeholder}',
          create: 'Aggiungere un esercizio',
        },
        labels: {
          definition: 'Caratteristiche',
          classification: 'Classificazione',
          video: 'Video',
        },
        text: {
          no_video_available: 'Nessun video disponibile',
        },
      },
      list: {
        labels: {
          user: 'I miei esercizi',
          system: 'Sistema',
        },
      },
      delete: {
        confirmTitle: 'Elimina l’esercizio %{placeholder}',
      },
      errors: {
        categories: 'Devi scegliere almeno una categoria.',
        gt_zero: 'Deve essere superiore a zero',
        movement_duration: 'Formato non valido',
        repetition: 'Formato non valido',
        pause: 'Formato non valido',
      },
    },
    patients: {
      name: 'Paziente |||| Pazienti',
      fields: {
        archived: 'Archivio',
        clinician_uid: 'Clinico(a)',
        email: 'Email',
        first_name: 'Nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        side: 'Lato paralizzato',
        use_audio: 'Testo in voce su iOS',
        use_video_only: 'Solo video',
        language: 'Lingua',
        password: 'Password',
        confirm_password: 'Conferma la password',
      },
      card: {
        title: {
          default: 'Paziente %{placeholder}',
          create: 'Aggiungere un(a) paziente(a)',
        },
        labels: {
          plans: 'Piani di intervento',
        },
        plan_dialog: {
          title: 'Aggiungere un piano di intervento',
          labels: {
            autocomplete: 'Nome',
            radio_new: 'Creare un nuovo piano di intervento',
            radio_template: 'Utilizzare un modello esistente',
          },
        },
        actions: {
          copy: 'Creare un modello',
        },
      },
      errors: {
        email: 'Indirizzo email già utilizzato',
      },
      filters: {
        last_visited: 'Ultima visita',
        today: 'Oggi',
        this_week: 'Questa settimana',
        this_month: 'Questo mese',
      },
      shared: {
        side: {
          '0': 'Sinistro',
          '1': 'Destro',
        },
        audio: {
          'true': 'Sì',
          'false': 'No',
        },
        video: {
          'true': 'Sì',
          'false': 'No',
        },
      },
      delete: {
        confirmTitle: 'Eliminare il(la) paziente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Piano di intervento aggiunto con successo',
            failure: 'Si è verificato un errore',
          },
        },
        email: {
          send: {
            success: 'Email inviato con successo',
            failure:
              'Si è verificato un errore. Nessuna email è stata inviata.',
          },
        },
      },
    },
    plans: {
      name: 'Piano di intervento |||| Piani di intervento',
      fields: {
        name: 'Nome',
        'i18n.name': 'Nome',
        'i18n.name.it': 'Nome',
        'i18n.description': 'Ulteriori informazioni',
        'i18n.description.it': 'Ulteriori informazioni',
        clinician_uid: 'Clinico(a)',
        archived: 'Archivio',
        daily_repeat: 'Frequenze quotidiane',
        randomize: 'Ordine casuale',
        is_system: 'Sistema',
        start_date: 'Data di inizio',
        end_date: 'Data di fine',
        exercise: {
          description: 'Descrizione',
          movement_duration: 'Durata',
          pause: 'Pausa',
          repetition: 'Ripetizioni',
          empty: {
            exercise: {
              label: 'Scegliere un esercizio',
            },
          },
        },
      },
      list: {
        labels: {
          exercises_count: 'Esercizi',
          user: 'I miei modelli',
          admin: 'Modelli',
          system: 'Sistema',
        },
      },
      edit: {
        title: 'Piano di intervento %{placeholder}',
      },
      show: {
        title: 'Piano di intervento %{placeholder}',
      },
      delete: {
        confirmTitle: 'Elimina il piano di intervento %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Aggiungere un esercizio',
        },
        title: {
          default: 'Piano di intervento %{placeholder}',
          create: 'Aggiungere un piano di intervento',
        },
        labels: {
          definition: 'Caratteristiche',
          exercises: 'Esercizi',
        },
      },
      errors: {
        is_system: 'Non sei autorizzato a modificare il valore di `is_system`',
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'Al salvataggio, questo campo verrà tradotto automaticamente nelle lingue in cui non sono stati inseriti dati',
        overwrite_existing_translations:
          'Sostituire anche le traduzioni esistenti',
        copy_on_save:
          'Ao salvar, este campo será traduzido automaticamente para os idiomas onde nenhum dado foi inserido',
      },
    },
  },
};
