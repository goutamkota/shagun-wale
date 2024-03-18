import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";

export interface DecodedJWT {
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  id: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowAdmin = this.reflector.getAllAndOverride<boolean>("allowAdmin", [
      context.getHandler(),
      context.getClass()
    ]);
    console.log('called guard', allowAdmin);
    return this.verifyTokenAndUser(context, allowAdmin);
  }


  private async verifyTokenAndUser(context: ExecutionContext, forAdmin: boolean): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split("Bearer ")[1];
    if (!token) return false;

    try {
      const { id }: DecodedJWT = jwt.verify(token, process.env.JWT_SECRET) as DecodedJWT;
      const user: User = await this.prisma.user.findUnique({
        where: { id }
      });
      console.log(forAdmin && (!user || !user.isAdmin));
      if (forAdmin && (!user || !user.isAdmin)) return false;
      if (!user) return false;
    } catch (error) {
      return false;
    }

    return true;
  }
}
