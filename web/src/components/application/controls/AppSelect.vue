<template>
  <q-select
    :model-value="_modelValue"
    :label="label"
    :options="options"
    ref="appSelect"
    map-options
    emit-value
    dense
    options-dense
    :outlined="!borderless"
    :borderless="borderless"
    stack-label
    @update:model-value="(value) => (_modelValue = value)"
  >
    <template #prepend v-if="_showOptionIcon && _selectedOption">
      <slot name="selectedIcon">
        <q-icon :name="_selectedOption.icon" />
      </slot>
    </template>
    <template #selected>
      <slot name="selectedLabel">
        <div v-if="_selectedOption">
          {{ translate ? $t(_selectedOption.label) : _selectedOption.label }}
        </div>
        <div v-else class="text-italic">
          {{ $t('label.noSelection') }}
        </div>
      </slot>
    </template>
    <template #option="props">
      <q-separator
        v-if="props.opt.separator === 'above' || props.opt.separator === 'both'"
      />
      <q-item clickable v-close-popup dense v-bind="props.itemProps">
        <q-item-section side v-if="_showOptionIcon">
          <q-icon :name="props.opt.icon" />
        </q-item-section>
        <q-item-section>
          <slot name="optionLabel" v-bind="props">
            <q-item-label>{{
              props.opt.tranlate ||
              (props.opt.tranlate === undefined && translate)
                ? $t(props.opt.label)
                : props.opt.label
            }}</q-item-label>
          </slot>
        </q-item-section>
      </q-item>
      <q-separator
        v-if="props.opt.separator === 'below' || props.opt.separator === 'both'"
      />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QSelect } from 'quasar';
import { TSelectOption } from 'src/script/ui/types';

type TModelValue = string | null;

const appSelect = ref<QSelect | null>(null);

const props = defineProps<{
  label?: string;
  modelValue: TModelValue;
  options: TSelectOption[];
  translate?: boolean;
  borderless?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: TModelValue): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: TModelValue) => emit('update:modelValue', value),
});

const _showOptionIcon = computed(() =>
  props.options.some((option) => option.icon)
);

const _selectedOption = computed(() =>
  props.options.find((option) => option.value === _modelValue.value)
);

function showPopup() {
  appSelect.value?.showPopup();
}

defineExpose({ showPopup });
</script>
