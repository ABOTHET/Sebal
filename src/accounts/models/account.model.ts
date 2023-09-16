import { Account } from "../entities/account.entity";

export class AccountModel {

  id: number;
  email: string;

  constructor(account: Account) {
    this.id = account.id;
    this.email = account.email;
  }

}