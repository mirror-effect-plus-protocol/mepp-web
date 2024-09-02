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
        archives: 'Archivi',
        cancelButton: 'Annulla',
        confirmButton: 'Confermare',
        archiveButton: 'Archivio',
        unarchiveButton: 'Annulla l’archiviazione',
        activateButton: 'Abilitare',
        deactivateButton: 'disattivare',
        backButton: 'Indietro',
        exportButton: 'Esportatore',
        card: {
          identity: 'Identificare',
          informations: 'Profilo',
          reset_password: 'Resetta la password',
          create_password: 'Crea la password',
        },
        profile: 'Il mio profilo'
      },
      notifications: {
        archive: {
          success: 'Elemento archiviato con successo',
          failure: 'C’è stato un errore',
        },
        unarchive: {
          success: 'Elemento annullato con successo',
          failure: 'C’è stato un errore',
        },
        activate: {
          success: 'Articolo attivato con successo',
          failure: 'C’è stato un errore',
        },
        deactivate: {
          success: 'Elemento disabilitato con successo',
          failure: 'C’è stato un errore',
        },
        bulkArchive: {
          success: 'Elementi archiviati correttamente',
          failure: 'C’è stato un errore',
        },
        bulkUnarchive: {
          success: 'Elementi annullati con successo',
          failure: 'C’è stato un errore',
        },
        'esportare': {
          start: 'Il download inizierà a breve',
          failure: 'C’è stato un errore',
        },
        mirror: {
          failure: 'C’è stato un errore',
        },
        language: {
          success: 'La tua lingua è stata aggiornata con successo',
          failure: 'Si è verificato un errore, il tuo profilo non è stato aggiornato',
        },
        profile: {
          success: 'Il tuo profilo è stato aggiornato con successo',
        },
      },
      text: {
        cancelDialog: {
          title: 'Sei sicuro di voler annullare?',
          body: 'Tutte le modifiche andranno perse.',
        },
        emailDialog: {
          title: 'E-mail di benvenuto',
          body: 'Vuoi inviare nuovamente l’e-mail?',
        },
      },
      errors: {
        field_required: 'Questo campo è obbligatorio',
        password_mismatch: 'le passwords non corrispondono',
        password_too_short: 'La password deve contenere %{min_length} caratteri',
        password_not_secure: 'La password deve contenere almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale (-_ @$!%*#?&amp;)',
        password_required: 'Questo campo è obbligatorio',
      }
    },
    dashboard: {
      title: 'Benvenuto %{nome}',
      labels: {
        openMirrorButton: 'Specchio facciale aperto'
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frequenze giornaliere raggiunte'
        },
        sessions: {
          card_header: 'Sessioni',
        },
        choices: {
          one_week: 'gli ultimi 7 giorni',
          two_weeks: 'gli ultimi 14 giorni',
          one_month: 'gli ultimi 30 giorni',
          all: 'l’inizio'
        },
        labels: {
          completed: 'Completamente eseguito',
          uncompleted: 'Parzialmente eseguito',
          since: 'Da'
        }
      },
      mirror_dialog: {
        title: 'Specchio facciale aperto',
        labels: {
          autocomplete: 'Scegli un paziente'
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
      name: 'Categoria |||| Categorie',
      fields: {
        'i18n.name.fr': 'Nome',
        'i18n.name': 'Nome'
      },
      labels: {
        category: 'Categoria',
        sub_category: 'Sottocategoria'
      }
    },
    clinicians: {
      name: 'Clinico |||| Medici',
      fields: {
        email: 'E-mail',
        first_name: 'Nome',
        full_name: 'Nome e cognome',
        last_name: 'Nome',
        language: 'Lingua',
        password: 'Parola d’ordine',
        confirm_password: 'Conferma password',
        archived: 'Archivi',
        is_superuser: 'Amministratore'
      },
      list: {
        labels: {
          patients_count: 'Pazienti',
        },
      },
      card: {
        title: {
          default: 'Medico %{placeholder}',
          create: 'Aggiungi un medico'
        },
      },
      delete: {
        confirmTitle: 'Elimina medico %{placeholder}',
      },
      errors: {
        email: 'indirizzo email già in uso'
      },
    },
    exercises: {
      name: 'Esercizio |||| Esercizi',
      fields: {
        archived: 'Archivi',
        'i18n.description.it': 'Descrizione',
        'i18n.description': 'Descrizione',
        movement_duration: 'Durata',
        pause: 'Pausa',
        repetition: 'Prove',
        clinician_uid: 'Clinico',
        category__uid: 'Categoria',
        uid: 'Sottocategoria',
        is_system: 'Sistema',
        sub_categories: 'Categorie e sottocategorie'
      },
      card: {
        title: {
          default: 'Esercizio %{placeholder}',
          create: 'Aggiungi un esercizio'
        },
        labels: {
          definition: 'Caratteristiche',
          classification: 'Classificazione'
        }
      },
      list: {
        labels: {
          user: 'I miei esercizi',
          system: 'Sistema'
        }
      },
      delete: {
        confirmTitle: 'Elimina esercizio %{placeholder}',
      },
      errors: {
        sub_categories: 'Devi scegliere almeno una categoria/sottocategoria',
        gt_zero: 'Deve essere maggiore di zero'
      }
    },
    patients: {
      name: 'Paziente(e) |||| Paziente/i',
      fields: {
        archived: 'Archivi',
        clinician_uid: 'Clinico',
        email: 'E-mail',
        first_name: 'Nome',
        full_name: 'Nome e cognome',
        last_name: 'Nome',
        side: 'Lato paralizzato',
        use_audio: 'Audio attivo',
        language: 'Lingua',
        password: 'Parola d’ordine',
        confirm_password: 'Conferma password',
      },
      card: {
        title: {
          default: 'Paziente(e) %{placeholder}',
          create: 'Aggiungi un paziente'
        },
        labels: {
          plans: 'Piani di intervento',
        },
        plan_dialog: {
          title: 'Aggiungi un piano di intervento',
          labels: {
            autocomplete: 'Nome',
            radio_new: 'Creare un nuovo piano di intervento',
            radio_template: 'Utilizza un modello esistente'
          }
        },
        actions: {
          copy: 'Crea un modello'
        }
      },
      errors: {
        email: 'indirizzo email già in uso'
      },
      filters: {
        last_visited: 'l’ultima visita',
        today: 'Oggi',
        this_week: 'Questa settimana',
        this_month: 'Questo mese'
      },
      shared: {
        side: {
          '0': 'SINISTRA',
          '1': 'Diritto',
        },
        audio: {
          'VERO': 'SÌ',
          'falso': 'Non',
        },
      },
      delete: {
        confirmTitle: 'Elimina paziente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Piano d’azione aggiunto correttamente',
            failure: 'C’è stato un errore',
          },
        },
        email: {
          send: {
            success: 'email inviata correttamente',
            failure: 'C’è stato un errore. Non è stata inviata alcuna email',
          }
        },
      },
    },
    plans: {
      name: 'Piano d’intervento |||| Piani di intervento',
      fields: {
        name: 'Nome',
        'i18n.name.it': 'Nome',
        'i18n.name': 'Nome',
        'i18n.description.it': 'Ulteriori informazioni',
        'i18n.description': 'Ulteriori informazioni',
        clinician_uid: 'Clinico',
        archived: 'Archivi',
        daily_repeat: 'Frequenze giornaliere',
        randomize: 'Ordine casuale',
        is_system: 'Sistema',
        start_date: 'Data d’inizio',
        end_date: 'Data di fine',
        exercise: {
          description: 'Descrizione',
          movement_duration: 'Durata',
          pause: 'Pausa',
          repetition: 'Prove'
        }
      },
      list: {
        labels: {
          exercises_count: 'Esercizi',
          user: 'I miei modelli',
          admin: 'Modelli',
          system: 'Sistema'
        },
      },
      edit: {
        title: 'Piano d’intervento %{placeholder}',
      },
      show: {
        title: 'Piano d’intervento %{placeholder}',
      },
      delete: {
        confirmTitle: 'Elimina piano di intervento %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Aggiungi un esercizio',
          labels: {
            autocomplete: {
              category: 'Categoria',
              sub_category: 'Sottocategoria',
              exercise: 'Descrizione',
              sub_category_empty_label: 'Tutte'
            }
          }
        },
        title: {
          default: 'Piano d’intervento %{placeholder}',
          create: 'Aggiungi un piano di intervento'
        },
        labels: {
          definition: 'Caratteristiche',
          exercises: 'Esercizi',
          is_system_warning: 'Anche tutti gli esercizi associati saranno accessibili al pubblico'
        }
      }
    },
    shared: {
      labels: {
        translate_on_save: 'Questo campo verrà automaticamente tradotto in altre lingue (non inserite manualmente) durante il salvataggio',
        overwrite_existing_translations: 'Sostituisci le traduzioni esistenti'
      }
    }
  },
};
