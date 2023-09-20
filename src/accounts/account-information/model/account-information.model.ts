import { AccountModel } from "../../models/account.model";
import { Account } from "../../entities/account.entity";
import { AccountInformation } from "../entities/account-information.entity";

export class AccountInformationModel extends AccountModel {

  id: number;
  name: string;
  surname: string;
  date_of_birth: Date;
  photo_id: number;
  constructor(account: Account) {
    super(account);
    const accInf: AccountInformation = account.account_information;
    this.name = accInf.name;
    this.surname = accInf.surname;
    this.date_of_birth = accInf.date_of_birth;
    this.photo_id = accInf.photo_id;
    this.id = account.id;
  }
}