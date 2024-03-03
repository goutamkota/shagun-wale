import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AppService } from '../app.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, AppService]
})
export class OrderModule {}
