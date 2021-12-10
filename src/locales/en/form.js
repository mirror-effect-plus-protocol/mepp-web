export default {
  form: {
    field: {
      email: {
        label: 'Your e-mail address',
        placeholder: 'E-mail address',
      },
      password: {
        label: 'Your password',
        placeholder: 'Password',
      },
      oldpassword: {
        label: 'Your password',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirm your new password',
        placeholder: '',
      },
      newpassword: {
        label: 'New password',
        placeholder: '',
      },
      error: {
        login_invalid: 'Your e-mail address or password is invalid',
        email_invalid: 'Invalid e-mail address',
        pwd_not_match: 'Passwords do not match',
        pwd: 'Invalid password',
        min_length: 'This password is too short',
        required: 'This field is required',
      },
    },

    login: {
      title: 'Login',
    },

    reset_password: {
      title: 'Reset your password',
      success: 'Your password has been modified successfully.',
    },

    forgot_password: {
      title: 'Forgot your password?',
      introduction:
        'Please provide your e-mail address and we will send you a link to reset your password.',
      success:
        'If your account exists, an e-mail will be sent to <span>{{ email }}</span>. Please follow the provided instructions.',
    },
  },
};
