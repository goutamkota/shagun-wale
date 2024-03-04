import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppService } from '../app.service';
import { CategoryType, MenuItem } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: AppService) {
  }

  async getAllMenuItems() {
    return this.prisma.menuItem.findMany({
      include: {
        items: true,
      },
    });
  }

  async getMenuItem(id: number) {
    const menuItem: MenuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        items: true,
        // order: true,
      },
    });

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    return menuItem;
  }

  async createMenuItem(name: string, categoryType: CategoryType, price: number, items: {
    item_name: string;
    item_quantity: number
  }[] = []): Promise<any> {
    const menu = this.prisma.menuItem.create({
      data: {
        category_type: categoryType,
        name,
        price,
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });

    if (!menu) throw new InternalServerErrorException('Unable to create a menu!');

    return {
      message: 'Menu Item has been created Successfully!',
    };
  }


  async updateMenuItem(id: number, name: string, category_type: CategoryType, price: number, items: {
    item_name: string;
    item_quantity: number
  }[] = []): Promise<any> {
    const existingMenuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu Item with ID ${id} not found.`);
    }
    const updatedMenuItem = await this.prisma.menuItem.update({
      where: { id },
      data: {
        category_type,
        name,
        price,
      },
    });

    if (!updatedMenuItem) {
      throw new InternalServerErrorException('Unable to update the menu item.');
    }

    return {
      message: 'Menu Item has been updated successfully!',
    };
  }

  async deleteMenuItem(id: number): Promise<void> {
    await this.prisma.menuItem.delete({ where: { id } });
  }
}
