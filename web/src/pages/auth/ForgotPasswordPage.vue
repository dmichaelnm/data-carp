<template>
  <authentication-page :message="$t('auth.forgotPassword.message')">
    <q-form @submit="onSubmit">
      <div class="q-col-gutter-y-md">
        <div class="row q-col-gutter-x-md">
          <div class="col">
            <app-input
              v-model="email"
              :label="$t('label.email')"
              :auto-focus="email === ''"
              :error="emailError"
              auto-complete="username"
              mandatory
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <app-button
              :label="$t('auth.forgotPassword.button.send')"
              type="submit"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <app-button
              button-style="link"
              :label="$t('button.back')"
              to="/auth/login"
            />
          </div>
        </div>
      </div>
    </q-form>
  </authentication-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useRunTask } from 'src/script/ui/composable';
import { useMessageDialog } from 'src/script/ui/messageDialog';
import { useRouter } from 'vue-router';
import { Backend } from 'src/script/backend/Backend';
import { FirebaseError } from 'firebase/app';
import AppButton from 'components/application/controls/AppButton.vue';
import AppInput from 'components/application/controls/AppInput.vue';
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';

const i18n = useI18n();
const quasar = useQuasar();
const runTask = useRunTask();
const messageDialog = useMessageDialog();
const router = useRouter();

const email = ref('');
const emailError = ref('');

onBeforeMount(() => {
  email.value = quasar.cookies.get('email') ?? '';
});

function onSubmit(): void {
  emailError.value = '';

  runTask(
    async () => {
      await Backend.accountService.sendPasswordResetEmail(email.value);
      messageDialog(
        'success',
        i18n.t('auth.forgotPassword.dialog.success.title'),
        i18n.t('auth.forgotPassword.dialog.success.message'),
        () => {
          router.push('/auth/login');
        }
      );
    },
    (error) => {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          emailError.value = i18n.t('auth.error.emailInvalid');
          return true;
        }
      }
      return false;
    }
  );
}
</script>
