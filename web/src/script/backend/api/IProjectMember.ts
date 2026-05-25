export enum EProjectMemberRole {
  Owner = 'owner',
  Visitor = 'visitor',
}

export interface IProjectMember {
  id: string;
  displayName: string;
  role: EProjectMemberRole;
  photoURL: string | null;
  description: string | null;
}
