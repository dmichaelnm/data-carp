<template>
  <q-dialog
    ref="appDialogRef"
    :model-value="_modelValue"
    persistent
    @before-show="emit('dialog:opened')"
    @update:model-value="(value) => (_modelValue = value)"
  >
    <div
      class="dialog-frame"
      :style="{
        width: `${_width}px`,
        maxWidth: `${_width}px`,
        background: `linear-gradient(
          90deg, ${color ?? _frameColor} 0%,
          ${_frameColor} 16px,
          ${_frameColor} calc(100% - 16px),
          ${color ?? _frameColor} 100%
        )`,
      }"
    >
      <div v-if="title" class="dialog-title">{{ title }}</div>
      <q-separator v-if="title" />
      <div v-if="message" class="dialog-message">{{ message }}</div>
      <q-form @submit="onSubmit">
        <div class="dialog-content">
          <slot />
        </div>
        <div class="dialog-buttons q-gutter-x-md items-center">
          <app-button
            v-for="button in _buttons"
            :key="button.value"
            :label="$t(button.label)"
            :button-style="button.buttonStyle"
            :color="button.color"
            :type="button.type"
            @click="onButtonClick(button)"
          />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import '../../css/quasar.variables';

.dialog-frame {
  border-radius: 8px;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
  padding: 32px;
}
.dialog-title {
  font-size: 1.3rem;
  font-variant: small-caps;
}
.dialog-message {
  padding: 16px 0;
}
.dialog-content {
  padding: 8px 0;
}
.dialog-buttons {
  padding-top: 16px;
  text-align: right;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useColor } from 'src/script/ui/composable';
import { TColorName, TDialogButton } from 'src/script/ui/types';
import AppButton from 'src/components/application/controls/AppButton.vue';
import { QDialog, QForm } from 'quasar';

const getColor = useColor();

const appDialogRef = ref<InstanceType<typeof QDialog> | null>(null);

const props = defineProps<{
  modelValue: boolean;
  color?: TColorName | string | undefined;
  title?: string;
  message?: string;
  buttons?: TDialogButton[] | undefined;
  width?: number;
  submitHandler?: () => Promise<boolean>;
  closeHandler?: (button: TDialogButton) => void;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'dialog:closed', value: string): void;
  (e: 'dialog:opened'): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const _buttons = computed(
  () =>
    props.buttons ??
    ([
      {
        value: 'close',
        label: 'button.close',
        color: 'primary',
        buttonStyle: 'link',
      },
    ] as TDialogButton[])
);
const _frameColor = computed(() => getColor('frame-background'));
const _width = computed(() => props.width ?? 600);

function onButtonClick(button: TDialogButton): void {
  if (button.type !== 'submit') {
    if (props.closeHandler) {
      props.closeHandler(button);
    }
    appDialogRef.value?.hide();
    emit('dialog:closed', button.value);
  }
}

async function onSubmit(): Promise<void> {
  if (!props.submitHandler || (await props.submitHandler())) {
    const submitButton = _buttons.value.find(
      (button) => button.type === 'submit'
    );
    appDialogRef.value?.hide();
    emit('dialog:closed', submitButton?.value as string);
  }
}
</script>
