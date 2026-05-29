<template>
  <account-selection-dialog
    v-model="dialogVisible"
    :validation-handler="onValidateMember"
    @account:selected="onMemberSelected"
  />
  <app-editor
    :scope="EDocumentType.Project"
    :tabs="['access', 'attributes']"
    :document="session.project"
    :create-handler="onCreate"
    :edit-handler="onEdit"
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
              :validation-handler="onValidateManager"
              :read-only="isManager"
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
                type: ETableColumnType.Select,
                options: projectRoleOptions,
                field: (row: IProjectMember) => $t(`project.role.${row.role}`),
                width: 150
              },
              {
                align: 'left',
                name: 'description',
                label: $t('label.description'),
                type: ETableColumnType.Input,
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSessionStore } from 'stores/session-store';
import { projectRoleOptions } from 'src/script/ui/options';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import {
  EProjectMemberRole,
  IProjectMember,
} from 'src/script/backend/api/IProjectMember';
import { ETableColumnType } from 'src/script/ui/types';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IProjectData } from 'src/script/backend/api/IProjectData';
import { Backend } from 'src/script/backend/Backend';
import { IProject } from 'src/script/backend/api/IProject';
import { IProjectDocument } from 'src/script/backend/api/IProjectDocument';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';
import AppEditor from 'components/application/AppEditor.vue';
import AppTable from 'components/application/controls/AppTable.vue';
import AccountSelectionField from 'components/application/account/AccountSelectionField.vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';

const session = useSessionStore();
const i18n = useI18n();

const dialogVisible = ref(false);
const dialogCallback = ref<((commit: boolean) => void) | null>(null);

const owner = ref<IAccount | null>(null);
const manager = ref<IAccount | null>(null);
const members = ref<IProjectMember[]>([]);
const isManager = ref(true);

async function onCreate(): Promise<void> {
  owner.value = session.account;
  manager.value = session.account;
  members.value = [];
  isManager.value = false;
}

async function onEdit(
  document: IProjectDocument<IProjectDocumentData>
): Promise<void> {
  const project = document as IProject;
  owner.value = (await Backend.accountService.getAccount(
    project.getOwner().id,
    true
  )) as IAccount;
  manager.value = (await Backend.accountService.getAccount(
    project.getManager().id,
    true
  )) as IAccount;
  members.value = project.data.members
    .filter(
      (member) =>
        member.role !== EProjectMemberRole.Manager &&
        member.role !== EProjectMemberRole.Owner
    )
    .map((member) => ({
      id: member.id,
      displayName: member.displayName,
      photoURL: member.photoURL,
      description: member.description,
      role: member.role,
    }));
  isManager.value = project.getManager().id === session.account?.id;
}

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

function onValidateManager(account: IAccount): string | null {
  if (members.value.some((member) => member.id === account.id)) {
    return i18n.t('project.editor.tab.access.manager.isAlreadyMember');
  }
  return null;
}

function onValidateMember(account: IAccount): string | null {
  if (owner.value?.id === account.id) {
    return i18n.t('project.editor.tab.access.member.isOwner');
  }
  if (manager.value?.id === account.id) {
    return i18n.t('project.editor.tab.access.member.isManager');
  }
  if (members.value.some((member) => member.id === account.id)) {
    return i18n.t('project.editor.tab.access.member.isAlreadyMember');
  }
  return null;
}

async function onSubmit(
  mode: string,
  name: string,
  description: string | null
): Promise<string> {
  const data: IProjectData = {
    name: name,
    description:
      description && description.trim().length > 0 ? description.trim() : null,
    members: [
      {
        id: owner.value?.id as string,
        role: EProjectMemberRole.Owner,
        displayName: owner.value?.getDisplayName() as string,
        photoURL: owner.value?.data.profile.photoURL ?? null,
        description: null,
      },
      {
        id: manager.value?.id as string,
        role: EProjectMemberRole.Manager,
        displayName: manager.value?.getDisplayName() as string,
        photoURL: manager.value?.data.profile.photoURL ?? null,
        description: null,
      },
      ...members.value,
    ],
    meta: session.project?.data.meta,
  };
  let project: IProject;
  if (mode === 'create') {
    project = Backend.projectService.createProject(data);
    session.projects.push(project);
  } else {
    project = session.project as IProject;
    project.data = data;
    const index = session.projects.findIndex((p) => p.id === project.id);
    session.projects[index] = project;
  }
  await project.save();
  session.projects.sort((a, b) => a.data.name.localeCompare(b.data.name));
  return project.id;
}
</script>
