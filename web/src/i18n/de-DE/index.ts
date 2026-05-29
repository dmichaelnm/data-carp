// noinspection SpellCheckingInspection

export default {
  application: {
    title: 'Data Carp',
  },
  button: {
    add: 'Hinzufügen',
    back: 'Zurück',
    cancel: 'Abbrechen',
    close: 'Schließen',
    darkMode: 'Dunkler Modus',
    language: 'Sprache',
    lightMode: 'Heller Modus',
    okay: 'Okay',
    profile: 'Profil',
    remove: 'Entfernen',
    removePhoto: 'Foto entfernen',
    save: 'Speichern',
    signOut: 'Abmelden',
    uploadPhoto: 'Foto hochladen',
  },
  dialog: {
    unexpected: {
      title: 'Unerwarteter Fehler',
      message:
        'Es ist ein unerwarteter Fehler aufgetreten. Genauere Informationen finden Sie in den Details.',
    },
    accountSelection: {
      title: 'Konto auswählen',
      message:
        'Geben Sie hier die Email-Adresse des Kontos ein, welches Sie verwenden möchten.',
      applySelf: 'Selbst auswählen',
      unknownAccount: 'Unbekannte Email-Adresse',
    },
  },
  error: {
    inputEmpty: 'Das Eingabefeld darf nicht leer sein.',
  },
  label: {
    altered: 'geändert von',
    at: 'am',
    attributes: 'Zusätzliche Attribute',
    confirmPassword: 'Kennwort bestätigen',
    created: 'erstellt von',
    description: 'Beschreibung (optional)',
    details: 'Details',
    email: 'Email-Adresse',
    firstName: 'Vorname',
    language: 'Sprache',
    lastName: 'Nachname',
    noSelection: 'Keine Auswahl',
    password: 'Kennwort',
    rememberMe: 'Email-Adresse merken',
  },
  language: {
    enUS: 'Englisch (US)',
    deDE: 'Deutsch (DE)',
  },
  auth: {
    login: {
      button: {
        normal: 'Anmelden',
        google: 'Mit Google anmelden',
      },
      message:
        'Bitte geben Sie in die untenstehenden Eingabefelder Ihre Email-Adresse und Ihr Kennwort an, um sich am System ' +
        'anzumelden. Falls Sie noch kein Konto besitzen können Sie sich über den Link "Konto erstellen" ein neues Konto ' +
        'erstellen. Beachten Sie, dass nach Erstellung des Kontos noch ein berechtigter Administrator das Konto ' +
        'freischalten muss, bevor Sie sich anmelden können.',
      dialog: {
        error: {
          accountNotActive: {
            title: 'Konto nicht freigeschaltet',
            message:
              'Das Konto wurde erstellt, aber noch nicht freigeschaltet. Bitte warten Sie mit der Anmeldung, bis ' +
              'ein Administrator das Konto freigeschaltet hat.',
          },
        },
      },
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
      tooManyRequests:
        'Zu viele Anmeldeversuche. Bitte versuchen Sie es später noch einmal.',
    },
  },
  project: {
    role: {
      owner: 'Eigentümer',
      manager: 'Projektleiter',
      maintainer: 'Maintainer',
      developer: 'Entwickler',
      visitor: 'Besucher',
    },
    menu: {
      noProjectSelected: 'Kein Projekt ausgewählt',
      create: 'Projekt erstellen',
      edit: 'Aktuelles Projekt bearbeiten',
      delete: 'Aktuelles Projekt löschen',
      ownProjects: 'Eigene Projekte',
      membershipProjects: 'Mitgliedschaftsprojekte',
    },
    label: {
      name: 'Name des Projekts',
    },
    editor: {
      create: {
        title: 'Projekt erstellen',
        message:
          'Ein Projekt stellt eine Sammlung von Modellen, Metadaten und Prozessen dar, die alle im selben ' +
          'Kontext stattfinden. Weiterhin werden auf dieser Ebene auch die Zugriffsrechte für Benutzer ' +
          'definiert, um die Sicherheit und Zugänglichkeit des Projekts zu gewährleisten. Um ein neues Projekt zu ' +
          'erstellen, müssen Sie hier lediglich den Namen des Projekts angeben. Alle weiteren Eigenschaften wie eine ' +
          'Beschreibung oder die Zugriffsrechte können auch später noch festgelegt werden. Sie als Ersteller des ' +
          'Projekts werden auch automatisch als Eigentümer des Projekts festgelegt.',
      },
      edit: {
        title: 'Projekt bearbeiten',
        message:
          'Hier können Sie die Eigenschaften des Projekts bearbeiten. Sie können den Namen des Projekts, die ' +
          'Beschreibung oder die Zugriffsrechte ändern. Sie können auch den Projektleiter wechseln. sowie die ' +
          'zusätzlichen Attribute des Projekts bearbeiten.',
      },
      tab: {
        access: {
          name: 'Zugriffsrechte',
          owner: {
            message:
              'Hier steht der Eigentümer des Projekts. Der Eigentümer hat volle Kontrolle über das Projekt und ' +
              'kann auch als einziger Benutzer einen neuen Projektleiter zuweisen oder das Projekt löschen. Der ' +
              'Eigentümer kann auch gleichzeitig der Projektleiter sein.',
            label: 'Eigentümer des Projekts',
          },
          manager: {
            message:
              'Der Projektleiter ist neben dem Eigentümer der einzige Benutzer, der die Zugriffsrechte des ' +
              'Projekts verwalten kann. Allerdings kann er nicht sich selbst als Projektleiter absetzen und er kann ' +
              'auch das Projekt nicht löschen.',
            label: 'Projektleiter',
            isAlreadyMember: 'Der Benutzer ist bereits ein Projektmitglied.',
          },
          member: {
            message:
              'Hier können Sie weiteren Benutzers Zugriff auf dieses Projekt gewähren bzw. diesen wieder entziehen. ' +
              'Jeder Benutzer erhält dabei eine vordefinierte Rolle, die festlegt, welche Berechtigungen dieser Nutzer ' +
              'hat.',
            messageEmptyTable:
              'Bisher wurde keinen weiteren Benutzern Zugriff auf das Projekt gewährt.',
            isOwner: 'Der Benutzer ist bereits der Eigentümer.',
            isManager: 'Der Benutzer ist bereits der Projektleiter.',
            isAlreadyMember: 'Der Benutzer ist bereits ein Projektmitglied.',
            header: {
              displayName: 'Name des Benutzers',
              role: 'Rolle',
            },
          },
        },
      },
    },
  },
  info: {
    privacyPolicy: {
      title: 'Datenschutzerklärung',
      cookies: {
        title: 'Einsatz von Cookies',
        message1:
          'Unsere Website verwendet sogenannte „Cookies“. Dabei handelt es sich um kleine Textdateien, die auf Ihrem ' +
          'Endgerät gespeichert werden und die Ihr Browser abruft. Cookies richten auf Ihrem Rechner keinen Schaden an ' +
          'und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu ' +
          'machen.',
        message2:
          'Wir unterteilen die verwendeten Cookies in folgende Kategorien:',
        message3: 'Notwendige / Funktionale Cookies (Einwilligungsfrei):',
        message4:
          'Einige Cookies sind für den technischen Betrieb der Website zwingend erforderlich. Dazu gehören Cookies, die ' +
          'Ihre bevorzugten Einstellungen wie die Sprachauswahl (Language) oder das visuelle Design (Dark Mode / ' +
          'Dark Theme) für Ihren nächsten Besuch speichern. Ohne diese Cookies müsste die Website bei jedem ' +
          'Seitenaufruf neu konfiguriert werden. Die Rechtsgrundlage für diese Speicherung ist unser berechtigtes ' +
          'Interesse an einer technisch fehlerfreien und optimierten Bereitstellung unserer Dienste (Art. 6 Abs. 1 ' +
          'lit. f DSGVO).',
        message5: 'Komfort- / Eingabe-Cookies (Einwilligungspflichtig):',
        message6:
          'Wenn Sie die Option nutzen, Ihre E-Mail-Adresse auf unserer Website (z. B. für einen schnelleren Login oder ' +
          'in einem Formular) zu speichern, damit Sie diese nicht jedes Mal neu eingeben müssen, erfolgt dies ' +
          'ausschließlich auf Grundlage Ihrer freiwilligen Einwilligung (Art. 6 Abs. 1 lfd. a DSGVO). Diese ' +
          'Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookies in den ' +
          'Einstellungen Ihres Browsers löschen.',
        message7: 'Verwaltung und Löschung von Cookies',
        message8:
          'Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies ' +
          'nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie ' +
          'das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von ' +
          'Cookies kann die Funktionalität dieser Website eingeschränkt sein.',
      },
    },
  },
};
