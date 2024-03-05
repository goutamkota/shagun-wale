import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { AppService } from "../app.service";
import { MenuModule } from "../menu/menu.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService, AppService],
  imports: [MenuModule]
})
export class OrderModule {
}
