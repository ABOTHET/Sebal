import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from "@nestjs/common";
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from "./entities/account.entity";
import { AccountModel } from "./models/account.model";
  import { Response } from "express";
import { AccountInformation } from "./account-information/entities/account-information.entity";
import { AccountInformationModel } from "./account-information/model/account-information.model";
import { env } from "process";
import { AuthGuard } from "../guards/auth/auth.guard";

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto, @Res({passthrough: true}) res: Response) {
    const data = await this.accountsService.create(createAccountDto);
    const accountModel: AccountModel = new AccountModel(data.created_account);
    res.cookie("refresh_token", data.refresh_token, {httpOnly: true, maxAge: Number(env["MAX_AGE"])});
    return {
      access_token: data.access_token,
      ...accountModel
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const accountsFromDatabase: Account[] = await this.accountsService.findAll(true);
    /*const accountModels: AccountModel[] = [];
    accountsFromDatabase.forEach((account: Account) => {
      const accountModel: AccountModel = new AccountModel(account);
      accountModels.push(accountModel);
    });*/
    const accountModels: AccountInformationModel[] = [];
    accountsFromDatabase.forEach((account: Account) => {
      const accountModel: AccountInformationModel = new AccountInformationModel(account);
      accountModels.push(accountModel);
    });
    return accountModels;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const accountFromDatabase: Account = await this.accountsService.findOneById(+id);
    const accountModel: AccountModel = new AccountModel(accountFromDatabase);
    return accountModel;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
