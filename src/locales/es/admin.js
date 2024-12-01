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
        archives: 'Archivos',
        cancelButton: 'Cancelar',
        confirmButton: 'Confirmar',
        archiveButton: 'Archivar',
        unarchiveButton: 'Descomprimir',
        activateButton: 'Activar',
        deactivateButton: 'Desactivar',
        backButton: 'Regresar',
        exportButton: 'Exportar',
        filterButton: 'Filtrar',
        resetFilterButton: 'Restablecer',
        card: {
          identity: 'Identidad',
          informations: 'Perfil',
          instructions: 'Instrucciones para ejercicios',
          reset_password: 'Restablecer la contraseña',
          create_password: 'Crear la contraseña',
        },
        modal: {
          title: {
            category_filter: 'Por favor, elija una categoría',
            exercise_filter: 'Seleccione una categoría primero.',
          },
        },
        profile: 'Mi perfil',
      },
      notifications: {
        archive: {
          success: 'Elemento archivado con éxito',
          failure: 'Se ha producido un error',
        },
        unarchive: {
          success: 'Elemento desarchivado con éxito',
          failure: 'Se ha producido un error',
        },
        activate: {
          success: 'Elemento activado con éxito',
          failure: 'Se ha producido un error',
        },
        deactivate: {
          success: 'Elemento desactivado con éxito',
          failure: 'Se ha producido un error',
        },
        bulkArchive: {
          success: 'Elementos archivados con éxito',
          failure: 'Se ha producido un error',
        },
        bulkUnarchive: {
          success: 'Elementos desarchivados con éxito',
          failure: 'Se ha producido un error',
        },
        export: {
          start: 'La descarga comenzará pronto.',
          failure: 'Se ha producido un error',
        },
        mirror: {
          failure: 'Se ha producido un error',
        },
        language: {
          success: 'Su idioma se ha actualizado con éxito.',
          failure: 'Se ha producido un error, su perfil no se ha actualizado.',
        },
        profile: {
          success: 'Tu perfil se ha actualizado con éxito.',
        },
      },
      text: {
        cancelDialog: {
          title: '¿Realmente desea cancelar?',
          body: 'Todos los cambios se perderán.',
        },
        emailDialog: {
          title: 'Correo de bienvenida',
          body: '¿Desea reenviar el correo electrónico?',
        },
        exerciseFilter: {
          loading: 'Cargando...',
          notfound: '¡No se encontró ningún ejercicio en esta categoría!',
        },
      },
      errors: {
        field_required: 'Este campo es obligatorio',
        password_mismatch: 'Las contraseñas no coinciden.',
        password_too_short:
          'La contraseña debe contener %{min_length} caracteres.',
        password_not_secure:
          'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (-_ @$!%*#?&)',
        password_required: 'Este campo es obligatorio',
        url_missing_scheme:
          'El formato del enlace no parece válido (ej.: https://example.org)',
        gt_zero: 'Debe ser mayor que cero',
      },
    },
    dashboard: {
      title: 'Bienvenido %{name}',
      labels: {
        openMirrorButton: 'Abrir el espejo facial',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frecuencias diarias alcanzadas',
        },
        sessions: {
          card_header: 'Sesiones',
        },
        choices: {
          one_week: 'los 7 últimos días',
          two_weeks: 'los últimos 14 días',
          one_month: 'los últimos 30 días',
          all: 'el comienzo',
        },
        labels: {
          completed: 'Ejecutadas completamente',
          uncompleted: 'Ejecutadas parcialmente',
          since: 'Desde',
        },
      },
      mirror_dialog: {
        title: 'Abrir el espejo facial',
        labels: {
          autocomplete: 'Seleccionar un paciente',
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
      name: 'Artículo |||| Artículos',
      fields: {
        'i18n.title': 'Título',
        'i18n.title.es': 'Título',
        'i18n.description': 'Descripción',
        'i18n.description.es': 'Descripción',
        'i18n.external_url': 'Enlace externo',
        'i18n.external_url.es': 'Enlace externo',
      },
      card: {
        labels: {
          add: 'Agregar un artículo',
          more_details: 'Más detalles',
          title: 'Título',
          description: 'Descripción',
          external_url: 'Enlace externo',
        },
      },
      delete: {
        confirmTitle: 'Eliminar el artículo %{placeholder}',
      },
      errors: {
        i18n: 'Algunos campos no son válidos',
      },
    },
    categories: {
      name: 'Categoría |||| Categorías',
      fields: {
        'i18n.name.es': 'Nombre',
        'i18n.name': 'Nombre',
      },
      labels: {
        category: 'Categoría',
      },
    },
    clinicians: {
      name: 'Clínico(a) |||| Clínicos(as)',
      fields: {
        email: 'Correo electrónico',
        first_name: 'Nombre',
        full_name: 'Nombre completo',
        last_name: 'Nombre',
        language: 'Idioma',
        password: 'Contraseña',
        confirm_password: 'Confirmar la contraseña',
        archived: 'Archivos',
        is_superuser: 'Administrador',
      },
      list: {
        labels: {
          patients_count: 'Pacientes',
        },
      },
      card: {
        title: {
          default: 'Clínico(a) %{placeholder}',
          create: 'Agregar un(a) clínic@',
        },
      },
      delete: {
        confirmTitle: 'Eliminar el(la) clínico(a) %{placeholder}',
      },
      errors: {
        email: 'Dirección de correo electrónico ya utilizada',
      },
    },
    exercises: {
      name: 'Ejercicio |||| Ejercicios',
      empty: {
        title: 'Ningún ejercicio',
        description:
          'Por favor, elija una categoría haciendo clic en el botón Filtrar.',
      },
      fields: {
        archived: 'Archivos',
        'i18n.description': 'Descripción',
        'i18n.description.es': 'Descripción',
        movement_duration: 'Duración',
        pause: 'Pausa',
        repetition: 'Repeticiones',
        clinician_uid: 'Clínico(a)',
        category__uid: 'Categoría',
        uid: 'Categoría',
        categories: 'Categorías',
        empty: {
          categories: {
            label: 'Elegir una categoría',
          },
        },
      },
      card: {
        title: {
          default: 'Ejercicio %{placeholder}',
          create: 'Agregar un ejercicio',
        },
        labels: {
          definition: 'Características',
          classification: 'Clasificación',
          video: 'Vídeo',
        },
        text: {
          no_video_available: 'Ningún video disponible.',
        },
      },
      list: {
        labels: {
          user: 'Mis ejercicios',
          system: 'Sistema',
        },
      },
      delete: {
        confirmTitle: 'Eliminar el ejercicio %{placeholder}',
      },
      errors: {
        categories: 'Debes elegir al menos una categoría.',
        gt_zero: 'Debe ser superior a cero.',
        movement_duration: 'Formato inválido',
        repetition: 'Formato inválido',
        pause: 'Formato inválido',
      },
    },
    patients: {
      name: 'Paciente |||| Pacientes',
      fields: {
        archived: 'Archivos',
        clinician_uid: 'Clínico(a)',
        email: 'Correo electrónico',
        first_name: 'Nombre',
        full_name: 'Nombre completo',
        last_name: 'Nombre',
        side: 'Lado paralizado',
        use_audio: 'Texto a voz en iOS',
        use_video_only: 'Solo video',
        language: 'Idioma',
        password: 'Contraseña',
        confirm_password: 'Confirmar la contraseña',
      },
      card: {
        title: {
          default: 'Paciente %{placeholder}',
          create: 'Agregar un(a) paciente',
        },
        labels: {
          plans: 'Planes de intervención',
        },
        plan_dialog: {
          title: 'Agregar un plan de intervención',
          labels: {
            autocomplete: 'Nombre',
            radio_new: 'Crear un nuevo plan de intervención',
            radio_template: 'Usar un modelo existente',
          },
        },
        actions: {
          copy: 'Crear un modelo',
        },
      },
      errors: {
        email: 'Dirección de correo electrónico ya utilizada',
      },
      filters: {
        last_visited: 'Última visita',
        today: 'Hoy',
        this_week: 'Esta semana',
        this_month: 'Este mes',
      },
      shared: {
        side: {
          '0': 'Izquierda',
          '1': 'Derecho',
        },
        audio: {
          'true': 'Sí',
          'false': 'No',
        },
        video: {
          'true': 'Sí',
          'false': 'No',
        },
      },
      delete: {
        confirmTitle: 'Eliminar el/ la paciente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Plan de intervención añadido con éxito',
            failure: 'Se ha producido un error',
          },
        },
        email: {
          send: {
            success: 'Correo enviado con éxito',
            failure:
              'Se ha producido un error. No se ha enviado ningún correo electrónico.',
          },
        },
      },
    },
    plans: {
      name: 'Plan de intervención |||| Planes de intervención',
      fields: {
        name: 'Nombre',
        'i18n.name.es': 'Nombre',
        'i18n.name': 'Nombre',
        'i18n.description.es': 'Información adicional',
        'i18n.description': 'Información adicional',
        clinician_uid: 'Clínico(a)',
        archived: 'Archivos',
        daily_repeat: 'Frecuencias diarias',
        randomize: 'Orden aleatorio',
        is_system: 'Sistema',
        start_date: 'Fecha de inicio',
        end_date: 'Fecha de fin',
        exercise: {
          description: 'Descripción',
          movement_duration: 'Duración',
          pause: 'Pausa',
          repetition: 'Repeticiones',
          empty: {
            exercise: {
              label: 'Elegir un ejercicio',
            },
          },
        },
      },
      list: {
        labels: {
          exercises_count: 'Ejercicios',
          user: 'Mis modelos',
          admin: 'Modelos',
          system: 'Sistema',
        },
      },
      edit: {
        title: 'Plan de intervención %{placeholder}',
      },
      show: {
        title: 'Plan de intervención %{placeholder}',
      },
      delete: {
        confirmTitle: 'Eliminar el plan de intervención %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Agregar un ejercicio',
          labels: {
            autocomplete: {
              category: 'Categoría',
              sub_category: 'Subcategoría',
              exercise: 'Descripción',
              sub_category_empty_label: 'Todas',
            },
          },
        },
        title: {
          default: 'Plan de intervención %{placeholder}',
          create: 'Agregar un plan de intervención',
        },
        labels: {
          definition: 'Características',
          exercises: 'Ejercicios',
        },
      },
      errors: {
        is_system: 'No tiene permiso para modificar el valor de `is_system`',
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'Al guardar, este campo se traducirá automáticamente a los idiomas donde no se hayan ingresado datos',
        overwrite_existing_translations:
          'Reemplazar también las traducciones existentes',
        copy_on_save:
          'Al guardar, este campo se copiará automáticamente en los idiomas para los cuales no se ha realizado ninguna entrada manual',
      },
    },
  },
};
