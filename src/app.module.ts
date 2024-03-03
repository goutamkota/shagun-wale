import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [AuthModule, CategoryModule, UserModule, BookingModule],
  providers: [
    AppService
  ]
})
export class AppModule {
}
