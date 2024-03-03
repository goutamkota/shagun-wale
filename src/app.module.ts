import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, UserModule, MenuModule, OrderModule],
  providers: [
    AppService
  ]
})
export class AppModule {
}
