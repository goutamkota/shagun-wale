import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDto } from "../auth/dtos/createUser.dto";

@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Delete(":id")
  removeUser(@Param("id") id: string) {
    return this.userService.removeUser(id);
  }

  @Get("key")
  generateKey(
    @Query("email") email: string,
    @Query("phoneNumber") phoneNumber: string
  ) {
    return this.userService.generateKey(email, phoneNumber);
  }

  @Get()
  fetchUserList(@Query("id") id?: string) {
    return this.userService.fetchUserList(id);
  }
}
