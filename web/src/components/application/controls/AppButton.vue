<template>
  <q-btn
    :class="`button-${_buttonStyle}`"
    :flat="_buttonStyle !== 'push'"
    :icon="icon"
    :label="label"
    :type="_type"
    :round="_buttonStyle === 'icon'"
    :to="to"
    :color="_color"
    dense
    no-caps
    @click="emit('click')"
  >
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    <slot />
  </q-btn>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

.button-push {
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  padding: 2px 24px;
}
.button-icon {
  background-color: transparent;
  color: $button-icon-color-light;
}
.body--dark .button-icon {
  color: $button-icon-color-dark;
}
.button-link {
  background-color: transparent;
  color: $primary;
  font-size: 1rem;
  padding: 0 16px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { TButtonStyle, TButtonType, TColorName } from 'src/script/ui/types';

const props = defineProps<{
  buttonStyle?: TButtonStyle;
  icon?: string;
  label?: string;
  to?: string;
  tooltip?: string;
  type?: TButtonType | undefined;
  color?: TColorName | string | undefined;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const _color = computed(() =>
  props.color ?? props.icon ? 'button-icon-color' : 'primary'
);
const _buttonStyle = computed(() => props.buttonStyle ?? 'push');
const _type = computed(() => props.type ?? 'button');
</script>
