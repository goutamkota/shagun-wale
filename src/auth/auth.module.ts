import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AppService } from "../app.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AppService]
})
export class AuthModule {
}