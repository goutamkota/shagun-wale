import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { OrderDto, UpdateOrder } from "./dtos/orderDto.dto";
import { Menu, Order } from "@prisma/client";
import * as process from "process";
import { PrismaService } from "../prisma/prisma.service";
import { Errors } from "../errors";

@Injectable()
export class OrderService {

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
    const { user_id, menu_id, shipping_address, quantity, payment_method, customer_notes, paid } = orderDto;
    const tracking_number: string = "screwjack-ei-uhbcnjc2n";
    const discount: number = Number(process.env.PRODUCT_DISCOUNT);

    const menu: Menu = await this.prisma.menu.findUnique({
      where: { id: menu_id },
      include: {
        items: true
      }
    });

    if (!menu) throw new NotFoundException(`Item with id ${menu_id} not found.`);

    const total: number = quantity ? (menu.price * quantity) : menu.price;
    const grand_total: number = total - (total * discount) / 100;

    const order: Order = await this.prisma.order.create({
      data: {
        quantity,
        total,
        discount,
        grand_total,
        shipping_address,
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

    return { message: "Order placed successfully!" };

  }

  async updateOrder(id: number, updateOrder: Partial<UpdateOrder>) {
    console.log(id, typeof id);
    try {
      const order: Order = await this.prisma.order.findUnique({
        where: { id }
      });

      if (!order) return new NotFoundException(`Order with id ${id} not found!`);

      const { menu_id, quantity, user_id, menu_id_change, ...rest } = updateOrder;
      const tracking_number: string = "screwjack-ei-uhbcnjc2n";
      const discount: number = Number(process.env.PRODUCT_DISCOUNT);

      const menus: Menu[] = await this.prisma.menu.findMany({
        where: {
          id: {
            in: [menu_id, menu_id_change]
          }
        },
        include: {
          items: true
        }
      });

      if (menus.length !== 2) return new NotFoundException(`Menu with id ${menu_id} & ${menu_id_change} not found.`);

      const total: number = quantity ? menus[0].price * quantity : menus[0].price;
      const grand_total: number = total - (total * discount) / 100;

      const updatedOrder: Order = await this.prisma.order.update({
        where: { id },
        data: {
          total,
          tracking_number,
          grand_total,
          menu: menu_id_change ? { connect: { id: menu_id_change } } : { connect: { id: menu_id } },
          ...rest
        }
      });

      if (!updatedOrder) return new InternalServerErrorException("Unable to update the order.");

      return updatedOrder;
      // return { message: "Order has been updated!" };
    } catch (error) {
      // Log the error or handle it as appropriate
      throw new InternalServerErrorException(`Error updating order: ${error.message}`);
    }
  }


  async deleteOrder(id: number) {
    try {
      await this.prisma.order.delete({
        where: { id }
      });
      return { message: "Order has been deleted!" };
    } catch (error) {
      throw new InternalServerErrorException(Errors[error.code]);
    }
  }

}