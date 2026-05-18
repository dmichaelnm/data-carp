import { IDocument } from 'src/script/backend/api/IDocument';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';

export interface IProjectDocument<D extends IProjectDocumentData>
  extends IDocument<D> {}
