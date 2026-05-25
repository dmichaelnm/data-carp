<template>
  <app-dialog
    v-model="_modelValue"
    :width="500"
    :buttons="[
      { value: 'okay', label: 'button.okay', type: 'submit' },
      { value: 'cancel', label: 'button.cancel', buttonStyle: 'link' },
    ]"
    :submit-handler="onSubmit"
    :close-handler="onCancel"
    @dialog:opened="onDialogOpened"
  >
    <div>
      <div class="row q-col-gutter-x-md">
        <div class="col-auto">
          <div class="text-center">
            <account-profile-picture :photo-url="photoURL" :size="128" />
          </div>
          <div class="text-center">
            <app-button
              button-style="link"
              :label="$t('button.uploadPhoto')"
              @click="fileInputRef?.click()"
            />
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFileSelected"
            />
          </div>
          <div class="text-center" v-if="photoURL">
            <app-button
              button-style="link"
              :label="$t('button.removePhoto')"
              @click="photoURL = null"
            />
          </div>
        </div>
        <div class="col-grow q-gutter-y-md">
          <div>
            <app-input v-model="email" :label="$t('label.email')" read-only />
          </div>
          <div>
            <app-input
              v-model="firstName"
              :label="$t('label.firstName')"
              mandatory
            />
          </div>
          <div>
            <app-input
              v-model="lastName"
              :label="$t('label.lastName')"
              mandatory
            />
          </div>
        </div>
      </div>
    </div>
  </app-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSessionStore } from 'src/stores/session-store';
import { Backend } from 'src/script/backend/Backend';
import { TDialogButton } from 'src/script/ui/types';
import AppDialog from '../controls/AppDialog.vue';
import AppInput from 'src/components/application/controls/AppInput.vue';
import AppButton from 'src/components/application/controls/AppButton.vue';
import AccountProfilePicture from 'components/application/account/AccountProfilePicture.vue';

const session = useSessionStore();

const fileInputRef = ref<HTMLInputElement | null>(null);

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const photoURL = ref<string | null>(null);

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const _modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

function onDialogOpened(): void {
  if (session.account) {
    email.value = session.account.data.profile.email;
    firstName.value = session.account.data.profile.firstName;
    lastName.value = session.account.data.profile.lastName;
    photoURL.value = session.account.data.profile.photoURL;
  }
}

async function onFileSelected(event: Event): Promise<void> {
  const account = session.account;
  if (account) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      photoURL.value = await Backend.accountService.uploadPhoto(file);
    }
  }
}

async function onSubmit(): Promise<boolean> {
  if (session.account) {
    if (
      session.account.data.profile.photoURL &&
      (!photoURL.value ||
        session.account.data.profile.photoURL !== photoURL.value)
    ) {
      console.log('session', session.account.data.profile.photoURL);
      console.log('photoURL', photoURL.value);
      await Backend.accountService.removePhoto(
        session.account.data.profile.photoURL
      );
    }
    session.account.data.profile.firstName = firstName.value;
    session.account.data.profile.lastName = lastName.value;
    session.account.data.profile.photoURL = photoURL.value;
    await session.account.save();
  }
  return true;
}

async function onCancel(button: TDialogButton): Promise<void> {
  if (button.value === 'cancel' && session.account) {
    if (
      photoURL.value &&
      (!session.account.data.profile.photoURL ||
        photoURL.value != session.account.data.profile.photoURL)
    ) {
      await Backend.accountService.removePhoto(photoURL.value);
    }
  }
}
</script>
