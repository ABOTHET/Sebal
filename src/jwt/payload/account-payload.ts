import { Account } from "../../accounts/entities/account.entity";

export class AccountPayload {

  id: number;
  email: string;

  constructor(account: Account) {
    this.id = account.id;
    this.email = account.email;
  }

}