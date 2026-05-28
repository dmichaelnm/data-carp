import { DocumentFirebase } from 'src/script/backend/impl/firebase/DocumentFirebase';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';
import { IProjectDocument } from 'src/script/backend/api/IProjectDocument';

export abstract class ProjectDocumentFirebase<D extends IProjectDocumentData>
  extends DocumentFirebase<D>
  implements IProjectDocument<D> {}
