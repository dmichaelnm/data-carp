<template>
  <app-editor :scope="EDocumentType.Project" :submit-handler="onSubmit">
  </app-editor>
</template>

<script setup lang="ts">
import AppEditor from 'components/application/AppEditor.vue';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { Backend } from 'src/script/backend/Backend';
import { EProjectMemberRole } from 'src/script/backend/api/IProjectMember';
import { firebaseAuth } from 'boot/firebase';
import { useSessionStore } from 'stores/session-store';

const session = useSessionStore();

async function onSubmit(
  name: string,
  description: string | null
): Promise<string> {
  const data: IProjectData = {
    name: name,
    description: description,
    members: [
      {
        id: firebaseAuth.currentUser?.uid as string,
        role: EProjectMemberRole.Owner,
      },
    ],
  };
  const project = Backend.projectService.createProject(data);
  await project.save();
  session.projects.push(project);
  session.projects.sort((a, b) => a.data.name.localeCompare(b.data.name));
  session.project = await Backend.projectService.loadProject(project.id);
  if (session.account) {
    session.account.data.state.lastProject = project.id;
    await session.account.save();
  }
  return project.id;
}
</script>
