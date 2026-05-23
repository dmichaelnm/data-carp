export default {
  application: {
    title: 'Data Carp',
  },
  button: {
    back: 'Back',
    close: 'Close',
    darkMode: 'Dark Mode',
    language: 'Language',
    lightMode: 'Light Mode',
    signOut: 'Sign Out',
    profile: 'Profile',
    okay: 'Okay',
    cancel: 'Abbrechen',
    save: 'Save',
    uploadPhoto: 'Upload Photo',
    removePhoto: 'Remove Photo',
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
    description: 'Description (optional)',
    details: 'Details',
    email: 'Email Address',
    firstName: 'First Name',
    language: 'Language',
    lastName: 'Last Name',
    noSelection: 'No Selection',
    password: 'Password',
    rememberMe: 'Remember Email-Address',
  },
  language: {
    enUS: 'English (US)',
    deDE: 'German (DE)',
  },
  auth: {
    login: {
      button: {
        normal: 'Sign In',
        google: 'Sign In with Google',
      },
      message:
        'Please enter your email address and password in the input fields below to log in to the system. If you do not ' +
        'yet have an account, you can create a new one using the "Create Account" link. Please note that after creating ' +
        'your account, an authorized administrator must activate it before you can log in.',
      dialog: {
        error: {
          accountNotActive: {
            title: 'Account not activated',
            message:
              'The account has been created but has not yet been activated. Please wait to sign in until ' +
              'an administrator has activated the account.',
          },
        },
      },
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
      button: {
        link: 'Forgot Password',
        send: 'Send Email',
      },
      message:
        'If you have forgotten your password, you can have it reset here. To do so, enter the email address of your ' +
        'account. You will then receive an email containing a reset link.',
      dialog: {
        success: {
          title: 'Email sent',
          message:
            'The email for resetting your password has been sent successfully. Please check your ' +
            'inbox and, to be safe, also your spam folder.',
        },
      },
    },
    error: {
      passwordConfirmInvalid: 'The password confirmation has failed.',
      emailInvalid: 'The specified email address is invalid.',
      emailAlreadyExists:
        'There already exists an account with the specified email address.',
      passwordWeak: 'The specified password is too weak.',
      invalidCredentials: 'The provided login credentials are invalid.',
      accountNotActive: 'The account is not active.',
      tooManyRequests: 'Too many login attempts. Please try again later.',
    },
  },
  project: {
    menu: {
      noProjectSelected: 'No Project Selected',
      create: 'Create Project',
    },
    label: {
      name: 'Project Name',
    },
    editor: {
      create: {
        title: 'Create Project',
        message:
          'A project represents a collection of models, metadata, and processes that all take place in the same ' +
          'context. Furthermore, access rights for users are also defined at this level to ensure the security ' +
          'and accessibility of the project. To create a new project, you only need to specify the name of the ' +
          'project here. All other properties, such as a description or access rights, can also be defined later. ' +
          'As the creator of the project, you are also automatically designated as the owner of the project.',
      },
    },
  },
  info: {
    privacyPolicy: {
      title: 'Privacy Policy',
      cookies: {
        title: 'Use of Cookies',
        message1:
          'Our website uses so-called “cookies”. These are small text files that are stored on your ' +
          'device and retrieved by your browser. Cookies do not cause any damage to your computer ' +
          'and do not contain viruses. They are used to make our offering more user-friendly, more effective, and more ' +
          'secure.',
        message2: 'We divide the cookies used into the following categories:',
        message3: 'Necessary / Functional Cookies (No Consent Required):',
        message4:
          'Some cookies are strictly necessary for the technical operation of the website. These include cookies that ' +
          'store your preferred settings, such as language selection (Language) or the visual design (Dark Mode / ' +
          'Dark Theme), for your next visit. Without these cookies, the website would have to be reconfigured each time ' +
          'a page is accessed. The legal basis for this storage is our legitimate ' +
          'interest in the technically error-free and optimized provision of our services (Art. 6 para. 1 ' +
          'lit. f GDPR).',
        message5: 'Convenience / Input Cookies (Consent Required):',
        message6:
          'If you use the option to store your email address on our website (e.g., for faster login or ' +
          'in a form) so that you do not have to enter it again each time, this is done ' +
          'exclusively on the basis of your voluntary consent (Art. 6 para. 1 lit. a GDPR). You ' +
          'can withdraw this consent at any time with effect for the future by deleting the cookies in your ' +
          'browser settings.',
        message7: 'Management and Deletion of Cookies',
        message8:
          'You can configure your browser so that you are informed when cookies are set and only allow cookies ' +
          'in individual cases, exclude the acceptance of cookies for certain cases or in general, and activate ' +
          'the automatic deletion of cookies when closing the browser. If cookies are disabled, ' +
          'the functionality of this website may be limited.',
      },
    },
  },
};
