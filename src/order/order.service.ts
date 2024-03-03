import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dtos/orderDto.dto';
import { AppService } from '../app.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: AppService) {}

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        item: true,
      },
    });
  }

  async getOrder(id: number) {
    const order: Order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        item: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async createOrder(orderDto: OrderDto) {
    const { user_id, item_id, ...rest } = orderDto;

    return this.prisma.order.create({
      data: {
        ...rest,
        user: {
          connect: { id: user_id },
        },
        item: {
          connect: { id: item_id },
        },
      },
      include: {
        user: true,
        item: true,
      },
    });
  }

  async deleteOrder(id: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.delete({
      where: { id },
      include: {
        user: true,
        item: true,
      },
    });
  }
}
