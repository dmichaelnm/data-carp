<template>
  <app-editor :scope="EDocumentType.Project">
  </app-editor>
</template>

<script setup lang="ts">
import AppEditor from 'components/application/AppEditor.vue';
import { EDocumentType } from 'src/script/backend/api/IDocument';
</script>
