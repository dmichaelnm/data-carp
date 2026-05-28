import { defineStore } from 'pinia';
import { IAccount } from 'src/script/backend/api/IAccount';
import { IProject } from 'src/script/backend/api/IProject';
import { EDocumentType } from 'src/script/backend/api/IDocument';
import { EPermission } from 'src/script/backend/api/IProjectDocument';
import { Backend } from 'src/script/backend/Backend';

export const useSessionStore = defineStore('session', {
  state: () => ({
    account: null as IAccount | null,
    projects: [] as IProject[],
    project: null as IProject | null,
    editorLock: false,
  }),
  getters: {},
  actions: {
    hasPermission(type: EDocumentType, permission: EPermission): boolean {
      if (this.account === null || this.project === null) {
        return false;
      }
      const role = this.project.getRole(this.account);
      return Backend.hasPermission(type, permission, role);
    },
    reset() {
      this.account = null;
      this.projects = [];
      this.project = null;
      this.editorLock = false;
    },
  },
});
