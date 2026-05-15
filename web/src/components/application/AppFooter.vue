<template>
  <q-footer class="app-footer">
    <div class="row">
      <div class="col" />
      <div class="col text-center text-hint">
        <router-link
          v-if="showPrivacyPolicy"
          class="link"
          to="/info/privacy-policy"
          target="_blank"
        >
          {{ $t('info.privacyPolicy.title') }}
        </router-link>
      </div>
      <div class="col text-right text-hint">
        &copy; Copyright {{ new Date().getFullYear() }} Dirk Michael / Version
        {{ applicationVersion.version }} (Build Date:
        {{ applicationVersion.buildDate }},
        {{ applicationVersion.environment }})
      </div>
    </div>
  </q-footer>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.app-footer {
  background-color: transparent;
  padding: 4px 16px;
}

.link {
  color: white;
}
</style>

<script setup lang="ts">
import { applicationVersion } from 'src/script/version';

defineProps<{
  showPrivacyPolicy: boolean;
}>();
</script>
