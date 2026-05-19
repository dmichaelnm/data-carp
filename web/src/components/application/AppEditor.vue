<template>
  <q-page>
    <div class="editor-frame">
      <q-form class="editor-content" @submit="onSubmit">
        <div style="height: 100%">
          <div class="editor-header">
            <div class="editor-title">
              {{ $t(`${scope}.editor.${_mode}.title`) }}
            </div>
            <div class="editor-message">
              {{ $t(`${scope}.editor.${_mode}.message`) }}
            </div>
          </div>
          <q-separator />
          <q-scroll-area class="editor-body">
            <div class="q-col-gutter-y-md editor-slot">
              <div class="row q-col-gutter-x-md">
                <div class="col-3">
                  <app-input
                    v-model="name"
                    :label="$t(`${scope}.label.name`)"
                    mandatory
                    auto-focus
                  />
                </div>
                <div class="col-9">
                  <app-input
                    v-model="description"
                    :label="$t('label.description')"
                  />
                </div>
              </div>
            </div>
          </q-scroll-area>
          <q-separator />
          <div class="row items-center editor-buttons">
            <div class="col-6 q-gutter-x-md">
              <slot name="buttons" />
            </div>
            <div class="col-6 text-right q-gutter-x-md">
              <app-button :label="$t('button.save')" type="submit" />
              <app-button
                :label="$t('button.cancel')"
                color="button-icon-color"
                @click="router.push('/')"
              />
            </div>
          </div>
        </div>
      </q-form>
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

.editor-slot {
  padding: 24px;
}

.editor-buttons {
  padding: 16px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRunTask } from 'src/script/ui/composable';
import { computed } from 'vue';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import AppButton from 'components/application/controls/AppButton.vue';
import AppInput from 'components/application/controls/AppInput.vue';

const route = useRoute();
const router = useRouter();
const runTask = useRunTask();

const name = ref('');
const description = ref('');

const props = defineProps<{
  scope: EDocumentType;
  submitHandler: (name: string, description: string | null) => Promise<void>;
}>();

const _mode = computed(() => route.params.mode as string);

function onSubmit(): void {
  runTask(async () => {
    await props.submitHandler(
      name.value.trim(),
      description.value.trim() === '' ? null : description.value
    );
    await router.push('/');
  });
}
</script>
