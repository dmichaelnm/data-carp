import { IProjectDocument } from 'src/script/backend/api/IProjectDocument';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import {
  EProjectMemberRole,
  IProjectMember,
} from 'src/script/backend/api/IProjectMember';
import { IAccount } from 'src/script/backend/api/IAccount';

export interface IProject extends IProjectDocument<IProjectData> {
  getOwner(): IProjectMember;

  getRole(account: IAccount): EProjectMemberRole;

  isOwnProject(): boolean;
}
