import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';
import { IProjectMember } from 'src/script/backend/api/IProjectMember';

export interface IProjectData extends IProjectDocumentData {
  members: IProjectMember[];
}
