import { defineStore } from 'pinia';
import { IAccount } from 'src/script/backend/api/IAccount';

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as IAccount | null,
  }),
  getters: {},
  actions: {},
});
