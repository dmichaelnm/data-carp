export enum EProjectMemberRole {
  Owner = 'owner',
}

export interface IProjectMember {
  id: string;
  role: EProjectMemberRole;
}
