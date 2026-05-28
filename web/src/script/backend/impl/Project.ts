import { ProjectDocumentFirebase } from 'src/script/backend/impl/firebase/ProjectDocumentFirebase';
import { IProjectDataFirebase } from 'src/script/backend/impl/firebase/IProjectDataFirebase';
import { EProjectMemberRole } from 'src/script/backend/api/IProjectMember';
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
}
