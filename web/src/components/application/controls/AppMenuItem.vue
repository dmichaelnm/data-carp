<template>
  <q-separator v-if="separator == 'above' || separator == 'both'" />
  <q-item
    :clickable="!caption && !disabled"
    v-close-popup="!caption && !hasSubMenu && !disabled"
    dense
    @click="emit('click')"
  >
    <q-item-section side>
      <q-icon v-if="icon || showEmptyLeftIcon" :name="icon" size="xs" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="`menu-item-label-${_labelStyle}`">{{
        label
      }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon v-if="hasSubMenu" name="arrow_right" size="xs" />
      <q-icon v-if="checked" name="check" size="xs" />
      <q-icon
        v-if="showEmptyRightIcon && !hasSubMenu && !checked"
        name=""
        size="xs"
      />
    </q-item-section>
    <slot />
  </q-item>
  <q-separator v-if="separator == 'below' || separator == 'both'" />
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.menu-item-label-normal {
  color: $text-color-light;
}
.body--dark .menu-item-label-normal {
  color: $text-color-dark;
}

.menu-item-label-caption {
  font-size: 0.8rem;
  color: $text-color-hint-light;
  text-align: center;
}
.body--dark .menu-item-label-caption {
  color: $text-color-hint-dark;
}

.menu-item-label-disabled {
}
</style>

<script setup lang="ts">
import { TSeparatorPosition } from 'src/script/ui/types';
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  caption?: boolean;
  checked?: boolean;
  disabled?: boolean;
  hasSubMenu?: boolean;
  icon?: string;
  separator?: TSeparatorPosition;
  showEmptyLeftIcon?: boolean;
  showEmptyRightIcon?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const _labelStyle = computed(() =>
  props.caption ? 'caption' : props.disabled ? 'disabled' : 'normal'
);
</script>
