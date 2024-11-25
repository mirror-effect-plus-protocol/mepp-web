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
        unarchiveButton: 'Unarchive',
        activateButton: 'Activate',
        deactivateButton: 'Disable',
        backButton: 'Back',
        exportButton: 'Export',
        filterButton: 'Filter',
        resetFilterButton: 'Reset',
        card: {
          identity: 'Identity',
          informations: 'Profile',
          instructions: 'Instructions for exercises',
          reset_password: 'Reset the password',
          create_password: 'Create the password',
        },
        profile: 'My profile',
      },
      notifications: {
        archive: {
          success: 'Element archived successfully',
          failure: 'An error has occurred.',
        },
        unarchive: {
          success: 'Successfully unarchived item',
          failure: 'An error has occurred.',
        },
        activate: {
          success: 'Element successfully activated',
          failure: 'An error has occurred.',
        },
        deactivate: {
          success: 'Element successfully disabled',
          failure: 'An error has occurred.',
        },
        bulkArchive: {
          success: 'Elements archived successfully',
          failure: 'An error has occurred.',
        },
        bulkUnarchive: {
          success: 'Successfully unarchived items',
          failure: 'An error has occurred.',
        },
        'export': {
          start: 'The download will start soon.',
          failure: 'An error has occurred.',
        },
        mirror: {
          failure: 'An error has occurred.',
        },
        language: {
          success: 'Your language has been successfully updated.',
          failure: 'An error occurred, your profile has not been updated.',
        },
        profile: {
          success: 'Your profile has been successfully updated.',
        },
      },
      text: {
        cancelDialog: {
          title: 'Do you really want to cancel?',
          body: 'All changes will be lost.',
        },
        emailDialog: {
          title: 'Welcome email',
          body: 'Do you want to resend the email?',
        },
        exerciseFilter: {
          loading: 'Loading...',
          notfound: 'No exercise found in this category!',
        },
      },
      errors: {
        field_required: 'This field is required.',
        password_mismatch: 'The passwords do not match.',
        password_too_short:
          'The password must contain %{min_length} characters.',
        password_not_secure:
          'The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (-_ @$!%*#?&)',
        password_required: 'This field is required.',
        url_missing_scheme:
          "The link format doesn't seem valid (e.g., https://example.org)",
        gt_zero: 'Must be greater than zero',
      },
    },
    dashboard: {
      title: 'Welcome %{name}',
      labels: {
        openMirrorButton: 'Open the face mirror',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Daily frequencies reached',
        },
        sessions: {
          card_header: 'Sessions',
        },
        choices: {
          one_week: 'the last 7 days',
          two_weeks: 'the last 14 days',
          one_month: 'the last 30 days',
          all: 'the beginning',
        },
        labels: {
          completed: 'Fully executed',
          uncompleted: 'Partially executed',
          since: 'Since',
        },
      },
      mirror_dialog: {
        title: 'Open the face mirror',
        labels: {
          autocomplete: 'Choose a patient',
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
      name: 'Article |||| Articles',
      fields: {
        'i18n.title': 'Title',
        'i18n.title.en': 'Title',
        'i18n.description': 'Description',
        'i18n.description.en': 'Description',
        'i18n.external_url': 'External link',
        'i18n.external_url.en': 'External link',
      },
      card: {
        labels: {
          add: 'Add an item',
          more_details: 'More details',
          title: 'Title',
          description: 'Description',
          external_url: 'External link',
        },
      },
      delete: {
        confirmTitle: 'Delete the article %{placeholder}',
      },
      errors: {
        i18n: 'Some fields are not valid',
      },
    },
    categories: {
      name: 'Category |||| Categories',
      fields: {
        'i18n.name.en': 'Name',
        'i18n.name': 'Name',
      },
      labels: {
        category: 'Category',
      },
    },
    clinicians: {
      name: 'Clinician |||| Clinicians',
      fields: {
        email: 'Email',
        first_name: 'First name',
        full_name: 'Full name',
        last_name: 'Name',
        language: 'Language',
        password: 'Password',
        confirm_password: 'Confirm password',
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
        email: 'Email address already in use',
      },
    },
    exercises: {
      name: 'Exercise |||| Exercises',
      empty: {
        title: 'No exercise',
        description:
          'Please choose a category by clicking on the Filter button.',
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
        uid: 'Category',
        categories: 'Categories',
        empty: {
          categories: {
            label: 'Choose a category',
          },
        },
      },
      card: {
        title: {
          default: 'Exercise %{placeholder}',
          create: 'Add an exercise',
        },
        labels: {
          definition: 'Features',
          classification: 'Classification',
          video: 'Video',
        },
        text: {
          no_video_available: 'No video available',
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
        categories: 'You must select at least one category.',
        gt_zero: 'Must be greater than zero',
        movement_duration: 'Invalid format',
        repetition: 'Invalid format',
        pause: 'Invalid format',
      },
    },
    patients: {
      name: 'Patient |||| Patients',
      fields: {
        archived: 'Archives',
        clinician_uid: 'Clinician',
        email: 'Email',
        first_name: 'First name',
        full_name: 'Full name',
        last_name: 'Name',
        side: 'Paralyzed side',
        use_audio: 'Text-To-Speech on iOS',
        use_video_only: 'Video only',
        language: 'Language',
        password: 'Password',
        confirm_password: 'Confirm password',
      },
      card: {
        title: {
          default: 'Patient %{placeholder}',
          create: 'Add a patient',
        },
        labels: {
          plans: 'Intervention plans',
        },
        plan_dialog: {
          title: 'Add an intervention plan',
          labels: {
            autocomplete: 'Name',
            radio_new: 'Create a new intervention plan',
            radio_template: 'Use an existing template',
          },
        },
        actions: {
          copy: 'Create a model',
        },
      },
      errors: {
        email: 'Email address already in use',
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
        video: {
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
            success: 'Intervention plan added successfully',
            failure: 'An error has occurred.',
          },
        },
        email: {
          send: {
            success: 'Email sent successfully.',
            failure: 'An error occurred. No email has been sent.',
          },
        },
      },
    },
    plans: {
      name: 'Intervention plan |||| Intervention plans',
      fields: {
        name: 'Name',
        'i18n.name': 'Name',
        'i18n.name.en': 'Name',
        'i18n.description': 'Additional information',
        'i18n.description.en': 'Additional information',
        clinician_uid: 'Clinician',
        archived: 'Archives',
        daily_repeat: 'Daily frequencies',
        randomize: 'Random order',
        is_system: 'System',
        start_date: 'Start date',
        end_date: 'End date',
        exercise: {
          description: 'Description',
          movement_duration: 'Duration',
          pause: 'Pause',
          repetition: 'Repetitions',
          empty: {
            exercise: {
              label: 'Choose an exercise',
            },
          },
        },
      },
      list: {
        labels: {
          exercises_count: 'Exercises',
          user: 'My models',
          admin: 'Models',
          system: 'System',
        },
      },
      edit: {
        title: 'Intervention plan %{placeholder}',
      },
      show: {
        title: 'Intervention plan %{placeholder}',
      },
      delete: {
        confirmTitle: 'Delete the intervention plan %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Add an exercise',
          labels: {
            autocomplete: {
              category: 'Category',
              exercise: 'Description',
            },
          },
        },
        title: {
          default: 'Intervention plan %{placeholder}',
          create: 'Add an intervention plan',
        },
        labels: {
          definition: 'Features',
          exercises: 'Exercises',
        },
      },
      errors: {
        is_system: 'You are not allowed to modify the value of `is_system`',
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'When saving, this field will be automatically translated into languages where no data has been entered',
        overwrite_existing_translations:
          'Replace also the existing translations.',
        copy_on_save:
          'When saving, this field will be automatically copied into the languages for which no manual input has been made',
      },
    },
  },
};
