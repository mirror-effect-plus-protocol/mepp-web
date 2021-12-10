export default {
  form: {
    field: {
      email: {
        label: 'Votre adresse courriel',
        placeholder: 'Adresse courriel',
      },
      password: {
        label: 'Votre mot de passe',
        placeholder: 'Mot de passe',
      },
      oldpassword: {
        label: 'Votre mot de passe',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirmation',
        placeholder: '',
      },
      newpassword: {
        label: 'Nouveau mot de passe',
        placeholder: '',
      },
      error: {
        login_invalid: 'Adresse courriel ou mot de passe invalide',
        email_invalid: 'Adresse courriel invalide',
        pwd_not_match: 'Les mots de passe ne sont pas identiques',
        pwd: 'Doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial (-_ @$!%*#?&)',
        min_length: 'Ce mot de passe est trop court',
        required: 'Ce champ est requis',
      },
    },

    login: {
      title: 'Connexion',
    },

    reset_password: {
      title: 'Réinitialisation de votre mot de passe',
      success: 'Votre mot de passe a été modifié avec succès.',
    },

    forgot_password: {
      title: 'Mot de passe oublié?',
      introduction:
        'Incrivez votre adresse courriel et nous vous acheminerons un lien pour réinitialiser votre mot de passe.',
      success:
        'Si votre compte existe, un courriel sera envoyé à <span>{{ email }}</span>. Il vous indiquera les étapes à suivre pour réinitialiser votre mot de passe.',
    },
  },
};
