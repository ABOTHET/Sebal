import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from "../accounts/accounts.module";
import { MyJwtModule } from "../jwt/my-jwt.module";
import { RefreshTokensModule } from "../refresh_tokens/refresh-tokens.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [AccountsModule, MyJwtModule, RefreshTokensModule],
  exports: [AuthService]
})
export class AuthModule {}
