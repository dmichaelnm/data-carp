import { IDocumentData } from 'src/script/backend/api/IDocumentData';

export interface IProjectDocumentData extends IDocumentData {
  name: string;
  description: string | null;
}
