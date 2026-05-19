<template>
  <app-editor :scope="EDocumentType.Project" :submit-handler="onSubmit">
  </app-editor>
</template>

<script setup lang="ts">
import AppEditor from 'components/application/AppEditor.vue';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { Backend } from 'src/script/backend/Backend';

async function onSubmit(
  name: string,
  description: string | null
): Promise<void> {
  const data: IProjectData = {
    name: name,
    description: description,
  }
  const project = Backend.projectService.createProject(data);
  await project.save();
}
</script>
