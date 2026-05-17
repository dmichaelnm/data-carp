<template>
  <q-header>
    <q-toolbar class="app-header">
      <div>
        <app-button button-style="icon" icon="o_menu" />
      </div>
      <div class="app-title">{{ $t('application.title') }}</div>
      <q-space />
      <div>
        <account-profile-menu />
      </div>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.app-header {
  background-color: $frame-background-light;
  border-bottom: 1px solid $border-color-light;
}
.body--dark .app-header {
  background-color: $frame-background-dark;
  border-bottom: 1px solid $border-color-dark;
}

.app-title {
  color: $text-color-light;
  font-size: 1.25rem;
  font-variant: small-caps;
  padding: 0 16px;
}
.body--dark .app-title {
  color: $text-color-dark;
}

.user-avatar {
  border: 1px solid $border-color-light;
}
</style>

<script setup lang="ts">
import AccountProfileMenu from './account/AccountProfileMenu.vue';
import AppButton from 'components/application/controls/AppButton.vue';
</script>
