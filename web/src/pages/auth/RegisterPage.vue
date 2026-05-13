<template>
  <authentication-page :message="$t('auth.register.message')">
    <q-form @submit="onSubmit">
      <div class="q-col-gutter-y-md">
        <div class="row q-col-gutter-x-md">
          <div class="col">
            <app-input
              v-model="firstName"
              :label="$t('label.firstName')"
              mandatory
              auto-focus
            />
          </div>
          <div class="col">
            <app-input
              v-model="lastName"
              :label="$t('label.lastName')"
              mandatory
            />
          </div>
        </div>
        <div class="row q-col-gutter-x-md">
          <div class="col">
            <app-input
              v-model="email"
              :label="$t('label.email')"
              :error="emailError"
              mandatory
            />
          </div>
        </div>
        <div class="row q-col-gutter-x-md">
          <div class="col">
            <app-input
              v-model="password"
              :label="$t('label.password')"
              :error="passwordError"
              type="password"
              mandatory
            />
          </div>
          <div class="col">
            <app-input
              v-model="confirmPassword"
              :label="$t('label.confirmPassword')"
              :error="confirmPasswordError"
              type="password"
              mandatory
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <app-button :label="$t('auth.register.button')" type="submit" />
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
import { ref } from 'vue';
import { useRunTask } from 'src/script/ui/composable';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useMessageDialog } from 'src/script/ui/messageDialog';
import { useRouter } from 'vue-router';
import { Backend } from 'src/script/backend/Backend';
import { FirebaseError } from 'firebase/app';
import AppButton from 'components/controls/AppButton.vue';
import AppInput from 'components/controls/AppInput.vue';
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';

const runTask = useRunTask();
const quasar = useQuasar();
const i18n = useI18n();
const messageDialog = useMessageDialog();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');

function onSubmit(): void {
  emailError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = i18n.t('auth.error.passwordConfirmInvalid');
    return;
  }

  runTask(
    async () => {
      await Backend.accountService.createAccount(
        firstName.value,
        lastName.value,
        email.value,
        password.value,
        quasar.dark.isActive,
        i18n.locale.value
      );
      quasar.cookies.set('email', email.value, { expires: 365 });
      messageDialog(
        'success',
        i18n.t('auth.register.dialog.success.title'),
        i18n.t('auth.register.dialog.success.message'),
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
        } else if (error.code === 'auth/email-already-in-use') {
          emailError.value = i18n.t('auth.error.emailAlreadyExists');
          return true;
        } else if (error.code === 'auth/weak-password') {
          passwordError.value = i18n.t('auth.error.passwordWeak');
          return true;
        }
      }
      return false;
    }
  );
}
</script>
