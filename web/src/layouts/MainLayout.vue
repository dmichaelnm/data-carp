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
  Backend.accountService.onAuthenticationStateChanged(async (account) => {
    if (account === null) {
      await router.push('/auth/login');
    } else {
      quasar.loading.show();
      try {
        quasar.dark.set(account.data.preference.darkMode);
        quasar.cookies.set('darkMode', quasar.dark.isActive.toString(), {
          expires: 365,
        });
        i18n.locale.value = account.data.preference.language;
        quasar.cookies.set('language', i18n.locale.value, {
          expires: 365,
        });
        session.account = account;
        session.projects = await Backend.projectService.loadProjects();
        let pid = session.account.data.state.lastProject;
        if (!session.projects.find((p) => p.id === pid)) {
          pid =
            session.projects.length > 0 ? session.projects[0].id : undefined;
        }
        if (pid !== session.account.data.state.lastProject) {
          session.account.data.state.lastProject = pid;
          await session.account.save();
        }
        if (pid !== undefined) {
          session.project = await Backend.projectService.loadProject(pid);
        }
      } finally {
        quasar.loading.hide();
      }
    }
  });
});
</script>
