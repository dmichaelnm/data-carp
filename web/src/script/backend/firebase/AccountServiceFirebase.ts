import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from 'boot/firebase';
import { IAccountService } from 'src/script/backend/api/IAccountService';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IAccountData } from 'src/script/backend/api/IAccountData';
import { AccountFirebase } from 'src/script/backend/firebase/AccountFirebase';

export class AccountServiceFirebase implements IAccountService {
  onAuthenticationStateChanged(callback: (account: IAccount | null) => void) {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user === null) {
        callback(null);
      } else {
        const account = await this.getAccount(user.uid);
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

  async getAccount(id: string): Promise<IAccount> {
    return await AccountFirebase.getAccount(id);
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
    return AccountFirebase.getAccount(credentials.user.uid);
  }
}
