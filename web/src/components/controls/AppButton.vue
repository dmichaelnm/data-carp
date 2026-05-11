<template>
  <q-btn
    :class="`button-${_buttonStyle}`"
    :flat="_buttonStyle !== 'push'"
    :icon="icon"
    :label="label"
    :type="_type"
    :round="_buttonStyle === 'icon'"
    :to="to"
    dense
    no-caps
    @click="emit('click')"
  >
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.button-push {
  background-color: $primary;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  padding: 0 24px;
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

type TButtonStyle = 'push' | 'link' | 'icon';
type TButtonType = 'button' | 'submit' | 'reset';

const props = defineProps<{
  buttonStyle?: TButtonStyle;
  icon?: string;
  label?: string;
  to?: string;
  tooltip?: string;
  type?: TButtonType;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const _buttonStyle = computed(() => props.buttonStyle ?? 'push');
const _type = computed(() => props.type ?? 'button');
</script>
