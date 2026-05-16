import { IDocumentData } from 'src/script/backend/api/IDocumentData';

export interface IAccountData extends IDocumentData {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    photoURL?: string;
  },
  preference: {
    darkMode: boolean;
    language: string;
  },
  state: {
    active: boolean;
    lastLogin?: Date;
  }
}
