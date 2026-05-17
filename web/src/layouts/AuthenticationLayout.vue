<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <message-dialog v-model="messageDialogOptions.visible" />
    <app-footer :show-privacy-policy="true" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.layout {
  background: linear-gradient(to bottom right, white, $primary);
}
.body--dark .layout {
  background: linear-gradient(to bottom right, black, $primary);
}
</style>

<script setup lang="ts">
import { messageDialogOptions } from 'src/script/ui/messageDialog';
import MessageDialog from 'components/application/MessageDialog.vue';
import AppFooter from 'components/application/AppFooter.vue';
</script>
