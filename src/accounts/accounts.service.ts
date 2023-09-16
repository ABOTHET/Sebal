import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./entities/account.entity";
import { AccountBusy } from "./exceptions/account-busy";
import { env } from "process";
import * as bcrypt from 'bcrypt';
import { AccountInformationService } from "./account-information/account-information.service";
import { AccountInformation } from "./account-information/entities/account-information.entity";
import { CreateAccountInformationDto } from "./account-information/dto/create-account-information.dto";
import { MyJwtService } from "../jwt/my-jwt.service";
import { RefreshToken } from "../refresh_tokens/entities/refresh-token.entity";
import { RefreshTokensService } from "../refresh_tokens/refresh-tokens.service";
import { CreateRefreshTokenDto } from "../refresh_tokens/dto/create-refresh-token.dto";

@Injectable()
export class AccountsService {

  constructor(@InjectModel(Account) private accountsRepository: typeof Account,
              private accInfService: AccountInformationService,
              private myJwtService: MyJwtService,
              private refreshTokenService: RefreshTokensService) {
  }
  async create(createAccountDto: CreateAccountDto) {
    const accountFromDatabase: Account = await this.findOneByEmail(createAccountDto.email);
    if (accountFromDatabase) {
      throw new AccountBusy();
    }
    const hashPassword: string = await bcrypt.hash(createAccountDto.password, Number(env["SALT"]));
    const accountData: CreateAccountDto = {...createAccountDto, password: hashPassword};
    const created_account: Account = await this.accountsRepository.create(accountData);
    const createAccInfDto: CreateAccountInformationDto = {account_id: created_account.id};
    const accInf: AccountInformation = await this.accInfService.create(createAccInfDto);
    await created_account.$set("account_information", accInf.id);
    const tokens = await this.myJwtService.generateTokens(created_account);
    const createRefreshTokenDto: CreateRefreshTokenDto =
      {account_id: created_account.id, refresh_token: tokens.refresh_token};
    const refreshTokenFromDatabase: RefreshToken = await this.refreshTokenService.create(createRefreshTokenDto);
    await created_account.$set("refresh_token", refreshTokenFromDatabase.id);
    return {
      ...tokens,
      created_account
    }
  }

  async findAll(allAtr: boolean = false) {
    let accountsFromDatabase: Account[];
    let options = {};
    if (allAtr == true) {
      const opt = {
        include: {all: true}
      }
      options = {...options, ...opt};
    }
    accountsFromDatabase = await this.accountsRepository.findAll(options);
    return accountsFromDatabase;
  }

  async findOneById(id: number, allAtr: boolean = false) {
    let accountFromDatabase: Account;
    let options = {};
    if (allAtr == true) {
      const opt = {
        include: {all: true}
      }
      options = {...options, ...opt};
    }
    accountFromDatabase = await this.accountsRepository.findByPk(id, options);
    return accountFromDatabase;
  }

  async findOneByEmail(email: string, allAtr: boolean = false) {
    let accountFromDatabase: Account;
    let options = {
      where: {email: email}
    };
    if (allAtr == true) {
      const opt = {
        include: {all: true}
      }
      options = {...options, ...opt};
    }
    accountFromDatabase = await this.accountsRepository.findOne(options);
    return accountFromDatabase;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
