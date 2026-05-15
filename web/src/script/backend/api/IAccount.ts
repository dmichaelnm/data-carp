import { IDocument } from 'src/script/backend/api/IDocument';
import { IAccountData } from 'src/script/backend/api/IAccountData';

export interface IAccount extends IDocument<IAccountData>{

  getDisplayName(): string;

  signOut(): Promise<void>;
}
