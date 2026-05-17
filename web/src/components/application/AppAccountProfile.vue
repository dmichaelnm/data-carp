<template>
  <profile-dialog v-model="profileDialogVisible" />

  <app-button
    :icon="_photoUrl ? undefined : 'account_circle'"
    button-style="icon"
    :tooltip="session.account?.getDisplayName()"
  >
    <q-avatar v-if="_photoUrl">
      <q-img :src="_photoUrl" referrerpolicy="no-referrer" />
    </q-avatar>
    <q-menu anchor="bottom right" self="top right" style="width: 225px">
      <q-list>
        <app-menu-item
          :label="$t(_modeLabel)"
          :icon="_modeIcon"
          @click="toggleDarkMode"
        />
        <app-menu-item
          :label="$t('button.language')"
          icon="language"
          hasSubMenu
        >
          <q-menu anchor="top left" self="top right" style="width: 225px">
            <q-list>
              <app-menu-item
                v-for="lo in languageOptions"
                :key="lo.value"
                :label="$t(lo.label)"
                :icon="lo.icon"
                :checked="
                  session.account?.data.preference.language === lo.value
                "
                @click="setLanguage(lo.value)"
              />
            </q-list>
          </q-menu>
        </app-menu-item>
        <app-menu-item
          :label="$t('button.profile')"
          icon="person"
          separator="above"
          @click="profileDialogVisible = true"
        />
        <app-menu-item
          :label="$t('button.signOut')"
          icon="logout"
          separator="above"
          @click="session.account?.signOut"
        />
      </q-list>
    </q-menu>
  </app-button>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useSessionStore } from 'stores/session-store';
import { languageOptions } from 'src/script/ui/options';
import AppButton from 'components/application/controls/AppButton.vue';
import AppMenuItem from 'components/application/controls/AppMenuItem.vue';
import ProfileDialog from 'components/application/dialogs/ProfileDialog.vue';

const i18n = useI18n();
const quasar = useQuasar();
const session = useSessionStore();

const profileDialogVisible = ref(false);

const _modeIcon = computed(() =>
  quasar.dark.isActive ? 'light_mode' : 'dark_mode'
);
const _modeLabel = computed(() =>
  quasar.dark.isActive ? 'button.lightMode' : 'button.darkMode'
);

const _photoUrl = computed(() => session.account?.data.profile.photoURL);

function toggleDarkMode(): void {
  quasar.dark.toggle();
  quasar.cookies.set('darkMode', quasar.dark.isActive.toString(), {
    expires: 365,
  });
  if (session.account) {
    session.account.data.preference.darkMode = quasar.dark.isActive;
    session.account.save();
  }
}

function setLanguage(language: string): void {
  i18n.locale.value = language;
  quasar.cookies.set('language', language, {
    expires: 365,
  });
  if (session.account) {
    session.account.data.preference.language = language;
    session.account.save();
  }
}
</script>
