<template>
  <app-dialog
    ref="dialog"
    :model-value="_modelValue"
    :width="500"
    :title="$t('dialog.accountSelection.title')"
    :message="$t('dialog.accountSelection.message')"
    :buttons="[
      { value: 'okay', label: 'button.okay', type: 'submit' },
      { value: 'cancel', label: 'button.cancel', buttonStyle: 'link' },
    ]"
    :submit-handler="performSearch"
    @update:modelValue="(value) => (_modelValue = value)"
    @dialog:opened="email = ''"
  >
    <app-input
      v-model="email"
      :label="$t('label.email')"
      :error="emailError"
      mandatory
      auto-focus
    >
      <template v-slot:append>
        <q-btn flat round dense @click="applySelf">
          <account-profile-picture :account="session.account" />
          <q-tooltip>{{ $t('dialog.accountSelection.applySelf') }}</q-tooltip>
        </q-btn>
      </template>
    </app-input>
  </app-dialog>
</template>

<script setup lang="ts">
import AppDialog from 'components/application/controls/AppDialog.vue';
import { computed, ref } from 'vue';
import AppInput from 'components/application/controls/AppInput.vue';
import { Backend } from 'src/script/backend/Backend';
import { IAccount } from 'src/script/backend/api/IAccount';
import { useSessionStore } from 'stores/session-store';
import AccountProfilePicture from 'components/application/account/AccountProfilePicture.vue';
import { useI18n } from 'vue-i18n';

const session = useSessionStore();
const i18n = useI18n();

const dialog = ref<InstanceType<typeof AppDialog>>();

const email = ref('');
const emailError = ref('');
const account = ref<IAccount | null>(null);

const props = defineProps<{
  modelValue: boolean;
  validationHandler?: (account: IAccount) => string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'account:selected', account: IAccount): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

async function performSearch(): Promise<boolean> {
  emailError.value = '';

  account.value =
    (await Backend.accountService.findAccount(email.value)) ?? null;
  if (!account.value) {
    emailError.value = i18n.t('dialog.accountSelection.unknownAccount');
    return false;
  }
  if (props.validationHandler) {
    const error = props.validationHandler(account.value);
    if (error) {
      emailError.value = error;
      return false;
    }
  }
  emit('account:selected', account.value);
  return true;
}

function applySelf(): void {
  emit('account:selected', session.account as IAccount);
  dialog.value?.close('okay');
}
</script>
