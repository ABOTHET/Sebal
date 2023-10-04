import { Injectable } from '@nestjs/common';
import { LoginAccountDto } from "./dto/login-account.dto";
import { AccountsService } from "../accounts/accounts.service";
import { Account } from "../accounts/entities/account.entity";
import { AccountDoesNotExists } from "./exceptions/account-does-not-exists";
import * as bcrypt from "bcrypt";
import { IncorrectData } from "./exceptions/incorrect-data";
import { MyJwtService } from "../jwt/my-jwt.service";
import { RefreshToken } from "../refresh_tokens/entities/refresh-token.entity";
import { YouAreNotLoggedIn } from "../guards/auth/exceptions/not-logged";
import { RefreshTokensService } from "../refresh_tokens/refresh-tokens.service";

@Injectable()
export class AuthService {

  constructor(private accountsService: AccountsService, private myJwtService: MyJwtService, private refreshTokensService: RefreshTokensService) {
  }

  async login(loginAccountDto: LoginAccountDto) {
    const accountFromDatabase: Account = await this.accountsService
      .findOneByEmail(loginAccountDto.email, true);
    if (!accountFromDatabase) {
      throw new AccountDoesNotExists();
    }
    const isValid: boolean = await bcrypt
      .compare(loginAccountDto.password, accountFromDatabase.password);
    if (!isValid) {
      throw new IncorrectData();
    }
    const tokens = await this.myJwtService.generateTokens(accountFromDatabase);
    const refreshTokenFromDatabase: RefreshToken = accountFromDatabase.refresh_token;
    await refreshTokenFromDatabase.update({refresh_token: tokens.refresh_token});
    return {
      ...tokens,
      accountFromDatabase
    }
  }

  async logout(account_id: number) {
    const accountFromDatabase: Account = await this.accountsService.findOneById(account_id, true);
    const refreshToken: RefreshToken = accountFromDatabase.refresh_token;
    await refreshToken.update({refresh_token: ""});
  }

  async refresh(refresh_token: string) {
    const refreshTokenFromDatabase: RefreshToken = await this.refreshTokensService.findOneByRefreshToken(refresh_token);
    const isVerify = await this.myJwtService.verifyRefreshToken(refresh_token);
    const isValid = refreshTokenFromDatabase.refresh_token == refresh_token;
    if (!isVerify || !isValid) {
      throw new YouAreNotLoggedIn("bad refresh token");
    }
    const tokens = await this.myJwtService.generateTokens(refreshTokenFromDatabase.account);
    await refreshTokenFromDatabase.update({refresh_token: tokens.refresh_token});
    return tokens;
  }

}
