<template>
  <q-input
    :model-value="_modelValue"
    :autocomplete="autoComplete"
    :autofocus="autoFocus"
    :label="label"
    :spellcheck="_spellcheck"
    :type="_type"
    :rules="[(value) => !!value || !_mandatory || $t('error.inputEmpty')]"
    :error="error !== undefined && error !== null && error.trim().length > 0"
    :error-message="error"
    :readonly="readOnly"
    :hide-bottom-space="hideBottomSpace"
    ref="appInput"
    lazy-rules="ondemand"
    dense
    :outlined="!borderless"
    :borderless="borderless"
    stack-label
    @update:model-value="(value) => (_modelValue = value)"
  >
    <template #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput } from 'quasar';

type TModelValue = string | number | null;
type TInputType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url';
type TAutoComplete = 'current-password' | 'new-password' | 'username';

const appInput = ref<QInput | null>(null);

const props = defineProps<{
  modelValue: TModelValue;
  autoComplete?: TAutoComplete;
  autoFocus?: boolean;
  error?: string;
  label?: string;
  mandatory?: boolean;
  spellcheck?: boolean;
  type?: TInputType;
  readOnly?: boolean;
  hideBottomSpace?: boolean;
  borderless?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TModelValue): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: TModelValue) => emit('update:modelValue', value),
});

const _mandatory = computed(() => props.mandatory ?? false);
const _spellcheck = computed(() => props.spellcheck ?? false);
const _type = computed(() => props.type ?? 'text');

function select() {
  appInput.value?.select();
}

defineExpose({ select });
</script>
