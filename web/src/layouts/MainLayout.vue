<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <app-footer />
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { Backend } from 'src/script/backend/Backend';
import AppFooter from 'components/application/AppFooter.vue';

const quasar = useQuasar();
const i18n = useI18n();
const router = useRouter();

onBeforeMount(() => {
  Backend.accountService.onAuthenticationStateChanged((account) => {
    if (account === null) {
      router.push('/auth/login');
    } else {
      quasar.dark.set(account.data.preference.darkMode);
      i18n.locale.value = account.data.preference.language;
    }
  });
});
</script>
