import { AccountServiceFirebase } from 'src/script/backend/impl/firebase/AccountServiceFirebase';
import { IAccountService } from 'src/script/backend/api/IAccountService';
import { IProjectService } from 'src/script/backend/api/IProjectService';
import { ProjectServiceFirebase } from 'src/script/backend/impl/firebase/ProjectServiceFirebase';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { EPermission } from 'src/script/backend/api/IProjectDocument';
import { EProjectMemberRole } from 'src/script/backend/api/IProjectMember';
import { Project } from 'src/script/backend/impl/Project';
import { IBackendService } from 'src/script/backend/api/IBackendService';
import { BackendServiceFirebase } from 'src/script/backend/impl/firebase/BackendServiceFirebase';

export class Backend {
  static readonly backendService: IBackendService =
    new BackendServiceFirebase();

  static readonly accountService: IAccountService =
    new AccountServiceFirebase();

  static readonly projectService: IProjectService =
    new ProjectServiceFirebase();

  static hasPermission(
    type: EDocumentType,
    permission: EPermission,
    role: EProjectMemberRole
  ): boolean {
    switch (type) {
      case EDocumentType.Project:
        return Project.hasPermission(permission, role);
      default:
        return false;
    }
  }
}
