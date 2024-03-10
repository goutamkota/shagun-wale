import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as process from "process";
import { User } from "@prisma/client";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async removeUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user) throw new NotFoundException("User not found");
    if (user.isAdmin) throw new UnauthorizedException("Admin cannot be deleted!");
    try {
      await this.prisma.user.delete({
        where: { id }
      });
      return { message: "User Deleted Successfully!" };
    } catch (e) {
      e.message = "Unable to delete the user";
      throw new InternalServerErrorException(e);
    }
  }

  generateKey(email: string, phoneNumber: string) {
    const key: string = `${email}-${phoneNumber}-${process.env.PRODUCT_KEY_SECRET}`;
    return bcrypt.hash(key, 10);
  }

  async fetchUserList(id: string) {

    const users: User[] | User = await this.prisma.user.findMany(
      {
        where: { id }
      }
    );

    if (!users) throw new NotFoundException();

    if (!users.length) return { message: "No users found!" };

    if (users.length == 1) return Object.assign(users[0], { password: undefined });

    return users.map((user: User) => {
      const { password, ...rest } = user;
      return rest;
    });

  }

}