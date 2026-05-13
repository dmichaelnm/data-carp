export default {
  button: {
    back: 'Back',
    close: 'Close',
  },
  dialog: {
    unexpected: {
      title: 'Unexpected Error',
      message:
        'An unexpected error occurred. For more details, please see the details.',
    },
  },
  error: {
    inputEmpty: 'The input field cannot be empty.',
  },
  label: {
    confirmPassword: 'Confirm Password',
    details: 'Details',
    email: 'Email Address',
    firstName: 'First Name',
    language: 'Language',
    lastName: 'Last Name',
    noSelection: 'No Selection',
    password: 'Password',
  },
  language: {
    enUS: 'English (US)',
    deDE: 'German (DE)',
  },
  tooltip: {
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
  auth: {
    login: {
      button: 'Log In',
      message:
        'Please enter your email address and password in the input fields below to log in to the system. If you do not ' +
        'yet have an account, you can create a new one using the "Create Account" link. Please note that after creating ' +
        'your account, an authorized administrator must activate it before you can log in.',
    },
    register: {
      button: 'Create Account',
      message:
        'To create a new account, please fill out the fields below. Please note that no account may currently exist for ' +
        'the specified email address. Once the account has been successfully created, an authorized administrator must ' +
        'activate it before you can log in to the system.',
      dialog: {
        success: {
          title: 'Account created successfully',
          message:
            'The account was created successfully. Please wait until an authorized administrator activates it before ' +
            'you try to sign in.',
        },
      },
    },
    forgotPassword: {
      button: 'Forgot Password',
    },
    error: {
      passwordConfirmInvalid: 'The password confirmation has failed.',
      emailInvalid: 'The specified email address is invalid.',
      emailAlreadyExists:
        'There already exists an account with the specified email address.',
      passwordWeak: 'The specified password is too weak.',
    },
  },
};
