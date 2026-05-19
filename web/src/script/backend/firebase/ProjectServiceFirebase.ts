import { IProjectService } from 'src/script/backend/api/IProjectService';
import { IProject } from 'src/script/backend/api/IProject';
import { ProjectFirebase } from 'src/script/backend/firebase/ProjectFirebase';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { EDocumentType } from 'src/script/backend/api/IDocument';

export class ProjectServiceFirebase implements IProjectService {
  createProject(data: IProjectData): IProject {
    return new ProjectFirebase('', EDocumentType.Project, data, true);
  }
}
