<template>
  <q-checkbox
    :model-value="_modelValue"
    :label="label"
    dense
    @update:model-value="(value) => (_modelValue = value)"
  />
</template>

<style lang="scss" scoped>
.q-checkbox__label {
  font-size: 0.75rem;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});
</script>
