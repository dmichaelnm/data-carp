import { AccountServiceFirebase } from 'src/script/backend/firebase/AccountServiceFirebase';
import { IAccountService } from 'src/script/backend/api/IAccountService';

export class Backend {
  static readonly accountService: IAccountService =
    new AccountServiceFirebase();
}
