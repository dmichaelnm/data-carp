<template>
  <q-footer class="footer">
    <div class="text-right text-hint">
      &copy; Copyright {{ new Date().getFullYear() }} Dirk Michael / Version
      {{ applicationVersion.version }} (Build Date:
      {{ applicationVersion.buildDate }}, {{ applicationVersion.environment }})
    </div>
  </q-footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: transparent;
  padding: 4px 16px;
}
</style>

<script setup lang="ts">
import { applicationVersion } from 'src/script/version';
</script>
