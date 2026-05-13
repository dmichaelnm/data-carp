<template>
  <q-page class="flex flex-center">
    <div class="auth-frame">
      <div class="auth-frame-padding-bottom auth-frame-message" v-if="message">
        {{ message }}
      </div>
      <div class="auth-frame-padding-top auth-frame-padding-bottom">
        <slot />
      </div>
      <div style="margin-top: 32px">
        <div class="row q-col-gutter-x-md items-center">
          <div class="col">
            <app-button
              button-style="icon"
              :icon="quasar.dark.isActive ? 'o_light_mode' : 'o_dark_mode'"
              :tooltip="
                quasar.dark.isActive
                  ? $t('tooltip.lightMode')
                  : $t('tooltip.darkMode')
              "
              @click="toggleDarkMode"
            />
          </div>
          <div class="col">
            <app-select
              v-model="language"
              :options="languageOptions"
              :label="$t('label.language')"
              translate
              @update:model-value="setLanguage"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.auth-frame {
  width: 600px;
  padding: 32px;
  background-color: $frame-background-light;
  border-radius: 8px;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
}
.body--dark .auth-frame {
  background-color: $frame-background-dark;
}

.auth-frame-padding-top {
  padding-top: 16px;
}
.auth-frame-padding-bottom {
  padding-bottom: 16px;
}
.auth-frame-message {
}
</style>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { onBeforeMount, ref } from 'vue';
import { languageOptions, getDefaultLanguage } from 'src/script/ui/options';
import AppButton from 'components/controls/AppButton.vue';
import AppSelect from 'components/controls/AppSelect.vue';

const quasar = useQuasar();
const i18n = useI18n();

const language = ref('en-US');

defineProps<{
  message?: string;
}>();

onBeforeMount(() => {
  const darkMode = quasar.cookies.get('darkMode') === 'true';
  quasar.dark.set(darkMode);
  language.value = quasar.cookies.get('language') ?? getDefaultLanguage();
  i18n.locale.value = language.value;
});

function toggleDarkMode(): void {
  quasar.dark.toggle();
  quasar.cookies.set('darkMode', quasar.dark.isActive.toString(), {
    expires: 365,
  });
}

function setLanguage(): void {
  i18n.locale.value = language.value;
  quasar.cookies.set('language', language.value, {
    expires: 365,
  });
}
</script>
