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
    lazy-rules="ondemand"
    dense
    outlined
    stack-label
    @update:model-value="(value) => (_modelValue = value)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
</script>
