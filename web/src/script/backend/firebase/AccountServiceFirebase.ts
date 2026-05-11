import { IAccountService } from 'src/script/backend/api/IAccountService';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from 'boot/firebase';

export class AccountServiceFirebase implements IAccountService {
  onAuthenticationStateChanged(
    callback: (account: IAccountService | null) => void
  ) {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user === null) {
        callback(null);
      }
    });
  }
}
