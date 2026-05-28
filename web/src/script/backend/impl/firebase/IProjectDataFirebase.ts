import { IProjectData } from 'src/script/backend/api/IProjectData';

export interface IProjectDataFirebase extends IProjectData {
  access: string[];
}
