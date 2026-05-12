import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { IAccountService } from 'src/script/backend/api/IAccountService';
import { firebaseAuth } from 'boot/firebase';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IAccountData } from 'src/script/backend/api/IAccountData';
import { AccountFirebase } from 'src/script/backend/firebase/AccountFirebase';

export class AccountServiceFirebase implements IAccountService {
  onAuthenticationStateChanged(
    callback: (account: IAccount | null) => void
  ) {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user === null) {
        callback(null);
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
}
