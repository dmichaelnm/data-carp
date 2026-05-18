<template>
  <q-page>
    <div class="editor-frame">
      <div class="editor-content">
        <div class="editor-header">
          <div class="editor-title">
            {{ $t(`${scope}.editor.${_mode}.title`) }}
          </div>
          <div class="editor-message">
            {{ $t(`${scope}.editor.${_mode}.message`) }}
          </div>
        </div>
        <q-separator />
        <q-scroll-area class="editor-body"> </q-scroll-area>
        <q-separator />
        <div class="row items-center editor-buttons">
          <div class="col-6 q-gutter-x-md">
            <slot name="buttons" />
          </div>
          <div class="col-6 text-right q-gutter-x-md">
            <app-button :label="$t('button.save')" />
            <app-button
              :label="$t('button.cancel')"
              color="button-icon-color"
              @click="router.push('/')"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.editor-frame {
  width: 100%;
  height: calc(100vh - 80px);
  padding: 48px 48px 22px 48px;
}

.editor-content {
  width: 100%;
  height: 100%;
  background-color: $frame-background-light;
  border-radius: 8px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
}
.body--dark .editor-content {
  background-color: $frame-background-dark;
}

.editor-header {
  padding: 24px;
}

.editor-title {
  font-size: 2rem;
  font-variant: small-caps;
}

.editor-message {
  width: 75%;
  height: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.editor-body {
  height: calc(100% - 216px);
}

.editor-buttons {
  padding: 16px;
}
</style>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import AppButton from 'components/application/controls/AppButton.vue';

const route = useRoute();
const router = useRouter();

defineProps<{
  scope: EDocumentType;
}>();

const _mode = computed(() => route.params.mode as string);
</script>
