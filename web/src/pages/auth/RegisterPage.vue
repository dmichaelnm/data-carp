<template>
  <authentication-page :message="$t('auth.register.message')">
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
          <app-input v-model="email" :label="$t('label.email')" mandatory />
        </div>
      </div>
      <div class="row q-col-gutter-x-md">
        <div class="col">
          <app-input
            v-model="password"
            :label="$t('label.password')"
            type="password"
            mandatory
          />
        </div>
        <div class="col">
          <app-input
            v-model="confirmPassword"
            :label="$t('label.confirmPassword')"
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
  </authentication-page>
</template>

<script setup lang="ts">
import AuthenticationPage from 'components/auth/AuthenticationPage.vue';
import { ref } from 'vue';
import AppInput from 'components/controls/AppInput.vue';
import AppButton from 'components/controls/AppButton.vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>
