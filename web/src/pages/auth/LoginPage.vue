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
              auto-complete="username"
              mandatory
            />
          </div>
          <div class="col">
            <app-input
              v-model="password"
              :label="$t('label.password')"
              :auto-focus="email !== ''"
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
              :label="$t('auth.forgotPassword.button')"
              button-style="link"
            />
          </div>
        </div>
      </div>
    </q-form>
  </authentication-page>
</template>

<script setup lang="ts">
import AppInput from 'components/controls/AppInput.vue';
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';
import { ref } from 'vue';
import AppButton from 'components/controls/AppButton.vue';

const email = ref('');
const password = ref('');

function onSubmit() {
  console.log('submit');
}
</script>
