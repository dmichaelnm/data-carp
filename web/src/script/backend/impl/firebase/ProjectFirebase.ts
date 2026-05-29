import { EProjectMemberRole } from 'src/script/backend/api/IProjectMember';
import { firebaseAuth } from 'boot/firebase';
import { IAccount } from 'src/script/backend/api/IAccount';
import { Project } from 'src/script/backend/impl/Project';

export class ProjectFirebase extends Project {
  getRole(account: IAccount): EProjectMemberRole {
    const roles = this.data.members
      .filter((m) => m.id === account.id)
      .map((m) => m.role);
    if (roles.length === 0) {
      return EProjectMemberRole.None;
    }
    if (roles.length === 1) {
      return roles[0];
    }
    if (roles.includes(EProjectMemberRole.Owner)) {
      return EProjectMemberRole.Owner;
    }
    return EProjectMemberRole.Manager;
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
