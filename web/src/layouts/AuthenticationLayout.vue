<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <message-dialog v-model="messageDialogOptions.visible" />
    <q-footer class="footer">
      <div class="text-right text-hint">
        &copy; Copyright {{ new Date().getFullYear() }} Dirk Michael / Version
        {{ applicationVersion.version }} (Build Date:
        {{ applicationVersion.buildDate }})
      </div>
    </q-footer>
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

.footer {
  background-color: transparent;
  padding: 4px 16px;
}
</style>

<script setup lang="ts">
import { applicationVersion } from 'src/script/version';
import { messageDialogOptions } from 'src/script/ui/messageDialog';
import MessageDialog from 'components/dialogs/MessageDialog.vue';
</script>
