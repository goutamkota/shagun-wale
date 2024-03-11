import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { OrderDto } from "./dtos/orderDto.dto";
import { CategoryType, Order } from "@prisma/client";
import * as process from "process";
import { PrismaService } from "../prisma/prisma.service";

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

  constructor(private readonly prisma: PrismaService) {
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        menu: true
      }
    });
  }

  async getOrder(id: number) {
    const order: Order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        menu: true
      }
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async createOrder(orderDto: OrderDto) {

    const { user_id, menu_id, quantity,  payment_method, customer_notes, paid } = orderDto;
    const tracking_number: string = "screwjack-ei-uhbcnjc2n";

    const menu = await this.prisma.menu.findFirst({
      where: { id: menu_id } ,
      include: {
        items: true
      }
    });

    console.log(menu);

    if (!menu) throw new NotFoundException(`Item with id ${menu_id} not found.`);

    const category: CategoryType = menu.category_type;

    const total: number = this.calculateTotal(category, quantity);

    const discount: number = Number(process.env.PRODUCT_DISCOUNT);

    const grand_total: number = this.applyDiscount(total, discount);

    const order = await this.prisma.order.create({
      data: {
        quantity,
        total,
        discount,
        grand_total,
        user: {
          connect: { id: user_id }
        },
        menu: {
          connect: { id: menu_id }
        },
        payment_method,
        customer_notes,
        tracking_number,
        paid
      },
      include: {
        user: true,
        menu: true
      }
    });

    if (!order) throw new InternalServerErrorException("Unable to place the order!");

    return { message: "Order placed successfully!`" };

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
        menu: true
      }
    });
  }

  calculateTotal(category: CategoryType, quantity: number): number {
    const cost = this.costCategoryMapped.get(category);
    if (cost === undefined) throw new NotFoundException(`Cost for category ${category} not found.`);
    if (quantity === undefined) return cost;
    return cost * quantity;
  }

  applyDiscount(total: number, discount: number): number {
    return total - (total * discount) / 100;
  }

}
