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
        cancelButton: 'Cancel',
        confirmButton: 'Confirm',
        archiveButton: 'Archive',
        unarchiveButton: 'Restore',
        activateButton: 'Activate',
        deactivateButton: 'Desactivate',
        backButton: 'Back',
        exportButton: 'Export',
        card: {
          identity: 'Identity',
          informations: 'Profile',
          reset_password: 'Reset the password',
          create_password: 'Create the password',
        },
        profile: 'My profile',
      },
      notifications: {
        archive: {
          success: 'Item has been archived successfully',
          failure: 'An error has occurred',
        },
        unarchive: {
          success: 'Item has been restored successfully',
          failure: 'An error has occurred',
        },
        activate: {
          success: 'Item has been activated successfully',
          failure: 'An error has occurred',
        },
        deactivate: {
          success: 'Item has been deactivated successfully',
          failure: 'An error has occurred',
        },
        bulkArchive: {
          success: 'Items have been archived successfully',
          failure: 'An error has occurred',
        },
        bulkUnarchive: {
          success: 'Items have been restored successfully',
          failure: 'An error has occurred',
        },
        'export': {
          start: 'The download still start soon',
          failure: 'An error has occurred',
        },
        mirror: {
          failure: 'An error has occurred',
        },
        language: {
          success: 'Your language has been updated successfully',
          failure: 'An error has occurred. Your profile has not been updated',
        },
        profile: {
          success: 'Your profile has been updated successfully',
        },
      },
      text: {
        cancelDialog: {
          title: 'Are your sure?',
          body: 'All the changes will be lost',
        },
        emailDialog: {
          title: 'Onboarding e-mail',
          body: 'Are you sure you want to send the e-mail again?',
        },
      },
      errors: {
        field_required: 'This field is required',
        password_mismatch: 'Passwords do not match',
        password_too_short: 'Password must be %{min_length} characters long',
        password_not_secure:
          'Password must contain at least one lower case, one upper case one number and one special character (-_ @$!%*#?&)',
        password_required: 'This field is required',
      },
    },
    dashboard: {
      title: 'Welcome %{name}',
      labels: {
        openMirrorButton: 'Open the facial mirror',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Completed repetitions',
        },
        sessions: {
          card_header: 'Sessions',
        },
        choices: {
          one_week: 'the last 7 days',
          two_weeks: 'the last 14 days',
          one_month: 'the last 30 days',
          all: 'all time',
        },
        labels: {
          completed: 'Completed',
          uncompleted: 'Uncompleted',
          since: 'For',
        },
      },
      mirror_dialog: {
        title: 'Open the facial mirror',
        labels: {
          autocomplete: 'Choose a patient',
        },
      },
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
      name: 'Category |||| Categories',
      fields: {
        'i18n.name.en': 'Name',
        'i18n.name': 'Name',
      },
    },
    clinicians: {
      name: 'Clinician |||| Clinicians',
      fields: {
        email: 'E-mail',
        first_name: 'First name',
        full_name: 'Full name',
        last_name: 'Last name',
        language: 'Language',
        password: 'Password',
        confirm_password: 'Confirm the password',
        archived: 'Archives',
        is_superuser: 'Administrator',
      },
      list: {
        labels: {
          patients_count: 'Patients',
        },
      },
      card: {
        title: {
          default: 'Clinician %{placeholder}',
          create: 'Add a clinician',
        },
      },
      delete: {
        confirmTitle: 'Delete the clinician %{placeholder}',
      },
      errors: {
        email: 'E-mail address already in use',
      },
    },
    exercises: {
      name: 'Exercise |||| Exercises',
      empty: {
        title: 'No exercises',
        description:
          'Please filter the categories by clicking on the Filter button',
      },
      fields: {
        archived: 'Archives',
        'i18n.description.en': 'Description',
        'i18n.description': 'Description',
        movement_duration: 'Duration',
        pause: 'Pause',
        repetition: 'Repetitions',
        clinician_uid: 'Clinician',
        category__uid: 'Category',
        uid: 'Sub-category',
        is_system: 'System',
        sub_categories: 'Categories and sub-categories',
      },
      card: {
        title: {
          default: 'Exercise %{placeholder}',
          create: 'Add an exercise',
        },
        labels: {
          definition: 'Definition',
          classification: 'Classification',
        },
      },
      list: {
        labels: {
          user: 'My exercises',
          system: 'System',
        },
      },
      delete: {
        confirmTitle: 'Delete the exercise %{placeholder}',
      },
      errors: {
        sub_categories: 'You must choose at least one category/sub-category',
        gt_zero: 'Must be greater than zero',
      },
    },
    patients: {
      name: 'Patient |||| Patients',
      fields: {
        archived: 'Archives',
        clinician_uid: 'Clinician',
        email: 'E-mail',
        first_name: 'First name',
        full_name: 'Full name',
        last_name: 'Last name',
        side: 'Paralyzed side',
        use_audio: 'Audio on',
        language: 'Language',
        password: 'Password',
        confirm_password: 'Confirm the password',
      },
      card: {
        title: {
          default: 'Patient %{placeholder}',
          create: 'Add a patient',
        },
        labels: {
          plans: 'Treatment plan',
        },
        plan_dialog: {
          title: 'Add a treatment plan',
          labels: {
            autocomplete: 'Name',
            radio_new: 'Create a new treatment plan',
            radio_template: 'Use an existing template',
          },
        },
        actions: {
          copy: 'Create a template',
        },
      },
      errors: {
        email: 'E-mail address already in use',
      },
      filters: {
        last_visited: 'Last visit',
        today: 'Today',
        this_week: 'This week',
        this_month: 'This month',
      },
      shared: {
        side: {
          '0': 'Left',
          '1': 'Right',
        },
        audio: {
          'true': 'Yes',
          'false': 'No',
        },
      },
      delete: {
        confirmTitle: 'Delete the patient %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Treatment plan added successfully',
            failure: 'An error has occurred',
          },
        },
        email: {
          send: {
            success: 'E-mail has been sent successfully',
            failure: 'An error has occurred. No e-mails have been sent',
          },
        },
      },
    },
    plans: {
      name: 'Treatment plan |||| Treatment plans',
      fields: {
        name: 'Name',
        'i18n.name.en': 'Name',
        'i18n.name': 'Name',
        'i18n.description.en': 'Description',
        'i18n.description': 'Description',
        clinician_uid: 'Clinician',
        archived: 'Archives',
        daily_repeat: 'Daily repetitions',
        randomize: 'Random positions',
        is_system: 'System',
        start_date: 'Start date',
        end_date: 'End date',
        exercise: {
          description: 'Description',
          movement_duration: 'Duration',
          pause: 'Pause',
          repetition: 'Repetitions',
        },
      },
      list: {
        labels: {
          exercises_count: 'Exercises',
          user: 'My templates',
          admin: 'Templates',
          system: 'System',
        },
      },
      edit: {
        title: 'Treatment plan %{placeholder}',
      },
      show: {
        title: 'Treatment plan %{placeholder}',
      },
      delete: {
        confirmTitle: 'Delete the treatment plan %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Add an exercise',
          labels: {
            autocomplete: {
              category: 'Category',
              sub_category: 'Sub-category',
              exercise: 'Description',
              sub_category_empty_label: 'All',
            },
          },
        },
        title: {
          default: 'Treatment plan %{placeholder}',
          create: 'Add a treatment plan',
        },
        labels: {
          definition: 'Definition',
          exercises: 'Exercises',
          is_system_warning:
            'All related exercises will be publicly accessible',
        },
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'This field will be automatically translated into other (not manually filled in) languages when saving',
        overwrite_existing_translations: 'Overwrite existing translations',
      },
    },
  },
};
