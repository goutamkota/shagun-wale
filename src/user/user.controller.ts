import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { AllowAdmin } from "../decorators/allowAdmin.decorator";

// @AllowAdmin()
@Controller("user")
export class UserController {

  constructor(private userService: UserService) {}

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
