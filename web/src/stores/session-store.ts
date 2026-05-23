import { defineStore } from 'pinia';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IProject } from 'src/script/backend/api/IProject';

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as IAccount | null,
    projects: [] as IProject[],
    project: null as IProject | null,
    editorLock: false,
  }),
  getters: {},
  actions: {
    reset() {
      this.account = null;
      this.projects = [];
      this.project = null;
      this.editorLock = false;
    }
  },
});
