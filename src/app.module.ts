import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MenuModule } from "./menu/menu.module";
import { OrderModule } from "./order/order.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthGuard } from "./guards/auth.guard";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@Module({
  imports: [AuthModule, UserModule, MenuModule, OrderModule, PrismaModule],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {
}
