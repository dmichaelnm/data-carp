import { ProjectDocumentFirebase } from 'src/script/backend/firebase/ProjectDocumentFirebase';
import { IProjectDataFirebase } from 'src/script/backend/firebase/IProjectDataFirebase';
import {
  EProjectMemberRole,
  IProjectMember,
} from 'src/script/backend/api/IProjectMember';
import { firebaseAuth } from 'boot/firebase';

export class ProjectFirebase extends ProjectDocumentFirebase<IProjectDataFirebase> {
  getOwner(): IProjectMember {
    return this.data.members.find(
      (m) => m.role === EProjectMemberRole.Owner
    ) as IProjectMember;
  }

  isOwnProject(): boolean {
    return this.getOwner().id === firebaseAuth.currentUser?.uid;
  }

  async onBeforeSave(): Promise<void> {
    this.data.access = [];
    for (const member of this.data.members) {
      if (!this.data.access.includes(member.id)) {
        this.data.access.push(member.id);
      }
    }
  }
}
