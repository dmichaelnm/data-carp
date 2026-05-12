import { IAccount } from 'src/script/backend/api/IAccount';

export interface IAccountService {
  onAuthenticationStateChanged(
    callback: (account: IAccountService | null) => void
  ): void;

  createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    darkMode: boolean,
    language: string
  ): Promise<IAccount>;

  getAccount(id: string): Promise<IAccount>;
}
