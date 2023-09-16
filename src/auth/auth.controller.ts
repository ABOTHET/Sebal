import { Body, Controller, Post, UseGuards, Request, Res } from "@nestjs/common";
import { LoginAccountDto } from "./dto/login-account.dto";
import { Account } from "../accounts/entities/account.entity";
import { AuthService } from "./auth.service";
import { AccountModel } from "../accounts/models/account.model";
import { env } from "process";
import { Response } from "express";
import { Payload } from "../decorators/account-payload/account-payload.decorator";
import { AccountPayload } from "../jwt/payload/account-payload";
import { AuthGuard } from "../guards/auth/auth.guard";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('login')
  async login(@Body() loginAccountDto: LoginAccountDto, @Res({passthrough: true}) res: Response) {
    const data = await this.authService.login(loginAccountDto);
    const accountFromDatabase: Account = data.accountFromDatabase;
    const accountModel: AccountModel = new AccountModel(accountFromDatabase);
    res.cookie("refresh_token", data.refresh_token, {httpOnly: true, maxAge: Number(env["MAX_AGE"])});
    return {
      access_token: data.access_token,
      ...accountModel
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Payload() accountPayload: AccountPayload, @Res({passthrough: true}) res: Response) {
    await this.authService.logout(+accountPayload.id);
    res.clearCookie("refresh_token");
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  async refresh(@Payload() accountPayload: AccountPayload, @Res({passthrough: true}) res: Response) {
    const tokens = await this.authService.refresh(+accountPayload.id);
    res.cookie("refresh_token", tokens.refresh_token, {httpOnly: true, maxAge: Number(env["MAX_AGE"])});
    return {
      access_token: tokens.access_token
    }
  }

}
