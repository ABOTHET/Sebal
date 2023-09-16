import { Module } from '@nestjs/common';
import { AccountInformationService } from './account-information.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountInformation } from "./entities/account-information.entity";
import { AccountInformationController } from './account-information.controller';
import { MyJwtModule } from "../../jwt/my-jwt.module";

@Module({
  controllers: [AccountInformationController],
  providers: [AccountInformationService],
  imports: [SequelizeModule.forFeature([AccountInformation]), MyJwtModule],
  exports: [AccountInformationService],
})
export class AccountInformationModule {

}
