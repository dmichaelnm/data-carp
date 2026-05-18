import { IDocumentData } from 'src/script/backend/api/IDocumentData';

export enum EDocumentType {
  Account = 'account',
  Project = 'project',
}

export interface IDocument<D extends IDocumentData> {
  id: string;
  type: EDocumentType;
  data: D;

  save(): Promise<void>;
}
