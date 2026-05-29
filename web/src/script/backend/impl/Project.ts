import { ProjectDocumentFirebase } from 'src/script/backend/impl/firebase/ProjectDocumentFirebase';
import { IProjectDataFirebase } from 'src/script/backend/impl/firebase/IProjectDataFirebase';
import {
  EProjectMemberRole,
  IProjectMember,
} from 'src/script/backend/api/IProjectMember';
import { EPermission } from 'src/script/backend/api/IProjectDocument';

export abstract class Project extends ProjectDocumentFirebase<IProjectDataFirebase> {
  static hasPermission(permission: string, role: EProjectMemberRole): boolean {
    switch (permission) {
      case EPermission.Create:
        return true;
      case EPermission.Delete:
        return role === EProjectMemberRole.Owner;
      case EPermission.Edit:
        return (
          role === EProjectMemberRole.Owner ||
          role === EProjectMemberRole.Manager
        );
      case EPermission.View:
        return role === EProjectMemberRole.Visitor;
      default:
        return false;
    }
  }

  getManager(): IProjectMember {
    return this.data.members.find(
      (m) => m.role === EProjectMemberRole.Manager
    ) as IProjectMember;
  }

  getOwner(): IProjectMember {
    return this.data.members.find(
      (m) => m.role === EProjectMemberRole.Owner
    ) as IProjectMember;
  }
}
