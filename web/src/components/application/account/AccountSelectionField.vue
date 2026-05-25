<template>
  <account-selection-dialog
    v-model="dialogVisible"
    :validation-handler="validationHandler"
    @account:selected="(account) => (_modelValue = account)"
  />
  <q-field
    :model-value="_modelValue"
    :label="label"
    :readonly="readOnly"
    outlined
    dense
    stack-label
    @update:model-value="(value) => (_modelValue = value)"
  >
    <template v-slot:prepend v-if="_modelValue">
      <account-profile-picture :account="_modelValue" />
    </template>
    <template v-slot:control>
      {{ _modelValue ? _modelValue.getDisplayName() : '' }}
    </template>
    <template v-slot:append v-if="!readOnly">
      <q-btn
        round
        flat
        dense
        icon="person_search"
        @click="dialogVisible = true"
      />
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { IAccount } from 'src/script/backend/api/IAccount';
import { computed, ref } from 'vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';
import AccountProfilePicture from 'components/application/account/AccountProfilePicture.vue';

const dialogVisible = ref(false);

const props = defineProps<{
  modelValue: IAccount | null;
  label?: string;
  readOnly?: boolean;
  validationHandler?: (account: IAccount) => string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IAccount | null): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: IAccount | null) => emit('update:modelValue', value),
});
</script>
