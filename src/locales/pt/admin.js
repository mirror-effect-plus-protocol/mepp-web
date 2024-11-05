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
        archives: 'Arquivos',
        cancelButton: 'Cancelar',
        confirmButton: 'confirme',
        archiveButton: 'Arquivo',
        unarchiveButton: 'Desarquivar',
        activateButton: 'Habilitar',
        deactivateButton: 'Desativar',
        backButton: 'Voltar',
        exportButton: 'Exportador',
        filterButton: 'Filtro',
        card: {
          identity: 'Identificar',
          informations: 'Perfil',
          reset_password: 'Redefinir senha',
          create_password: 'Crie a senha',
        },
        profile: 'Meu perfil',
      },
      notifications: {
        archive: {
          success: 'Item arquivado com sucesso',
          failure: 'ocorreu um erro',
        },
        unarchive: {
          success: 'Item desarquivado com sucesso',
          failure: 'ocorreu um erro',
        },
        activate: {
          success: 'Item ativado com sucesso',
          failure: 'ocorreu um erro',
        },
        deactivate: {
          success: 'Item desativado com sucesso',
          failure: 'ocorreu um erro',
        },
        bulkArchive: {
          success: 'Itens arquivados com sucesso',
          failure: 'ocorreu um erro',
        },
        bulkUnarchive: {
          success: 'Itens desarquivados com sucesso',
          failure: 'ocorreu um erro',
        },
        'exportar': {
          start: 'O download começará em breve',
          failure: 'ocorreu um erro',
        },
        mirror: {
          failure: 'ocorreu um erro',
        },
        language: {
          success: 'Seu idioma foi atualizado com sucesso',
          failure: 'Ocorreu um erro, seu perfil não foi atualizado',
        },
        profile: {
          success: 'Seu perfil foi atualizado com sucesso',
        },
      },
      text: {
        cancelDialog: {
          title: 'Você tem certeza que deseja cancelar?',
          body: 'Todas as alterações serão perdidas.',
        },
        emailDialog: {
          title: 'E-mail de boas-vindas',
          body: 'Deseja reenviar o e-mail?',
        },
      },
      errors: {
        field_required: 'Este campo é obrigatório',
        password_mismatch: 'As senhas não coincidem',
        password_too_short: 'A senha deve conter %{min_length} caracteres',
        password_not_secure:
          'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial (-_ @$!%*#?&amp;)',
        password_required: 'Este campo é obrigatório',
      },
    },
    dashboard: {
      title: 'Bem-vindo %{nome}',
      labels: {
        openMirrorButton: 'Espelho facial aberto',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frequências diárias alcançadas',
        },
        sessions: {
          card_header: 'Sessões',
        },
        choices: {
          one_week: 'os últimos 7 dias',
          two_weeks: 'os últimos 14 dias',
          one_month: 'os últimos 30 dias',
          all: 'o início',
        },
        labels: {
          completed: 'Completamente executado',
          uncompleted: 'Parcialmente executado',
          since: 'De',
        },
      },
      mirror_dialog: {
        title: 'Espelho facial aberto',
        labels: {
          autocomplete: 'Escolha um paciente',
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
      name: 'Categoria |||| Categorias',
      fields: {
        'i18n.name.fr': 'Nome',
        'i18n.nome': 'Nome',
      },
      labels: {
        category: 'Categoria',
        sub_category: 'Subcategoria',
      },
    },
    clinicians: {
      name: 'Médico |||| Médicos',
      fields: {
        email: 'E-mail',
        first_name: 'Primeiro nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        language: 'Linguagem',
        password: 'Senha',
        confirm_password: 'Confirme sua senha',
        archived: 'Arquivos',
        is_superuser: 'Administrador',
      },
      list: {
        labels: {
          patients_count: 'Pacientes',
        },
      },
      card: {
        title: {
          default: 'Médico %{espaço reservado}',
          create: 'Adicionar um médico',
        },
      },
      delete: {
        confirmTitle: 'Excluir médico %{placeholder}',
      },
      errors: {
        email: 'Endereço de email já está em uso',
      },
    },
    exercises: {
      name: 'Exercício |||| Exercícios',
      fields: {
        archived: 'Arquivos',
        'i18n.descrição.fr': 'Descrição',
        'i18n.descrição': 'Descrição',
        movement_duration: 'Duração',
        pause: 'Pausa',
        repetition: 'Ensaios',
        clinician_uid: 'Clínico',
        category__uid: 'Categoria',
        uid: 'Subcategoria',
        is_system: 'Sistema',
        sub_categories: 'Categorias e subcategorias',
        empty: {
          categories: {
            label: 'Choississez une catégorie',
          },
        },
      },
      card: {
        title: {
          default: 'Exercício %{espaço reservado}',
          create: 'Adicione um exercício',
        },
        labels: {
          definition: 'Características',
          classification: 'Classificação',
        },
      },
      list: {
        labels: {
          user: 'Meus exercícios',
          system: 'Sistema',
        },
      },
      delete: {
        confirmTitle: 'Excluir exercício %{placeholder}',
      },
      errors: {
        sub_categories:
          'Você deve escolher pelo menos uma categoria/subcategoria',
        gt_zero: 'Deve ser maior que zero',
      },
    },
    patients: {
      name: 'Paciente(e) |||| Paciente(s)',
      fields: {
        archived: 'Arquivos',
        clinician_uid: 'Clínico',
        email: 'E-mail',
        first_name: 'Primeiro nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        side: 'Lado paralisado',
        use_audio: 'Áudio ativo',
        language: 'Linguagem',
        password: 'Senha',
        confirm_password: 'Confirme sua senha',
      },
      card: {
        title: {
          default: 'Paciente(e) %{placeholder}',
          create: 'Adicionar um paciente',
        },
        labels: {
          plans: 'Planos de intervenção',
        },
        plan_dialog: {
          title: 'Adicione um plano de intervenção',
          labels: {
            autocomplete: 'Nome',
            radio_new: 'Crie um novo plano de intervenção',
            radio_template: 'Use um modelo existente',
          },
        },
        actions: {
          copy: 'Crie um modelo',
        },
      },
      errors: {
        email: 'Endereço de email já está em uso',
      },
      filters: {
        last_visited: 'ultima visita',
        today: 'Hoje',
        this_week: 'Essa semana',
        this_month: 'Este mês',
      },
      shared: {
        side: {
          '0': 'ESQUERDA',
          '1': 'Certo',
        },
        audio: {
          'verdadeiro': 'Sim',
          'falso': 'Não',
        },
      },
      delete: {
        confirmTitle: 'Excluir paciente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Plano de resposta adicionado com sucesso',
            failure: 'ocorreu um erro',
          },
        },
        email: {
          send: {
            success: 'E-mail enviado com sucesso',
            failure: 'Ocorreu um erro. Nenhum e-mail foi enviado',
          },
        },
      },
    },
    plans: {
      name: 'Plano de intervenção |||| Planos de intervenção',
      fields: {
        name: 'Nome',
        'i18n.name.pt': 'Nome',
        'i18n.name': 'Nome',
        'i18n.description.pt': 'Informação extra',
        'i18n.description': 'Informação extra',
        clinician_uid: 'Clínico',
        archived: 'Arquivos',
        daily_repeat: 'Frequências diárias',
        randomize: 'Ordem aleatória',
        is_system: 'Sistema',
        start_date: 'Data de início',
        end_date: 'Data final',
        exercise: {
          description: 'Descrição',
          movement_duration: 'Duração',
          pause: 'Pausa',
          repetition: 'Ensaios',
          empty: {
            exercise: {
              label: 'Choississez une exercice',
            },
          },
        },
      },
      list: {
        labels: {
          exercises_count: 'Exercícios',
          user: 'Meus modelos',
          admin: 'Modelos',
          system: 'Sistema',
        },
      },
      edit: {
        title: 'Plano de intervenção %{placeholder}',
      },
      show: {
        title: 'Plano de intervenção %{placeholder}',
      },
      delete: {
        confirmTitle: 'Excluir plano de intervenção %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Adicione um exercício',
          labels: {
            autocomplete: {
              category: 'Categoria',
              sub_category: 'Subcategoria',
              exercise: 'Descrição',
              sub_category_empty_label: 'Todos',
            },
          },
        },
        title: {
          default: 'Plano de intervenção %{placeholder}',
          create: 'Adicione um plano de intervenção',
        },
        labels: {
          definition: 'Características',
          exercises: 'Exercícios',
          is_system_warning:
            'Todos os exercícios associados também estarão acessíveis ao público',
        },
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'Este campo será traduzido automaticamente para outros idiomas (não inseridos manualmente) ao salvar',
        overwrite_existing_translations: 'Substitua as traduções existentes',
      },
    },
  },
};
