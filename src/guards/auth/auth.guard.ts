import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyJwtService } from "../../jwt/my-jwt.service";
import { AccountPayload } from "../../jwt/payload/account-payload";
import { YouAreNotLoggedIn } from "./exceptions/not-logged";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private myJwtService: MyJwtService) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization: string = req.headers.authorization;
    try {
      const [bearer, token] = authorization.split(" ");
      const isValid: AccountPayload = await this.myJwtService.verifyAccessToken(token);
      if (!isValid) {
        throw new YouAreNotLoggedIn();
      }
      req.accountPayload = isValid;
    } catch (error) {
      throw new YouAreNotLoggedIn();
    }
    return true;
  }
}
