import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { AppService } from "../app.service";
import { SignInDto } from "./dtos/signInCredentials.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import { User } from "@prisma/client";

export interface JWT_PAYLOAD {
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  id: string;
}

@Injectable()
export class AuthService {
  constructor(private prisma: AppService) {
  }

  async signUp(data: CreateUserDto): Promise<any> {
    const user: any = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phoneNumber: data.phoneNumber }
        ]
      }
    });

    if (user) {
      throw new UnauthorizedException("User already exist!");
    }

    if (data.productKey) {
      const validProductKey: string = `${data.email}-${data.phoneNumber}-${process.env.PRODUCT_KEY_SECRET}`;
      const isValidProductKey: boolean = await bcrypt.compare(validProductKey, data.productKey);
      if (!isValidProductKey) throw new UnauthorizedException();
      data.isAdmin = isValidProductKey;
      delete data.productKey;
    }

    data.password = await this.hashPassword(data.password);

    const fetchedUser: User = await this.prisma.user.create({
      data
    });

    if (!fetchedUser) throw new InternalServerErrorException("Unable to create user!");

    const token: string = this.generateToken(fetchedUser);
    if (!token) throw new InternalServerErrorException("Unable create token. Try again!");

    return {
      message: "User Created Successfully!",
      token
    };
  }

  async signIn(data: SignInDto) {
    let user: User;
    if (data.email) {
      user = await this.prisma.user.findUnique({
        where: { email: data.email }
      });
    } else {
      user = await this.prisma.user.findUnique({
        where: { phoneNumber: data.phoneNumber }
      });
    }

    if (!user) throw new NotFoundException("User not found with provide credentials!");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const token: string = this.generateToken(user);
    if (!token) throw new InternalServerErrorException("Unable create token. Try again!");

    return {
      message: "Signed In Successfully!",
      token
    };
  }

  async updateUser(id: string, data: any): Promise<Partial<User>> {

    const user: User = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) throw new NotFoundException("Invalid User!");

    const updatedUser: User = await this.prisma.user.update({
      where: { id },
      data
    });

    if (!updatedUser) throw new InternalServerErrorException("Unable to update the user info!");

    return Object.assign(updatedUser, { password: undefined });
  }

  generateToken(user: User) {
    const { email, phoneNumber, isAdmin, id } = user;
    const insertPayload: JWT_PAYLOAD | Partial<User> = { email, phoneNumber, isAdmin, id };
    return jwt.sign(insertPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }

  async hashPassword(password: string) {
    const salt: string = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    return password;
  }
}
