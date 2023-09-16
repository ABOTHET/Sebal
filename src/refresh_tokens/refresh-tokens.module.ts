import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { RefreshToken } from "./entities/refresh-token.entity";

@Module({
  providers: [RefreshTokensService],
  imports: [SequelizeModule.forFeature([RefreshToken])],
  exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
