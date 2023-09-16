import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from "../accounts/accounts.module";
import { MyJwtModule } from "../jwt/my-jwt.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [AccountsModule, MyJwtModule],
  exports: [AuthService]
})
export class AuthModule {}
