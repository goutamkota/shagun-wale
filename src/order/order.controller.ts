import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/orderDto.dto';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.orderService.getOrder(id);
  }

  @Post('/createOrder')
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Post('/updateOrder/:id')
  updateOrder(@Param('id') id: string, @Body() orderDto: Partial<OrderDto & { idMenuChange: number }>) {
    if (!isNumber(Number(id))) throw new BadRequestException('Please provide number as param!');
    return this.orderService.updateOrder(Number(id), orderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
