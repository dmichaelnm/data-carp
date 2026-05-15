<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <app-footer :show-privacy-policy="false" />
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
import { onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import AppFooter from 'components/application/AppFooter.vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const quasar = useQuasar();

onBeforeMount(() => {
  quasar.dark.set(quasar.cookies.get('darkMode') === 'true');
  i18n.locale.value = quasar.cookies.get('language') ?? 'en-US';
});
</script>
