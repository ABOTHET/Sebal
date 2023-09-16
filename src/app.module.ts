import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { env } from "process";
import { AccountsModule } from './accounts/accounts.module';
import { Account } from "./accounts/entities/account.entity";
import { AuthModule } from './auth/auth.module';
import { AccountInformation } from "./accounts/account-information/entities/account-information.entity";
import { MyJwtModule } from './jwt/my-jwt.module';
import { RefreshTokensModule } from './refresh_tokens/refresh-tokens.module';
import { RefreshToken } from "./refresh_tokens/entities/refresh-token.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/env/.env',
      isGlobal: true,
  }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: env["DB_HOST"],
      port: Number(env["DB_PORT"]),
      username: env["DB_USERNAME"],
      password: env["DB_PASSWORD"],
      database: env["DB_DATABASE"],
      models: [Account, AccountInformation, RefreshToken],
      synchronize: true,
      autoLoadModels: true,
      sync: {
        force: true
      },
    }),
    AccountsModule,
    AuthModule,
    MyJwtModule,
    RefreshTokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
