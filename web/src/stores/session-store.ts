import { defineStore } from 'pinia';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IProject } from 'src/script/backend/api/IProject';

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as IAccount | null,
    projects: [] as IProject[],
  }),
  getters: {},
  actions: {},
});
