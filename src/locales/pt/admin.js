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
        confirmButton: 'Confirmar',
        archiveButton: 'Arquivar',
        unarchiveButton: 'Descompactar',
        activateButton: 'Ativar',
        deactivateButton: 'Desativar',
        backButton: 'Voltar',
        exportButton: 'Exportar',
        filterButton: 'Filtrar',
        resetFilterButton: 'Redefinir',
        card: {
          identity: 'Identidade',
          informations: 'Perfil',
          instructions: 'Instruções para exercícios',
          reset_password: 'Redefinir a senha',
          create_password: 'Criar a senha',
        },
        modal: {
          title: {
            category_filter: 'Por favor, escolha uma categoria',
            exercise_filter: 'Selecione uma categoria primeiro',
          },
        },
        profile: 'Meu perfil',
      },
      notifications: {
        archive: {
          success: 'Elemento arquivado com sucesso',
          failure: 'Ocorreu um erro',
        },
        unarchive: {
          success: 'Elemento desarchivado com sucesso',
          failure: 'Ocorreu um erro',
        },
        activate: {
          success: 'Elemento ativado com sucesso',
          failure: 'Ocorreu um erro',
        },
        deactivate: {
          success: 'Elemento desativado com sucesso',
          failure: 'Ocorreu um erro',
        },
        bulkArchive: {
          success: 'Elementos arquivados com sucesso',
          failure: 'Ocorreu um erro',
        },
        bulkUnarchive: {
          success: 'Elementos desarquivados com sucesso',
          failure: 'Ocorreu um erro',
        },
        export: {
          start: 'O download começará em breve.',
          failure: 'Ocorreu um erro',
        },
        mirror: {
          failure: 'Ocorreu um erro',
        },
        language: {
          success: 'Sua língua foi atualizada com sucesso.',
          failure: 'Ocorreu um erro, seu perfil não foi atualizado.',
        },
        profile: {
          success: 'Seu perfil foi atualizado com sucesso.',
        },
      },
      text: {
        cancelDialog: {
          title: 'Você realmente deseja cancelar?',
          body: 'Todas as alterações serão perdidas.',
        },
        emailDialog: {
          title: 'Email de boas-vindas',
          body: 'Você deseja reenviar o e-mail?',
        },
        exerciseFilter: {
          loading: 'Carregando...',
          notfound: 'Nenhum exercício encontrado nesta categoria!',
        },
      },
      errors: {
        field_required: 'Este campo é obrigatório',
        password_mismatch: 'As senhas não correspondem',
        password_too_short: 'A senha deve conter %{min_length} caracteres',
        password_not_secure:
          'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial (-_ @$!%*#?&)',
        password_required: 'Este campo é obrigatório',
        url_missing_scheme:
          'O formato do link não parece válido (ex.: https://example.org)',
        gt_zero: 'Deve ser maior que zero',
      },
    },
    dashboard: {
      title: 'Bem-vindo %{name}',
      labels: {
        openMirrorButton: 'Abrir o espelho facial',
      },
      widgets: {
        daily_repeats: {
          card_header: 'Frequências diárias alcançadas',
        },
        sessions: {
          card_header: 'Sessões',
        },
        choices: {
          one_week: 'os 7 últimos dias',
          two_weeks: 'os últimos 14 dias',
          one_month: 'os últimos 30 dias',
          all: 'o começo',
        },
        labels: {
          completed: 'Totalmente executadas',
          uncompleted: 'Executadas parcialmente',
          since: 'Desde',
        },
      },
      mirror_dialog: {
        title: 'Abrir o espelho facial',
        labels: {
          autocomplete: 'Escolher um paciente',
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
      name: 'Artigo |||| Artigos',
      fields: {
        'i18n.title': 'Título',
        'i18n.title.pt': 'Título',
        'i18n.description': 'Descrição',
        'i18n.description.pt': 'Descrição',
        'i18n.external_url': 'Link externo',
        'i18n.external_url.pt': 'Link externo',
      },
      card: {
        labels: {
          add: 'Adicionar um artigo',
          more_details: 'Mais detalhes',
          title: 'Título',
          description: 'Descrição',
          external_url: 'Link externo',
        },
      },
      delete: {
        confirmTitle: 'Remover o artigo %{placeholder}',
      },
      errors: {
        i18n: 'Alguns campos não são válidos',
      },
    },
    categories: {
      name: 'Categoria |||| Categorias',
      fields: {
        'i18n.name.pt': 'Nome',
        'i18n.name': 'Nome',
      },
      labels: {
        category: 'Categoria',
      },
    },
    clinicians: {
      name: 'Clinicísta |||| Clinicístas',
      fields: {
        email: 'Email',
        first_name: 'Nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        language: 'Idioma',
        password: 'Senha',
        confirm_password: 'Confirmar a senha',
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
          default: 'Cliniciano(a) %{placeholder}',
          create: 'Adicionar um(a) clínico(a)',
        },
      },
      delete: {
        confirmTitle: 'Remover o(a) clínico(a) %{placeholder}',
      },
      errors: {
        email: 'Endereço de e-mail já utilizado',
      },
    },
    exercises: {
      name: 'Exercício |||| Exercícios',
      empty: {
        title: 'Nenhum exercício',
        description:
          'Por favor, escolha uma categoria clicando no botão Filtrar.',
      },
      fields: {
        archived: 'Arquivos',
        'i18n.description.pt': 'Descrição',
        'i18n.description': 'Descrição',
        movement_duration: 'Duração',
        pause: 'Pausa',
        repetition: 'Repetições',
        clinician_uid: 'Clinico(a)',
        category__uid: 'Categoria',
        uid: 'Categoria',
        categories: 'Categorias',
        video_with_audio: 'Vídeo com áudio',
        empty: {
          categories: {
            label: 'Escolher uma categoria',
          },
        },
      },
      card: {
        title: {
          default: 'Exercício %{placeholder}',
          create: 'Adicionar um exercício',
        },
        labels: {
          definition: 'Características',
          classification: 'Classificação',
          video: 'Vídeo',
        },
        text: {
          no_video_available: 'Nenhum vídeo disponível',
        },
      },
      list: {
        labels: {
          user: 'Meus exercícios',
          system: 'Sistema',
        },
      },
      delete: {
        confirmTitle: 'Remover o exercício %{placeholder}',
      },
      errors: {
        categories: 'Você deve escolher pelo menos uma categoria.',
        gt_zero: 'Deve ser superior a zero',
        movement_duration: 'Formato inválido',
        repetition: 'Formato inválido',
        pause: 'Formato inválido',
      },
    },
    patients: {
      name: 'Pacient(e) |||| Pacient(e)s',
      fields: {
        archived: 'Arquivos',
        clinician_uid: 'Clinico(a)',
        email: 'Email',
        first_name: 'Nome',
        full_name: 'Nome completo',
        last_name: 'Nome',
        side: 'Lado paralisado',
        use_audio: 'Texto para fala no iOS',
        use_video_only: 'Apenas vídeo',
        language: 'Idioma',
        password: 'Senha',
        confirm_password: 'Confirmar a senha',
      },
      card: {
        title: {
          default: 'Paciente %{placeholder}',
          create: 'Adicionar um(a) paciente',
        },
        labels: {
          plans: 'Planos de intervenção',
        },
        plan_dialog: {
          title: 'Adicionar um plano de intervenção',
          labels: {
            autocomplete: 'Nome',
            radio_new: 'Criar um novo plano de intervenção',
            radio_template: 'Usar um modelo existente',
          },
        },
        actions: {
          copy: 'Criar um modelo',
        },
      },
      errors: {
        email: 'Endereço de e-mail já utilizado',
      },
      filters: {
        last_visited: 'Última visita',
        today: 'Hoje',
        this_week: 'Esta semana',
        this_month: 'Este mês',
      },
      shared: {
        side: {
          '0': 'Esquerda',
          '1': 'Direito',
        },
        audio: {
          'true': 'Sim',
          'false': 'Não',
        },
        video: {
          'true': 'Sim',
          'false': 'Não',
        },
      },
      delete: {
        confirmTitle: 'Remover o(a) paciente %{placeholder}',
      },
      notifications: {
        plans: {
          add: {
            success: 'Plano de intervenção adicionado com sucesso.',
            failure: 'Ocorreu um erro',
          },
        },
        email: {
          send: {
            success: 'E-mail enviado com sucesso',
            failure: 'Ocorreu um erro. Nenhum e-mail foi enviado.',
          },
        },
      },
    },
    plans: {
      name: 'Plano de intervenção |||| Planos de intervenção',
      fields: {
        name: 'Nome',
        'i18n.name': 'Nome',
        'i18n.name.pt': 'Nome',
        'i18n.description': 'Informações adicionais',
        'i18n.description.pt': 'Informações adicionais',
        clinician_uid: 'Clinico(a)',
        archived: 'Arquivos',
        daily_repeat: 'Frequências diárias',
        randomize: 'Ordem aleatória',
        is_system: 'Sistema',
        start_date: 'Data de início',
        end_date: 'Data de término',
        exercise: {
          description: 'Descrição',
          movement_duration: 'Duração',
          pause: 'Pausa',
          repetition: 'Repetições',
          empty: {
            exercise: {
              label: 'Escolher um exercício',
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
        confirmTitle: 'Excluir o plano de intervenção %{placeholder}',
      },
      card: {
        exercise_dialog: {
          title: 'Adicionar um exercício',
        },
        title: {
          default: 'Plano de intervenção %{placeholder}',
          create: 'Adicionar um plano de intervenção',
        },
        labels: {
          definition: 'Características',
          exercises: 'Exercícios',
        },
      },
      errors: {
        is_system:
          'Você não está autorizado a modificar o valor de `is_system`',
      },
    },
    shared: {
      labels: {
        translate_on_save:
          'Ao salvar, este campo será traduzido automaticamente para os idiomas onde nenhum dado foi inserido',
        overwrite_existing_translations:
          'Substituir também as traduções existentes',
        copy_on_save:
          'Ao salvar, este campo será copiado automaticamente para os idiomas para os quais nenhuma entrada manual foi feita',
      },
    },
  },
};
