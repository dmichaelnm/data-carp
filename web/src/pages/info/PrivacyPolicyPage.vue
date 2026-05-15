<script setup lang="ts"></script>
<template>
  <q-page class="flex flex-center">
    <div class="info-page">
      <q-scroll-area style="height: calc(100vh - 128px)">
        <h4>{{ $t('info.privacyPolicy.title') }}</h4>
        <h5>{{ $t('info.privacyPolicy.cookies.title') }}</h5>
        <p>{{ $t('info.privacyPolicy.cookies.message1') }}</p>
        <p>{{ $t('info.privacyPolicy.cookies.message2') }}</p>
        <ul>
          <li>
            <p>{{ $t('info.privacyPolicy.cookies.message3') }}</p>
            <p>{{ $t('info.privacyPolicy.cookies.message4') }}</p>
          </li>
          <li>
            <p>{{ $t('info.privacyPolicy.cookies.message5') }}</p>
            <p>{{ $t('info.privacyPolicy.cookies.message6') }}</p>
          </li>
        </ul>
        <p>{{ $t('info.privacyPolicy.cookies.message7') }}</p>
        <p>{{ $t('info.privacyPolicy.cookies.message8') }}</p>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';
.info-page {
  width: 800px;
  padding: 32px;
}
</style>
