import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { UpdateAccountDto } from "../dto/update-account.dto";
import { AccountInformationService } from "./account-information.service";
import { UpdateAccountInformationDto } from "./dto/update-account-information.dto";
import { AccountPayload } from "../../jwt/payload/account-payload";
import { Payload } from "../../decorators/account-payload/account-payload.decorator";
import { AuthGuard } from "../../guards/auth/auth.guard";

@Controller('account-information')
export class AccountInformationController {

  constructor(private accInfService: AccountInformationService) {
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@Payload() accountPayload: AccountPayload, @Body() updateAccInfDto: UpdateAccountInformationDto) {
    return this.accInfService.update(+accountPayload.id, updateAccInfDto);
  }

}
