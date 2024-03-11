import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderDto } from "./dtos/orderDto.dto";
import { CategoryType, Order } from "@prisma/client";
import * as process from "process";
import { CreatePackageService } from "../menu/create-package/create-package.service";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  costCategoryMapped: Map<CategoryType, (number | undefined)> = new Map(
    [
      [CategoryType.SILVER, 15000],
      [CategoryType.GOLD, 20000],
      [CategoryType.DIAMOND, 25000],
      [CategoryType.CUSTOM, undefined]
    ]
  );

  constructor(private readonly prisma: PrismaService, private packageService: CreatePackageService) {
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        item: true
      }
    });
  }

  async getOrder(id: number) {
    const order: Order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        item: true
      }
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async createOrder(orderDto: OrderDto) {
    const { user_id, item_id, quantity, ...rest } = orderDto;
    // const menuItem = await this.menuService.getMenuItem(orderDto.item_id);
    const menuItem = await this.prisma.menu.findFirst({
      where: { id: item_id },
      include: {
        items: true
      }
    });

    if (!menuItem) throw new NotFoundException(`Item with id ${item_id} not found.`);

    const total: number = quantity ? (menuItem.price * quantity) : menuItem.price;

    const discount: number = Number(process.env.PRODUCT_DISCOUNT);

    const grand_total: number = this.applyDiscount(total, discount);

    const order = await this.prisma.order.create({
      data: {
        ...rest,
        quantity,
        total,
        discount,
        grand_total,
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

    if (!order) throw new InternalServerErrorException('Unable to place the order!');
    return { message: 'Order placed successfully!`' };
  }

  async deleteOrder(id: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) throw new NotFoundException('Order not found');

    return this.prisma.order.delete({
      where: { id },
      include: {
        user: true,
        item: true,
      },
    });
  }

  // calculateTotal(category: CategoryType, quantity: number): number {
  //   const cost = this.costCategoryMapped.get(category);
  //   if (cost === undefined) {
  //     throw new NotFoundException(`Cost for category ${category} not found.`);
  //   }
  //   return cost * quantity;
  // }

  applyDiscount(total: number, discount: number): number {
    return total - (total * discount) / 100;
  }
}
