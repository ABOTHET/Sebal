import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Account } from "../accounts/entities/account.entity";
import { AccountPayload } from "./payload/account-payload";
import { env } from "process";

@Injectable()
export class MyJwtService {

  constructor(private jwt: JwtService) {
  }

  async generateTokens(account: Account) {
    const accountPayload: AccountPayload = new AccountPayload(account);
    const tokens = {
      access_token: await this.jwt.signAsync({ ...accountPayload }, {
        secret: env["ACCESS_KEY"],
        expiresIn: env["ACCESS_LIVE"]
      }),
      refresh_token: await this.jwt.signAsync({ ...accountPayload }, {
        secret: env["REFRESH_KEY"],
        expiresIn: env["REFRESH_LIVE"]
      }),
    }
    return tokens;
  }

  async verifyAccessToken(access_token: string) {
    try {
      const accountPayload: AccountPayload = await this.jwt.verifyAsync(access_token, {
        secret: env["ACCESS_KEY"],
      });
      return accountPayload;
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(refresh_token: string) {
    try {
      const accountPayload: AccountPayload = await this.jwt.verifyAsync(refresh_token, {
        secret: env["REFRESH_KEY"]
      });
      return accountPayload;
    } catch (error) {
      return null;
    }
  }

}
