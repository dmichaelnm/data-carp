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
            <div class="q-col-gutter-y-sm editor-slot">
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
              <!-- Single Tab Page -->
              <div class="row" v-if="tabs.length === 1">
                <div class="col">
                  <slot :name="`tab-${tabs[0]}`" />
                </div>
              </div>
              <!-- Multi Tab Page -->
              <div class="row" v-if="tabs.length > 1">
                <div class="col">
                  <q-tabs
                    v-model="tab"
                    active-color="primary"
                    align="left"
                    dense
                    no-caps
                  >
                    <q-tab
                      v-for="tab in tabs"
                      :key="tab"
                      :name="tab"
                      :label="
                        tab !== 'attributes'
                          ? $t(`${scope}.editor.tab.${tab}.name`)
                          : $t('label.attributes')
                      "
                    />
                  </q-tabs>
                  <q-tab-panels v-model="tab" keep-alive>
                    <q-tab-panel v-for="tab in tabs" :key="tab" :name="tab">
                      <slot v-if="tab !== 'attributes'" :name="`tab-${tab}`" />
                      <tab-attributes v-if="tab === 'attributes'" />
                    </q-tab-panel>
                  </q-tab-panels>
                </div>
              </div>
            </div>
          </q-scroll-area>
          <q-separator />
          <div class="row items-center editor-buttons">
            <div class="col-4 q-gutter-x-xs">
              <slot name="buttons" />
            </div>
            <div class="col-4 text-center q-gutter-x-md">
              <div v-if="_mode !== 'create' && document" class="text-hint">
                <div v-if="document.data.meta?.created">
                  {{ $t('label.created') }}
                  {{ document.data.meta?.created.by }}
                  {{ $t('label.at') }}
                  {{
                    Backend.backendService.formatTimestamp(
                      document.data.meta?.created.at,
                      session.account as IAccount | undefined
                    )
                  }}
                </div>
                <div v-if="document.data.meta?.altered">
                  {{ $t('label.altered') }}
                  {{ document.data.meta?.altered.by }}
                  {{ $t('label.at') }}
                  {{
                    Backend.backendService.formatTimestamp(
                      document.data.meta?.altered.at,
                      session.account as IAccount | undefined
                    )
                  }}
                </div>
              </div>
            </div>
            <div class="col-4 text-right q-gutter-x-md">
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

.q-tab-panel {
  color: $text-color-light;
  background-color: transparent;
  padding: 16px 0;
}
.body--dark .q-tab-panel {
  color: $text-color-dark;
}

.q-dark {
  background-color: transparent;
}
</style>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRunTask } from 'src/script/ui/composable';
import { computed } from 'vue';
import { useSessionStore } from 'stores/session-store';
import { Backend } from 'src/script/backend/Backend';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { IProjectDocument } from 'src/script/backend/api/IProjectDocument';
import { IProjectDocumentData } from 'src/script/backend/api/IProjectDocumentData';
import { IAccount } from 'src/script/backend/api/IAccount';
import AppButton from 'components/application/controls/AppButton.vue';
import AppInput from 'components/application/controls/AppInput.vue';
import TabAttributes from 'components/application/attributes/TabAttributes.vue';

const route = useRoute();
const router = useRouter();
const runTask = useRunTask();
const session = useSessionStore();

const name = ref('');
const description = ref('');
const tab = ref('');

const props = defineProps<{
  scope: EDocumentType;
  tabs: string[];
  document?: IProjectDocument<IProjectDocumentData> | null;
  createHandler: () => Promise<void>;
  editHandler: (
    document: IProjectDocument<IProjectDocumentData>
  ) => Promise<void>;
  submitHandler: (
    mode: string,
    name: string,
    description: string | null
  ) => Promise<string>;
}>();

const emit = defineEmits<{
  (e: 'document:created', id: string): void;
}>();

const _mode = computed(() => route.params.mode as string);

onBeforeMount(() => {
  if (!session.account) {
    router.push('/');
  } else {
    session.editorLock = true;
    tab.value = props.tabs.length > 0 ? props.tabs[0] : '';
    runTask(async () => {
      if (_mode.value === 'create') {
        name.value = '';
        description.value = '';
        await props.createHandler();
      } else if (_mode.value === 'edit' && props.document) {
        name.value = props.document.data.name;
        description.value = props.document.data.description ?? '';
        await props.editHandler(props.document);
      }
    });
  }
});

onUnmounted(() => {
  session.editorLock = false;
});

function onSubmit(): void {
  runTask(async () => {
    const id = await props.submitHandler(
      _mode.value,
      name.value.trim(),
      description.value.trim() === '' ? null : description.value
    );
    emit('document:created', id);
    await router.push('/');
  });
}
</script>
