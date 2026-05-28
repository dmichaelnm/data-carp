import { IDocument } from 'src/script/backend/api/IDocument';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';

export enum EPermission {
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
  View = 'view',
}

export interface IProjectDocument<D extends IProjectDocumentData>
  extends IDocument<D> {}
