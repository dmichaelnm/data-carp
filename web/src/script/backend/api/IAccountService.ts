import { IAccount } from 'src/script/backend/api/IAccount';

export interface IAccountService {
  onAuthenticationStateChanged(
    callback: (account: IAccount | null) => void
  ): void;

  createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    darkMode: boolean,
    language: string
  ): Promise<IAccount>;

  getAccount(
    id: string,
    accountExpected: boolean
  ): Promise<IAccount | undefined>;

  sendPasswordResetEmail(email: string): Promise<void>;

  signIn(email: string, password: string): Promise<IAccount>;

  signInWithGoogle(darkMode: boolean, language: string): Promise<IAccount>;
}
