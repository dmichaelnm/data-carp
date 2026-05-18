<template>
  <q-btn-dropdown
    no-caps
    menu-anchor="bottom left"
    menu-self="top left"
    color="primary"
  >
    <template #label>
      <div :class="`label ${session.projects.length > 0 ? '' : 'empty'}`">
        {{ _projectLabel }}
      </div>
    </template>
    <app-menu-item
      :label="$t('project.menu.create')"
      icon="add"
      @click="createProject"
    />
  </q-btn-dropdown>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.label {
  color: white;
  font-weight: normal;
}
.empty {
  font-style: italic;
}
</style>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useSessionStore } from 'stores/session-store';
import AppMenuItem from 'components/application/controls/AppMenuItem.vue';

const session = useSessionStore();
const i18n = useI18n();
const router = useRouter();

const _projectLabel = computed(() =>
  session.projects.length > 0 ? '' : i18n.t('project.menu.noProjects')
);

function createProject(): void {
  router.push('/project/editor/create');
}
</script>
