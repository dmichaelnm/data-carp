export enum EProjectMemberRole {
  Owner = 'owner',
  Manager = 'manager',
  Maintainer = 'maintainer',
  Developer = 'developer',
  Visitor = 'visitor',
}

export interface IProjectMember {
  id: string;
  displayName: string;
  role: EProjectMemberRole;
  photoURL: string | null;
  description: string | null;
}
