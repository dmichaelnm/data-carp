<template>
  <account-selection-dialog
    v-model="dialogVisible"
    @account:selected="onMemberSelected"
  />
  <app-editor
    :scope="EDocumentType.Project"
    :tabs="['access', 'attributes']"
    :submit-handler="onSubmit"
  >
    <template #tab-access>
      <div class="q-col-gutter-y-sm">
        <div class="row q-col-gutter-md">
          <div class="col-3">
            {{ $t('project.editor.tab.access.owner.message') }}
          </div>
          <div class="col-3">
            {{ $t('project.editor.tab.access.manager.message') }}
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <account-selection-field
              v-model="owner"
              :label="$t('project.editor.tab.access.owner.label')"
              read-only
            />
          </div>
          <div class="col-3">
            <account-selection-field
              v-model="manager"
              :label="$t('project.editor.tab.access.manager.label')"
            />
          </div>
        </div>
        <div class="row" style="margin-top: 32px">
          <div class="col">
            <app-table
              v-model="members"
              :message="$t('project.editor.tab.access.member.message')"
              message-col="col-6"
              :message-empty-table="
                $t('project.editor.tab.access.member.messageEmptyTable')
              "
              :columns="[
              {
                name: 'photo',
                label: '',
                type: ETableColumnType.Avatar,
                field: (row: IProjectMember) => row.photoURL,
                style: 'padding: 6px 12px;',
                width: 32
              },
              {
                align: 'left',
                name: 'displayName',
                label: $t('project.editor.tab.access.member.header.displayName'),
                type: ETableColumnType.Text,
                field: (row: IProjectMember) => row.displayName,
                width: 200
              },
              {
                align: 'left',
                name: 'role',
                label: $t('project.editor.tab.access.member.header.role'),
                type: ETableColumnType.Text,
                field: (row: IProjectMember) => $t(`project.role.${row.role}`),
                width: 150
              },
              {
                align: 'left',
                name: 'description',
                label: $t('label.description'),
                type: ETableColumnType.Text,
                field: (row: IProjectMember) => row.description
              }
            ]"
              :row-add-handler="onAddMember"
              show-add-button
              show-remove-button
              enable-selection
            />
          </div>
        </div>
      </div>
    </template>
  </app-editor>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from 'stores/session-store';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import {
  EProjectMemberRole,
  IProjectMember,
} from 'src/script/backend/api/IProjectMember';
import { ETableColumnType } from 'src/script/ui/types';
import { IAccount } from 'src/script/backend/api/IAccount';
import AppEditor from 'components/application/AppEditor.vue';
import AppTable from 'components/application/controls/AppTable.vue';
import AccountSelectionField from 'components/application/account/AccountSelectionField.vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';

const session = useSessionStore();
const route = useRoute();

const dialogVisible = ref(false);
const dialogCallback = ref<((commit: boolean) => void) | null>(null);

const owner = ref<IAccount | null>(null);
const manager = ref<IAccount | null>(null);
const members = ref<IProjectMember[]>([]);

const _mode = computed(() => route.params.mode as string);

onBeforeMount(() => {
  if (_mode.value === 'create') {
    owner.value = session.account;
    manager.value = session.account;
  }
});

function onAddMember(callback: (commit: boolean) => void): void {
  dialogCallback.value = callback;
  dialogVisible.value = true;
}

function onMemberSelected(account: IAccount): void {
  members.value.push({
    id: account.id,
    displayName: account.getDisplayName(),
    photoURL: account.data.profile.photoURL ?? null,
    description: null,
    role: EProjectMemberRole.Visitor,
  });
  if (dialogCallback.value) {
    dialogCallback.value(true);
    dialogCallback.value = null;
  }
}

async function onSubmit(
  name: string,
  description: string | null
): Promise<string> {
  console.log(name, description);
  return '';
}
</script>
