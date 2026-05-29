import { IBackendService } from 'src/script/backend/api/IBackendService';
import { Timestamp } from 'firebase/firestore';
import { IAccount } from 'src/script/backend/api/IAccount';

export class BackendServiceFirebase implements IBackendService {
  formatTimestamp(
    ts: unknown,
    account?: IAccount | undefined
  ): string | undefined {
    const locale = account?.data.preference.language || 'en-US';
    if (ts instanceof Timestamp) {
      return ts.toDate().toLocaleString(locale);
    } else if (ts instanceof Date) {
      return ts.toLocaleString(locale);
    }
    return '??';
  }
}
