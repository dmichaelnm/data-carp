import { DocumentFirebase } from 'src/script/backend/firebase/DocumentFirebase';
import { IAccountData } from 'src/script/backend/api/IAccountData';
import { IAccount } from 'src/script/backend/api/IAccount';
import { EDocumentType } from 'src/script/backend/api/IDocument';

export class AccountFirebase
  extends DocumentFirebase<IAccountData>
  implements IAccount
{
  static createAccount(data: IAccountData, id?: string): IAccount {
    id = id !== undefined ? id : '';
    return new AccountFirebase(id, EDocumentType.Account, data, true);
  }

  static async getAccount(id: string): Promise<IAccount> {
    return await DocumentFirebase.get<IAccountData, IAccount>(
      id,
      EDocumentType.Account,
      (data) => new AccountFirebase(id, EDocumentType.Account, data, false)
    );
  }
}
