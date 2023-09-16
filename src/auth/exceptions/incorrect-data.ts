import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectData extends HttpException {
  constructor() {
    super('Неверные данные', HttpStatus.BAD_REQUEST);
  }
}