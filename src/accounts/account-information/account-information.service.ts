import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { AccountInformation } from "./entities/account-information.entity";
import { CreateAccountInformationDto } from "./dto/create-account-information.dto";
import { UpdateAccountDto } from "../dto/update-account.dto";
import { UpdateAccountInformationDto } from "./dto/update-account-information.dto";

@Injectable()
export class AccountInformationService {

  constructor(@InjectModel(AccountInformation) private accInfRep: typeof AccountInformation,) {
  }

  async create(createAccInfDto: CreateAccountInformationDto) {
    const accInf: AccountInformation = await this.accInfRep.create(createAccInfDto);
    return accInf;
  }

  async update(id: number, updateAccInfDto: UpdateAccountInformationDto) {
    await this.accInfRep.update(updateAccInfDto, {where: {account_id: id}});
  }

}
