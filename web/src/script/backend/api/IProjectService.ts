import { IProject } from 'src/script/backend/api/IProject';
import { IProjectData } from 'src/script/backend/api/IProjectData';

export interface IProjectService {
  createProject(data: IProjectData): IProject;
}
