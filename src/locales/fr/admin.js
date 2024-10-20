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
        archives: 'Archives',
        cancelButton: 'Annuler',
        confirmButton: 'Confirmer',
        archiveButton: 'Archiver',
        unarchiveButton: 'Désarchiver',
        activateButton: 'Activer',
        deactivateButton: 'Désactiver',
        backButton: 'Retour',
        exportButton: 'Exporter',
        card: {
          identity: 'Identité',
          informations: 'Profil',
          reset_password: 'Réinitialiser le mot de passe',
          create_password: 'Créer le mot de passe',
        },
        profile: 'Mon profil'
      },
      notifications: {
        archive: {
          success: 'Élément archivé avec succès',
          failure: 'Une erreur est survenue',
        },
        unarchive: {
          success: 'Élément désarchivé avec succès',
          failure: 'Une erreur est survenue',
        },
        activate: {
          success: 'Élément activé avec succès',
          failure: 'Une erreur est survenue',
        },
        deactivate: {
          success: 'Élément désactivé avec succès',
          failure: 'Une erreur est survenue',
        },
        bulkArchive: {
          success: 'Éléments archivés avec succès',
          failure: 'Une erreur est survenue',
        },
        bulkUnarchive: {
          success: 'Éléments désarchivés avec succès',
          failure: 'Une erreur est survenue',
        },
        'export': {
          start: 'Le téléchargement va commencer bientôt',
          failure: 'Une erreur est survenue',
        },
        mirror: {
          failure: 'Une erreur est survenue',
        },
        language: {
          success: 'Votre langue a été mise à jour avec succès',
          failure: 'Une erreur est survenue, votre profil n’a pas été mis à jour',
        },
        profile: {
          success: 'Votre profil a été mis à jour avec succès',
        },
      },
      text: {
        cancelDialog: {
          title: 'Voulez-vous vraiment annuler?',
          body: 'Tous les changements seront perdus.',
        },
        emailDialog: {
          title: 'Courriel de bienvenue',
          body: 'Voulez-vous renvoyer le courriel?',
        },
      },
      errors: {
        field_required: 'Ce champ est requis',
        password_mismatch: 'Les mots de passe ne correspondent pas',
        password_too_short: 'Le mot de passe doit contenir %{min_length} caractères',
        password_not_secure: 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial (-_ @$!%*#?&)',
        password_required: 'Ce champ est requis',
      }
    },
    dashboard: {
      title: 'Bienvenue %{name}',
      labels: {
        openMirrorButton: 'Ouvrir le miroir facial'
      },
      widgets: {
        daily_repeats: {
          card_header: 'Fréquences quotidiennes atteintes'
        },
        sessions: {
          card_header: 'Séances',
        },
        choices: {
          one_week: 'les 7 derniers jours',
          two_weeks: 'les 14 derniers jours',
          one_month: 'les 30 derniers jours',
          all: 'le début'
        },
        labels: {
          completed: 'Entièrement exécutées',
          uncompleted: 'Partiellement exécutées',
          since: 'Depuis'
        }
      },
      mirror_dialog: {
        title: 'Ouvrir le miroir facial',
        labels: {
          autocomplete: 'Choisir un patient'
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
      name: 'Catégorie |||| Catégories',
      fields: {
        'i18n.name.fr': 'Nom',
        'i18n.name': 'Nom'
      },
      labels: {
        category: 'Catégorie',
        sub_category: 'Sous-catégorie'
      }
    },
    clinicians: {
      name: 'Clinicien(ne) |||| Clinicien(ne)s',
      fields: {
        email: 'Courriel',
        first_name: 'Prénom',
        full_name: 'Nom complet',
        last_name: 'Nom',
        language: 'Langue',
        password: 'Mot de passe',
        confirm_password: 'Confirmer le mot de passe',
        archived: 'Archives',
        is_superuser: 'Administrateur'
      },
      list: {
        labels: {
          patients_count: 'Patients',
        },
      },
      card: {
        title: {
          default: 'Clinicien(ne) %{placeholder}',
          create: 'Ajouter un(e) clinicien(ne)'
        },
      },
      delete: {
        confirmTitle: 'Supprimer le(la) clinicien(ne) %{placeholder}',
      },
      errors: {
        email: 'Adresse courriel déjà utilisée'
      },
    },
    exercises: {
      name: 'Exercice |||| Exercices',
      empty: {
        title: 'Aucun exercice',
        description: 'Veuillez choisir une catégorie en cliquant sur le bouton Filtrer',
      },
      fields: {
        archived: 'Archives',
        'i18n.description.fr': 'Description',
        'i18n.description': 'Description',
        movement_duration: 'Durée',
        pause: 'Pause',
        repetition: 'Répétitions',
        clinician_uid: 'Clinicien(ne)',
        category__uid: 'Catégorie',
        uid: 'Sous-catégorie',
        is_system: 'Système',
        sub_categories: 'Catégories et sous-catégories'
      },
      card: {
        title: {
          default: 'Exercice %{placeholder}',
          create: 'Ajouter un exercice'
        },
        labels: {
          definition: 'Caractéristiques',
          classification: 'Classification',
          video: 'Vidéo'
        },
        text: {
          no_video_available: 'Aucune vidéo disponible'
        }
      },
      list: {
        labels: {
          user: 'Mes exercices',
          system: 'Système'
        }
      },
      delete: {
        confirmTitle: 'Supprimer l’exercice %{placeholder}',
      },
      errors: {
        sub_categories: 'Vous devez choisir au moins une catégorie/sous-catégorie',
        gt_zero: 'Doit être supérieur à zéro'
      }
    },
    patients: {
      name: 'Patient(e) |||| Patient(e)s',
      fields: {
        archived: 'Archives',
        clinician_uid: 'Clinicien(ne)',
        email: 'Courriel',
        first_name: 'Prénom',
        full_name: 'Nom complet',
        last_name: 'Nom',
        side: 'Côté paralysé',
        use_audio: 'Audio actif',
        language: 'Langue',
        password: 'Mot de passe',
        confirm_password: 'Confirmer le mot de passe',
      },
      card: {
        title: {
          default: 'Patient(e) %{placeholder}',
          create: 'Ajouter un(e) patient(e)'
        },
        labels: {
          plans: 'Plans d’intervention',
        },
        plan_dialog: {
          title: 'Ajouter un plan d’intervention',
          labels: {
            autocomplete: 'Nom',
            radio_new: 'Créer un nouveau plan d’intervention',
            radio_template: 'Utiliser un modèle existant'
          }
        },
        actions: {
          copy: 'Créer un modèle'
        }
      },
      errors: {
        email: 'Adresse courriel déjà utilisée'
      },
      filters: {
        last_visited: 'Dernière visite',
        today: 'Aujourd’hui',
        this_week: 'Cette semaine',
        this_month: 'Ce mois-ci'
      },
      shared: {
        side: {
          '0': 'Gauche',
          '1': 'Droit',
        },
        audio: {
          'true': 'Oui',
          'false': 'Non',
        },
      },
      delete: {
        confirmTitle: 'Supprimer le(la) patient(e) %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Plan d’intervention ajouté avec succès',
            failure: 'Une erreur est survenue',
          },
        },
        email: {
          send: {
            success: 'Courriel envoyé avec succès',
            failure: 'Une erreur est survenue. Aucun courriel n’a été envoyé',
          }
        },
      },
    },
    plans: {
      name: 'Plan d’intervention |||| Plans d’intervention',
      fields: {
        name: 'Nom',
        'i18n.name.fr': 'Nom',
        'i18n.name': 'Nom',
        'i18n.description.fr': 'Complément d’informations',
        'i18n.description': 'Complément d’informations',
        clinician_uid: 'Clinicien(ne)',
        archived: 'Archives',
        daily_repeat: 'Fréquences quotidiennes',
        randomize: 'Ordre aléatoire',
        is_system: 'Système',
        start_date: 'Date de début',
        end_date: 'Date de fin',
        exercise: {
          description: 'Description',
          movement_duration: 'Durée',
          pause: 'Pause',
          repetition: 'Répétitions'
        }
      },
      list: {
        labels: {
          exercises_count: 'Exercices',
          user: 'Mes modèles',
          admin: 'Modèles',
          system: 'Système'
        },
      },
      edit: {
        title: 'Plan d’intervention %{placeholder}',
      },
      show: {
        title: 'Plan d’intervention %{placeholder}',
      },
      delete: {
        confirmTitle: 'Supprimer le plan d’intervention %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Ajouter un exercice',
          labels: {
            autocomplete: {
              category: 'Catégorie',
              sub_category: 'Sous-catégorie',
              exercise: 'Description',
              sub_category_empty_label: 'Toutes'
            }
          }
        },
        title: {
          default: 'Plan d’intervention %{placeholder}',
          create: 'Ajouter un plan d’intervention'
        },
        labels: {
          definition: 'Caractéristiques',
          exercises: 'Exercices',
          is_system_warning: 'Tous les exercices associés seront aussi publiquement accessibles'
        }
      }
    },
    shared: {
      labels: {
        translate_on_save: 'Ce champ sera traduit automatique dans les autres (non manuellement renseignées) langues  lors de la sauvegarde',
        overwrite_existing_translations: 'Remplacer les traductions existantes'
      }
    }
  },
};
