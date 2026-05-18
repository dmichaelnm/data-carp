import { AccountServiceFirebase } from 'src/script/backend/firebase/AccountServiceFirebase';
import { IAccountService } from 'src/script/backend/api/IAccountService';
import { IProjectService } from 'src/script/backend/api/IProjectService';
import { ProjectServiceFirebase } from 'src/script/backend/firebase/ProjectServiceFirebase';

export class Backend {
  static readonly accountService: IAccountService =
    new AccountServiceFirebase();

  static readonly projectService: IProjectService =
    new ProjectServiceFirebase();
}
