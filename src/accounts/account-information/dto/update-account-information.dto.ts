import { Allow } from "class-validator";

export class UpdateAccountInformationDto {
  @Allow()
  name: string;
  @Allow()
  surname: string;
  @Allow()
  date_of_birth: Date;
}