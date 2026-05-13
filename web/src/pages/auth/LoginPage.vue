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
        <div class="row q-col-gutter-md">
          <div class="col text-center">
            <app-button :label="$t('auth.login.button')" type="submit" />
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
import { Backend } from 'src/script/backend/Backend';
import { FirebaseError } from 'firebase/app';
import AppInput from 'components/application/controls/AppInput.vue';
import AppButton from 'components/application/controls/AppButton.vue';
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';

const quasar = useQuasar();
const runTask = useRunTask();
const router = useRouter();
const i18n = useI18n();

const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');

onBeforeMount(() => {
  email.value = quasar.cookies.get('email') ?? '';
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
      if (account.data.state.active) {
        quasar.cookies.set('email', email.value, { expires: 365 });
        account.data.state.lastLogin = new Date();
        await account.save();
        await router.push('/');
      } else {
        throw new FirebaseError(
          'auth/account-not-active',
          'The account is not active (auth/account-not-active).'
        );
      }
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
</script>
