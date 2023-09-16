import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./entities/account.entity";
import { AccountInformationModule } from './account-information/account-information.module';
import { MyJwtModule } from "../jwt/my-jwt.module";
import { RefreshTokensModule } from "../refresh_tokens/refresh-tokens.module";

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [SequelizeModule.forFeature([Account]), AccountInformationModule, MyJwtModule, RefreshTokensModule],
  exports: [AccountsService]
})
export class AccountsModule {}
