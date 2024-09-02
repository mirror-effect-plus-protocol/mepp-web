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
        archives: 'Archivo',
        cancelButton: 'anular',
        confirmButton: 'Confirmar',
        archiveButton: 'Archivo',
        unarchiveButton: 'Desarchivar',
        activateButton: 'Permitir',
        deactivateButton: 'Desactivar',
        backButton: 'Atrás',
        exportButton: 'Exportador',
        card: {
          identity: 'Identificar',
          informations: 'Perfil',
          reset_password: 'Restablecer la contraseña',
          create_password: 'Crea la contraseña',
        },
        profile: 'Mi perfil'
      },
      notifications: {
        archive: {
          success: 'Artículo archivado exitosamente',
          failure: 'Se ha producido un error',
        },
        unarchive: {
          success: 'Artículo desarchivado exitosamente',
          failure: 'Se ha producido un error',
        },
        activate: {
          success: 'Artículo activado con éxito',
          failure: 'Se ha producido un error',
        },
        deactivate: {
          success: 'Artículo deshabilitado exitosamente',
          failure: 'Se ha producido un error',
        },
        bulkArchive: {
          success: 'Artículos archivados exitosamente',
          failure: 'Se ha producido un error',
        },
        bulkUnarchive: {
          success: 'Elementos desarchivados exitosamente',
          failure: 'Se ha producido un error',
        },
        'exportar': {
          start: 'La descarga comenzará pronto',
          failure: 'Se ha producido un error',
        },
        mirror: {
          failure: 'Se ha producido un error',
        },
        language: {
          success: 'Su idioma se ha actualizado correctamente',
          failure: 'Se ha producido un error, su perfil no ha sido actualizado',
        },
        profile: {
          success: 'Tú perfil ha sido actualizado satisfactoriamente',
        },
      },
      text: {
        cancelDialog: {
          title: '¿Estas seguro que quieres cancelar?',
          body: 'Todos los cambios se perderán.',
        },
        emailDialog: {
          title: 'Correo electrónico de bienvenida',
          body: '¿Quieres reenviar el correo electrónico?',
        },
      },
      errors: {
        field_required: 'Este campo es obligatorio',
        password_mismatch: 'Las contraseñas no coinciden',
        password_too_short: 'La contraseña debe contener %{min_length} caracteres',
        password_not_secure: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (-_ @$!%*#?&amp;)',
        password_required: 'Este campo es obligatorio',
      }
    },
    dashboard: {
      title: 'Bienvenido %{nombre}',
      labels: {
        openMirrorButton: 'espejo de cara abierta'
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frecuencias diarias alcanzadas'
        },
        sessions: {
          card_header: 'Sesiones',
        },
        choices: {
          one_week: 'los últimos 7 días',
          two_weeks: 'los últimos 14 días',
          one_month: 'los últimos 30 días',
          all: 'el inicio'
        },
        labels: {
          completed: 'Completamente ejecutado',
          uncompleted: 'Parcialmente ejecutado',
          since: 'Desde'
        }
      },
      mirror_dialog: {
        title: 'espejo de cara abierta',
        labels: {
          autocomplete: 'Elige un paciente'
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
      name: 'Categoría |||| Categorías',
      fields: {
        'i18n.name.fr': 'apellido',
        'i18n.name': 'apellido'
      },
      labels: {
        category: 'Categoría',
        sub_category: 'Subcategoría'
      }
    },
    clinicians: {
      name: 'Médico |||| Médicos',
      fields: {
        email: 'Correo electrónico',
        first_name: 'Nombre de pila',
        full_name: 'nombre completo',
        last_name: 'apellido',
        language: 'Lengua',
        password: 'Contraseña',
        confirm_password: 'confirmar la contraseña',
        archived: 'Archivo',
        is_superuser: 'Administrador'
      },
      list: {
        labels: {
          patients_count: 'Pacientes',
        },
      },
      card: {
        title: {
          default: 'Médico %{placeholder}',
          create: 'Agregar un médico'
        },
      },
      delete: {
        confirmTitle: 'Eliminar médico %{placeholder}',
      },
      errors: {
        email: 'Dirección de correo electrónico ya está en uso'
      },
    },
    exercises: {
      name: 'Ejercicio |||| Ejercicios',
      fields: {
        archived: 'Archivo',
        'i18n.description.fr': 'Descripción',
        'i18n.description': 'Descripción',
        movement_duration: 'Duración',
        pause: 'Pausa',
        repetition: 'Ensayos',
        clinician_uid: 'clínico',
        category__uid: 'Categoría',
        uid: 'Subcategoría',
        is_system: 'Sistema',
        sub_categories: 'Categorías y subcategorías'
      },
      card: {
        title: {
          default: 'Ejercicio %{placeholder}',
          create: 'Añadir un ejercicio'
        },
        labels: {
          definition: 'Características',
          classification: 'Clasificación'
        }
      },
      list: {
        labels: {
          user: 'mis ejercicios',
          system: 'Sistema'
        }
      },
      delete: {
        confirmTitle: 'Eliminar ejercicio %{placeholder}',
      },
      errors: {
        sub_categories: 'Debes elegir al menos una categoría/subcategoría',
        gt_zero: 'Debe ser mayor que cero'
      }
    },
    patients: {
      name: 'Paciente(e) |||| Paciente(s)',
      fields: {
        archived: 'Archivo',
        clinician_uid: 'clínico',
        email: 'Correo electrónico',
        first_name: 'Nombre de pila',
        full_name: 'nombre completo',
        last_name: 'apellido',
        side: 'Lado paralizado',
        use_audio: 'audio activo',
        language: 'Lengua',
        password: 'Contraseña',
        confirm_password: 'confirmar la contraseña',
      },
      card: {
        title: {
          default: 'Paciente(e) %{placeholder}',
          create: 'Agregar un paciente'
        },
        labels: {
          plans: 'Planes de intervención',
        },
        plan_dialog: {
          title: 'Agregar un plan de intervención',
          labels: {
            autocomplete: 'apellido',
            radio_new: 'Crear un nuevo plan de intervención',
            radio_template: 'Utilice una plantilla existente'
          }
        },
        actions: {
          copy: 'Crear una plantilla'
        }
      },
      errors: {
        email: 'Dirección de correo electrónico ya está en uso'
      },
      filters: {
        last_visited: 'última visita',
        today: 'Hoy',
        this_week: 'Esta semana',
        this_month: 'Este mes'
      },
      shared: {
        side: {
          '0': 'IZQUIERDA',
          '1': 'Correcto',
        },
        audio: {
          'verdadero': 'Sí',
          'FALSO': 'No',
        },
      },
      delete: {
        confirmTitle: 'Eliminar paciente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Plan de respuesta agregado exitosamente',
            failure: 'Se ha producido un error',
          },
        },
        email: {
          send: {
            success: 'Correo electrónico enviado correctamente',
            failure: 'Se ha producido un error. No se envió ningún correo electrónico',
          }
        },
      },
    },
    plans: {
      name: 'Plan de intervención |||| Planes de intervención',
      fields: {
        name: 'apellido',
        'i18n.nombre.fr': 'apellido',
        'i18n.nombre': 'apellido',
        'i18n.description.fr': 'Información extra',
        'i18n.descripción': 'Información extra',
        clinician_uid: 'clínico',
        archived: 'Archivo',
        daily_repeat: 'Frecuencias diarias',
        randomize: 'Orden aleatorio',
        is_system: 'Sistema',
        start_date: 'Fecha de inicio',
        end_date: 'Fecha final',
        exercise: {
          description: 'Descripción',
          movement_duration: 'Duración',
          pause: 'Pausa',
          repetition: 'Ensayos'
        }
      },
      list: {
        labels: {
          exercises_count: 'Ejercicios',
          user: 'Mis modelos',
          admin: 'Modelos',
          system: 'Sistema'
        },
      },
      edit: {
        title: 'Plan de intervención %{placeholder}',
      },
      show: {
        title: 'Plan de intervención %{placeholder}',
      },
      delete: {
        confirmTitle: 'Eliminar plan de intervención %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Añadir un ejercicio',
          labels: {
            autocomplete: {
              category: 'Categoría',
              sub_category: 'Subcategoría',
              exercise: 'Descripción',
              sub_category_empty_label: 'Todas'
            }
          }
        },
        title: {
          default: 'Plan de intervención %{placeholder}',
          create: 'Agregar un plan de intervención'
        },
        labels: {
          definition: 'Características',
          exercises: 'Ejercicios',
          is_system_warning: 'Todos los ejercicios asociados también serán accesibles al público.'
        }
      }
    },
    shared: {
      labels: {
        translate_on_save: 'Este campo se traducirá automáticamente a otros idiomas (no ingresados manualmente) al guardar',
        overwrite_existing_translations: 'Reemplazar traducciones existentes'
      }
    }
  },
};
