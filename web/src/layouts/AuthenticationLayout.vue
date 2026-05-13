<template>
  <q-layout view="lHh Lpr lFf">
    <message-dialog v-model="messageDialogOptions.visible" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { messageDialogOptions } from 'src/script/ui/messageDialog';
import MessageDialog from 'components/dialogs/MessageDialog.vue';
</script>
