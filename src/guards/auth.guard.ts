import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "../prisma/prisma.service";
import { Reflector } from "@nestjs/core";
import * as process from "process";
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
    private prisma: PrismaService,
    private readonly reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowAdmin = this.reflector.getAllAndOverride<boolean>("allowAdmin", [
      context.getHandler(),
      context.getClass()
    ]);
    return this.verifyTokenAndUser(context, allowAdmin);
  }

  // route: Route {
  // path: '/auth/signup',


  private async verifyTokenAndUser(context: ExecutionContext, forAdmin: boolean): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers["authorization"]?.split("Bearer ")[1];
    if (!token) return request.route.path.includes("auth");

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET) as DecodedJWT;
      const user: User = await this.prisma.user.findUnique(
        {
          where: { id }
        }
      );
      if (forAdmin && (!user || !user.isAdmin)) return false;
      if (!user) return false;
    } catch (error) {
      return false;
    }
    return true;
  }
}
