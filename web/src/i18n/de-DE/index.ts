// noinspection SpellCheckingInspection

export default {
  button: {
    back: 'Zurück',
    close: 'Schließen',
  },
  dialog: {
    unexpected: {
      title: 'Unerwarteter Fehler',
      message:
        'Es ist ein unerwarteter Fehler aufgetreten. Genauere Informationen finden Sie in den Details.',
    },
  },
  error: {
    inputEmpty: 'Das Eingabefeld darf nicht leer sein.',
  },
  label: {
    confirmPassword: 'Kennwort bestätigen',
    details: 'Details',
    email: 'Email-Adresse',
    firstName: 'Vorname',
    language: 'Sprache',
    lastName: 'Nachname',
    noSelection: 'Keine Auswahl',
    password: 'Kennwort',
  },
  language: {
    enUS: 'Englisch (US)',
    deDE: 'Deutsch (DE)',
  },
  tooltip: {
    darkMode: 'Dunkler Modus',
    lightMode: 'Heller Modus',
  },
  auth: {
    login: {
      button: 'Anmelden',
      message:
        'Bitte geben Sie in die untenstehenden Eingabefelder Ihre Email-Adresse und Ihr Kennwort an, um sich am System ' +
        'anzumelden. Falls Sie noch kein Konto besitzen können Sie sich über den Link "Konto erstellen" ein neues Konto ' +
        'erstellen. Beachten Sie, dass nach Erstellung des Kontos noch ein berechtigter Administrator das Konto ' +
        'freischalten muss, bevor Sie sich anmelden können.',
    },
    register: {
      button: 'Konto erstellen',
      message:
        'Um ein neues Konto zu erstellen, füllen Sie die untenstehenden Felder aus. Beachten Sie, dass für die ' +
        'angegebene Email-Adresse noch kein Konto existieren darf. Nachdem das Konto erfolgreich erstellt wurde, muss ' +
        'noch ein berechtigter Administrator das Konto freischalten, bevor Sie sich am System anmelden können.',
      dialog: {
        success: {
          title: 'Konto erfolgreich erstellt',
          message:
            'Das Konto wurde erfolgreich erstellt. Bitte warten Sie mit der Anmeldung, bis ein Administrator das ' +
            'Konto freigeschaltet hat.',
        },
      },
    },
    forgotPassword: {
      button: {
        link: 'Kennwort vergessen',
        send: 'Email senden',
      },
      message:
        'Falls Sie Ihr Kennwort vergessen haben, können Sie es hier zurücksetzen lassen. Geben Sie dazu die ' +
        'Email-Adresse Ihres Kontos ein. Sie bekommen dann eine Email zugesendet, die einen Rücksetzungslink enthält.',
      dialog: {
        success: {
          title: 'Email wurde versendet',
          message:
            'Die Email für das Zurücksetzen Kennworts wurde erfolgreich versendet. Bitte überprüfen Sie Ihren ' +
            'Posteingang und sicherheitshalber auch Ihren Spam-Ordner.',
        },
      },
    },
    error: {
      passwordConfirmInvalid: 'Die Kennwortbestätigung ist fehlgeschlagen.',
      emailInvalid: 'Die angegebene Email-Adresse ist ungültig.',
      emailAlreadyExists:
        'Es existiert bereits ein Konto mit der angegebenen Email-Adresse.',
      passwordWeak: 'Das angegebene Kennwort ist zu schwach.',
      invalidCredentials: 'Die angegebenen Anmeldedaten sind ungültig.',
      accountNotActive: 'Das Konto ist nicht aktiviert.',
      tooManyRequests: 'Zu viele Anmeldeversuche. Bitte versuchen Sie es später noch einmal.',
    },
  },
};
