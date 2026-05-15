<template>
  <app-dialog
    :model-value="_modelValue"
    :title="messageDialogOptions.title"
    :message="messageDialogOptions.message"
    :color="_color"
    @update:model-value="(value) => (_modelValue = value)"
    @dialog:closed="onDialogClosed"
  >
    <q-expansion-item
      :label="$t('label.details')"
      dense-toggle
      dense
      v-if="messageDialogOptions.details"
    >
      <q-scroll-area style="height: 100px">
        <div class="dialog-details">{{ messageDialogOptions.details }}</div>
      </q-scroll-area>
    </q-expansion-item>
  </app-dialog>
</template>

<style lang="scss" scoped>
.dialog-details {
  padding: 2px 16px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { messageDialogOptions } from 'src/script/ui/messageDialog';
import AppDialog from 'src/components/application/AppDialog.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const _color = computed(() => {
  switch (messageDialogOptions.value.type) {
    case 'error':
      return '#ff686f';
    case 'success':
      return '#68ff6f';
    case 'warning':
      return '#ffcc68';
    case 'question':
      return '#686fff';
    default:
      return undefined;
  }
});

function onDialogClosed(value: string): void {
  if (messageDialogOptions.value.onClose) {
    messageDialogOptions.value.onClose(value);
  }
}
</script>
