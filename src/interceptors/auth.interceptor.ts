import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";
import { DecodedJWT } from "../guards/auth.guard";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split("Bearer ")[1];
    try {
      const payload: DecodedJWT = jwt.verify(token, process.env.JWT_SECRET) as DecodedJWT;
      console.log(payload, "payload interceptor");
      if (payload) request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
