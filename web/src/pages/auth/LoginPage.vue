<template>
  <authentication-page :message="$t('auth.login.message')">
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
          <div class="col">
            <app-input
              v-model="password"
              :label="$t('label.password')"
              :auto-focus="email !== ''"
              :error="passwordError"
              type="password"
              auto-complete="current-password"
              mandatory
            />
          </div>
        </div>
        <div class="row q-col-gutter-md items-center">
          <div class="col text-right">
            <app-button :label="$t('auth.login.button.normal')" type="submit" />
          </div>
          <div class="col">
            <app-checkbox
              v-model="rememberMe"
              :label="$t('label.rememberMe')"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <app-button
              :label="$t('auth.register.button')"
              button-style="link"
              to="/auth/register"
            />
          </div>
          <div class="col text-center">
            <app-button
              :label="$t('auth.forgotPassword.button.link')"
              button-style="link"
              to="/auth/forgot-password"
            />
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <google-auth-button
              :label="$t('auth.login.button.google')"
              :width="250"
              @click="onSignInWithGoogle"
            />
          </div>
        </div>
      </div>
    </q-form>
  </authentication-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRunTask } from 'src/script/ui/composable';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useMessageDialog } from 'src/script/ui/messageDialog';
import { Backend } from 'src/script/backend/Backend';
import { FirebaseError } from 'firebase/app';
import AppButton from 'components/application/controls/AppButton.vue';
import AppCheckbox from 'components/application/controls/AppCheckbox.vue';
import AppInput from 'components/application/controls/AppInput.vue';
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';
import GoogleAuthButton from 'components/auth/GoogleAuthButton.vue';

const quasar = useQuasar();
const runTask = useRunTask();
const router = useRouter();
const i18n = useI18n();
const messageDialog = useMessageDialog();

const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const rememberMe = ref(false);

onBeforeMount(() => {
  email.value = quasar.cookies.get('email') ?? '';
  rememberMe.value = email.value !== '';
});

function onSubmit() {
  emailError.value = '';
  passwordError.value = '';

  runTask(
    async () => {
      const account = await Backend.accountService.signIn(
        email.value,
        password.value
      );
      if (rememberMe.value) {
        quasar.cookies.set('email', email.value, { expires: 365 });
      } else {
        quasar.cookies.remove('email');
      }
      account.data.state.lastLogin = new Date();
      await account.save();
      await router.push('/');
    },
    (error) => {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          emailError.value = i18n.t('auth.error.emailInvalid');
          return true;
        } else if (error.code === 'auth/invalid-credential') {
          passwordError.value = i18n.t('auth.error.invalidCredentials');
          return true;
        } else if (error.code === 'auth/account-not-active') {
          emailError.value = i18n.t('auth.error.accountNotActive');
          return true;
        } else if (error.code === 'auth/too-many-requests') {
          passwordError.value = i18n.t('auth.error.tooManyRequests');
          return true;
        }
      }
      return false;
    }
  );
}

function onSignInWithGoogle(): void {
  emailError.value = '';
  passwordError.value = '';

  runTask(
    async () => {
      const account = await Backend.accountService.signInWithGoogle(
        quasar.dark.isActive,
        i18n.locale.value
      );
      quasar.cookies.remove('email');
      account.data.state.lastLogin = new Date();
      await account.save();
      await router.push('/');
    },
    (error) => {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/account-not-active') {
          messageDialog(
            'error',
            i18n.t('auth.login.dialog.error.accountNotActive.title'),
            i18n.t('auth.login.dialog.error.accountNotActive.message')
          );
          return true;
        }
      }
      return false;
    }
  );
}
</script>
