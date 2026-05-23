import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { IProjectService } from 'src/script/backend/api/IProjectService';
import { IProject } from 'src/script/backend/api/IProject';
import { ProjectFirebase } from 'src/script/backend/firebase/ProjectFirebase';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { IProjectDataFirebase } from 'src/script/backend/firebase/IProjectDataFirebase';
import { firebaseAuth, firebaseStore } from 'boot/firebase';

export class ProjectServiceFirebase implements IProjectService {
  createProject(data: IProjectData): IProject {
    return new ProjectFirebase(
      '',
      EDocumentType.Project,
      data as IProjectDataFirebase,
      true
    );
  }

  async loadProjects(): Promise<IProject[]> {
    const q = query(
      collection(firebaseStore, 'project'),
      where('access', 'array-contains', firebaseAuth.currentUser?.uid as string)
    );
    const result = await getDocs(q);
    const projects: IProject[] = [];
    for (const doc of result.docs) {
      projects.push(
        new ProjectFirebase(
          doc.id,
          EDocumentType.Project,
          doc.data() as IProjectDataFirebase,
          false
        )
      );
    }
    projects.sort((a, b) => a.data.name.localeCompare(b.data.name));
    return projects;
  }

  async loadProject(id: string): Promise<IProject> {
    const docRef = doc(collection(firebaseStore, 'project'), id);
    const projectDoc = await getDoc(docRef);
    const project = new ProjectFirebase(
      projectDoc.id,
      EDocumentType.Project,
      projectDoc.data() as IProjectDataFirebase,
      false
    );
    return project;
  }
}
