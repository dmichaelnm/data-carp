<template>
  <q-avatar :size="_size">
    <q-img
      v-if="account && account.data.profile.photoURL"
      :src="account.data.profile.photoURL"
      referrerpolicy="no-referrer"
    />
    <q-img v-if="photoUrl" :src="photoUrl" referrerpolicy="no-referrer" />
    <q-icon
      v-else
      name="account_circle"
      :size="_size"
      :style="{ color: colors('button-icon-color') }"
    />
  </q-avatar>
</template>

<script setup lang="ts">
import { IAccount } from 'src/script/backend/api/IAccount';
import { computed } from 'vue';
import { useColor } from 'src/script/ui/composable';

const colors = useColor();

const props = defineProps<{
  account?: IAccount | null | undefined;
  photoUrl?: string | null | undefined;
  size?: number;
}>();

const _size = computed(() => (props.size ? `${props.size}px` : '32px'));
</script>
