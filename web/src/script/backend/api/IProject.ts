import { IProjectDocument } from 'src/script/backend/api/IProjectDocument';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { IProjectMember } from 'src/script/backend/api/IProjectMember';

export interface IProject extends IProjectDocument<IProjectData> {
  getOwner(): IProjectMember;

  isOwnProject(): boolean;
}
