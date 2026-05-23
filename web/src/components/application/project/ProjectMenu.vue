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
      :separator="session.projects.length > 0 ? 'below' : undefined"
      @click="createProject"
    />
    <app-menu-item label="Eigene Projekte" caption v-if="_ownProjects.length > 0" />
    <app-menu-item
      v-for="project in _ownProjects"
      :key="project.id"
      :label="project.data.name"
      :checked="project.id === _selectedProjectId"
      :disabled="project.id === _selectedProjectId"
      show-empty-left-icon
      show-empty-right-icon
      @click="switchProject(project.id)"
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
import { useRunTask } from 'src/script/ui/composable';
import { computed } from 'vue';
import { useSessionStore } from 'stores/session-store';
import { Backend } from 'src/script/backend/Backend';
import AppMenuItem from 'components/application/controls/AppMenuItem.vue';

const session = useSessionStore();
const i18n = useI18n();
const router = useRouter();
const runTask = useRunTask();

const _projectLabel = computed(() =>
  session.project?.id
    ? session.project.data.name
    : i18n.t('project.menu.noProjectSelected')
);

const _ownProjects = computed(() =>
  session.projects
    .filter((p) => p.isOwnProject())
    .sort((a, b) => a.data.name.localeCompare(b.data.name))
);

const _selectedProjectId = computed(() => session.project?.id);

function createProject(): void {
  router.push('/project/editor/create');
}

function switchProject(projectId: string): void {
  runTask(async () => {
    session.project = await Backend.projectService.loadProject(projectId);
    if (session.account) {
      session.account.data.state.lastProject = projectId;
      await session.account.save();
    }
  });
}
</script>
