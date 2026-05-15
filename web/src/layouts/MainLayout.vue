<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <app-header />
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
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useSessionStore } from 'stores/session-store';
import { Backend } from 'src/script/backend/Backend';
import AppFooter from 'components/application/AppFooter.vue';
import AppHeader from 'components/application/AppHeader.vue';

const quasar = useQuasar();
const i18n = useI18n();
const router = useRouter();
const session = useSessionStore();

onBeforeMount(() => {
  Backend.accountService.onAuthenticationStateChanged((account) => {
    if (account === null) {
      router.push('/auth/login');
    } else {
      quasar.dark.set(account.data.preference.darkMode);
      quasar.cookies.set('darkMode', quasar.dark.isActive.toString(), {
        expires: 365,
      });
      i18n.locale.value = account.data.preference.language;
      quasar.cookies.set('language', i18n.locale.value, {
        expires: 365,
      });
      session.account = account;
    }
  });
});
</script>
