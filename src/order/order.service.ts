import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderDto } from "./dtos/orderDto.dto";
import { AppService } from "../app.service";
import { CategoryType, MenuItem, Order } from "@prisma/client";
import { MenuService } from "../menu/menu.service";
import * as process from "process";

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

  constructor(private readonly prisma: AppService, private menuService: MenuService) {
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

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async createOrder(orderDto: OrderDto) {
    const { user_id, item_id, quantity, ...rest } = orderDto;
    // const menuItem = await this.menuService.getMenuItem(orderDto.item_id);
    const menuItem = await this.prisma.menuItem.findFirst({
      where: { id: item_id },
      include: {
        items: true
      }
    });

    if (!menuItem) {
      throw new NotFoundException(`Item with id ${item_id} not found.`);
    }

    const category = menuItem.category_type;

    const total = this.calculateTotal(category, quantity);

    const discount = Number(process.env.PRODUCT_DISCOUNT);

    const grand_total = this.applyDiscount(total, discount);

    const order = await this.prisma.order.create({
      data: {
        ...rest,
        quantity,
        total,
        discount,
        grand_total,
        user: {
          connect: { id: user_id }
        },
        item: {
          connect: { id: item_id }
        }
      },
      include: {
        user: true,
        item: true
      }
    });

    if (!order) throw new InternalServerErrorException("Unable to place the order!");
    return {
      message: "Order placed successfully!`"
    };
  }

  async deleteOrder(id: number) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id }
    });

    if (!existingOrder) {
      throw new NotFoundException("Order not found");
    }

    return this.prisma.order.delete({
      where: { id },
      include: {
        user: true,
        item: true
      }
    });
  }

  calculateTotal(category: CategoryType, quantity: number): number {
    const cost = this.costCategoryMapped.get(category);
    if (cost === undefined) {
      throw new NotFoundException(`Cost for category ${category} not found.`);
    }
    return cost * quantity;
  }

  applyDiscount(total: number, discount: number): number {
    return total - (total * discount) / 100;
  }
}
