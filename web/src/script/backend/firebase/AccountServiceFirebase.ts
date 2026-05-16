import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { firebaseAuth } from 'boot/firebase';
import { IAccountService } from 'src/script/backend/api/IAccountService';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IAccountData } from 'src/script/backend/api/IAccountData';
import { AccountFirebase } from 'src/script/backend/firebase/AccountFirebase';
import { FirebaseError } from 'firebase/app';

export class AccountServiceFirebase implements IAccountService {
  onAuthenticationStateChanged(callback: (account: IAccount | null) => void) {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user === null) {
        callback(null);
      } else {
        const account = (await this.getAccount(user.uid, true)) as IAccount;
        if (!account.data.state.active) {
          await signOut(firebaseAuth);
          callback(null);
        }
        callback(account);
      }
    });
  }

  async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    darkMode: boolean,
    language: string
  ): Promise<IAccount> {
    const credentials = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await updateProfile(credentials.user, {
      displayName: `${firstName} ${lastName}`,
    });
    const data: IAccountData = {
      profile: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
      preference: {
        darkMode: darkMode,
        language: language,
      },
      state: {
        active: false,
      },
      meta: {
        created: {
          by: `${firstName} ${lastName}`,
          at: new Date(Date.now()),
        },
      },
    };
    const account = AccountFirebase.createAccount(data, credentials.user.uid);
    await account.save();
    return account;
  }

  async getAccount(
    id: string,
    accountExpected: boolean
  ): Promise<IAccount | undefined> {
    return await AccountFirebase.getAccount(id, accountExpected);
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await sendPasswordResetEmail(firebaseAuth, email);
  }

  async signIn(email: string, password: string): Promise<IAccount> {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const account = (await AccountFirebase.getAccount(
      credentials.user.uid,
      true
    )) as IAccount;
    if (!account.data.state.active) {
      await signOut(firebaseAuth);
      throw new FirebaseError(
        'auth/account-not-active',
        'The account is not active (auth/account-not-active).'
      );
    }
    return account;
  }

  async signInWithGoogle(
    darkMode: boolean,
    language: string
  ): Promise<IAccount> {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(firebaseAuth, provider);
    let account = await this.getAccount(credentials.user.uid, false);
    if (account === undefined) {
      const displayName = credentials.user.displayName ?? 'Unknown User';
      const data: IAccountData = {
        profile: {
          firstName: displayName.split(' ')[0] ?? 'Unknown',
          lastName: displayName.split(' ')[1] ?? 'User',
          email: credentials.user.email as string,
          photoURL: credentials.user.photoURL ?? undefined,
        },
        preference: {
          darkMode: darkMode,
          language: language,
        },
        state: {
          active: false,
        },
      };
      account = AccountFirebase.createAccount(data, credentials.user.uid);
      await account.save();
    }
    if (!account.data.state.active) {
      await signOut(firebaseAuth);
      throw new FirebaseError(
        'auth/account-not-active',
        'The account is not active (auth/account-not-active).'
      );
    }
    return account as IAccount;
  }
}
