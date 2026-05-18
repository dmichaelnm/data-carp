import { DocumentFirebase } from 'src/script/backend/firebase/DocumentFirebase';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';

export abstract class ProjectDocumentFirebase<
  D extends IProjectDocumentData
> extends DocumentFirebase<D> {

}
