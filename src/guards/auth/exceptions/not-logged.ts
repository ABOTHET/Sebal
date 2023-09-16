import { HttpException, HttpStatus } from "@nestjs/common";

export class YouAreNotLoggedIn extends HttpException {
  constructor() {
    super('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
  }
}