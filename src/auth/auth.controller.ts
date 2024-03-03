import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { SignInDto } from "./dtos/signInCredentials.dto";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post("signup")
  signUp(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Post("signin")
  signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() updateInfo: CreateUserDto): Promise<Partial<User>> {
    return this.authService.updateUser(id, updateInfo);
  }

}

