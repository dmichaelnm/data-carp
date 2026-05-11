export interface IAccountService {
  onAuthenticationStateChanged(
    callback: (account: IAccountService | null) => void
  ): void;
}
