import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { MenuModule } from "../menu/menu.module";
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [MenuModule, PrismaModule]
})
export class OrderModule {
}
