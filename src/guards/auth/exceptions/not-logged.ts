import { HttpException, HttpStatus } from "@nestjs/common";

export class YouAreNotLoggedIn extends HttpException {
  constructor(message: string = "Вы не авторизованы") {
    super(`${message}`, HttpStatus.UNAUTHORIZED);
  }
}