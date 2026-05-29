import { IAccount } from 'src/script/backend/api/IAccount';

export interface IBackendService {
  formatTimestamp(ts: unknown, account?: IAccount | undefined): string | undefined;
}
