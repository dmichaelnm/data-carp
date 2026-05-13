<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Backend } from 'src/script/backend/Backend';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(() => {
  Backend.accountService.onAuthenticationStateChanged((account) => {
    if (account === null) {
      router.push('/auth/login');
    } else {
      console.log('account', account);
    }
  });
});
</script>
