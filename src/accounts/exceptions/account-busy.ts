import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountBusy extends HttpException {
  constructor() {
    super('Данный аккаунт уже существует', HttpStatus.BAD_REQUEST);
  }
}