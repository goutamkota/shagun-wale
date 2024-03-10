import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoryType, ItemList, Menu } from '@prisma/client';
import { CreateMenuDto, ItemDto, UpdateMenuDto } from '../dtos/menuItems.dto';
import * as process from 'process';
import { ItemListQty, MenuService } from '../menu.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CreatePackageService {

  constructor(private readonly prisma: PrismaService, private menuService: MenuService) {
  }

  async getWholeMenu() {
    try {
      const allMenus = await this.prisma.menu.findMany({
        include: {
          items: true,
        },
      });

      if (!allMenus || allMenus.length === 0) return new NotFoundException('No menus found.');

      return await Promise.all(allMenus.map(async (menu) => {
        const itemIds: number[] = menu.items.map((itemForMenu) => itemForMenu.item_id);

        const itemListData: ItemList[] = await this.prisma.itemList.findMany({
          where: {
            id: {
              in: itemIds,
            },
          },
        });

        if (!itemListData || itemListData.length === 0) {
          throw new NotFoundException(`No items found for menu ${menu.name}.`);
        }

        const transformedItems = menu.items.map((itemForMenu) => {
          const itemListRecord = itemListData.find((item) => item.id === itemForMenu.item_id);
          return {
            item_name: itemListRecord?.item_name || '',
            quantity: itemForMenu.quantity,
            itm_qty_price: itemForMenu.itm_qty_price,
          };
        });

        return {
          name: menu.name,
          category_type: menu.category_type,
          price: menu.price,
          items: transformedItems,
        };
      }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to fetch menus. Please try again.');
      }
    }
  }

  async getMenuItem(id: number) {
    const menuItem = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with id ${id} not found`);
    }

    const itemIds: number[] = menuItem.items.map((itemForMenu) => itemForMenu.item_id);

    const itemListData: ItemList[] = await this.prisma.itemList.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
    });

    const transformedItems = menuItem.items.map((itemForMenu) => {
      const itemListRecord = itemListData.find((item) => item.id === itemForMenu.item_id);
      return {
        item_name: itemListRecord?.item_name || '',
        quantity: itemForMenu.quantity,
        itm_qty_price: itemForMenu.itm_qty_price,
      };
    });

    return {
      name: menuItem.name,
      category_type: menuItem.category_type,
      price: menuItem.price,
      items: transformedItems,
    };
  }

  async createMenu(request: CreateMenuDto) {
    const { name, category_type, items } = request;

    if (category_type === CategoryType.CUSTOM) throw new UnauthorizedException('Custom Packages are allowed to build by customers only!');

    const toCheckDuplicates = await this.menuService.getAllMenuItems();

    if (toCheckDuplicates.some((pack: any) => pack.category_type === category_type)) {
      throw new ConflictException(`Package with category type - '${category_type}' already exists.`);
    }

    try {
      // Fetch ItemList data based on item_ids
      const itemListData = await this.menuService.fetchItemsByIdList(items);

      // Create ItemForMenu records
      const itemForMenuData: ItemListQty[] = items.map((item: ItemDto) => {
        const itemListRecord = itemListData.find((i) => i.id === item.item_id);
        return {
          item_id: item.item_id,
          quantity: item.quantity,
          itm_qty_price: item.quantity * (itemListRecord?.item_price || 0),
        };
      });

      // Calculate the total price from itm_qty_price
      const totalPrice: number = Number(process.env.COMMISSION) + itemForMenuData.reduce((sum, item) => sum + item.itm_qty_price, 0);

      // Create MenuItem using created ItemForMenu records and calculated total price
      const createMenu = await this.prisma.menu.create(
        {
          data: {
            name,
            category_type,
            price: totalPrice,
            items: {
              createMany: {
                data: itemForMenuData,
              },
            },
          },
        },
      );

      if (!createMenu) return new InternalServerErrorException('Issue with db insertion!');

      return {
        message: `Menu of ${category_type} package is created for You!`,
      };
    } catch (error) {
      error.message = 'Issue with developer\'s end!';
      throw new InternalServerErrorException(error);
    }
  }

  async updateMenu(request: UpdateMenuDto) {
    const { id, name, category_type, items } = request;
    const existingMenuItem = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!existingMenuItem) throw new NotFoundException(`Menu Item with ID ${id} not found.`);
    try {
      const existingMenuItem = await this.prisma.menu.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!existingMenuItem) {
        return new NotFoundException(`Menu Item with ID ${id} not found.`);
      }
      // Fetch ItemList data based on item_ids
      const itemListData: ItemList[] = await this.menuService.fetchItemsByIdList(items);
      // Create ItemForMenu records
      const itemForMenuData: ItemListQty[] = await this.menuService.createOrUpdateItemForMenu(existingMenuItem.items, items, itemListData);
      // Calculate the total price from itm_qty_price
      const totalPrice: number = Number(process.env.COMMISSION) + itemForMenuData.reduce((sum, item) => sum + item.itm_qty_price, 0);
      // Update existing items with updateMany
      await this.prisma.$transaction(async (txn) => {
        await Promise.all(itemForMenuData.map(async (item: ItemListQty) => {
          const existingItem = existingMenuItem.items.find((existing) => existing.item_id === item.item_id);
          if (existingItem) {
            // Existing item, update
            await txn.itemForMenu.update({
              where: { id: existingItem.id },
              data: {
                quantity: item.quantity,
                itm_qty_price: item.itm_qty_price,
              },
            });
          } else {
            // New item, create
            await txn.itemForMenu.create({
              data: {
                item_id: item.item_id,
                quantity: item.quantity,
                itm_qty_price: item.itm_qty_price,
                menu: { connect: { id: id } },
              },
            });
          }
        }));
      });

      const newItems = itemForMenuData.filter((item) => !item.item_id);
      if (newItems.length > 0) {
        await this.prisma.itemForMenu.createMany({
          data: newItems.map((item) => ({
            item_id: item.item_id,
            quantity: item.quantity,
            itm_qty_price: item.itm_qty_price,
            menu: { connect: { id: id } },
            menu_id: id,
          })),
        });
      }

      // Update MenuItem with the new details
      const updatedMenu: Menu = await this.prisma.menu.update({
        where: { id },
        data: {
          name,
          price: totalPrice,
        },
      });

      if (!updatedMenu) return new InternalServerErrorException('Failed to update menu. Database issue.');
      return { message: `Menu of ${category_type || id} package is updated successfully!` };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update menu. ${error.message}`);
    }
  }

  async deleteMenu(id: number) {
    const existingMenuItem = await this.prisma.menu.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu Item with ID ${id} not found.`);
    }

    await this.prisma.$transaction(async (tx) => {
      // Delete associated items first
      if (existingMenuItem.items) {
        const deletedItemForMenu = await this.prisma.itemForMenu.deleteMany({
          where: { menu_id: id },
        });
      }
      // Now, delete the menu item
      const deletedMenuItem: Menu = await this.prisma.menu.delete({
        where: { id },
      });
      if (!deletedMenuItem) {
        throw new InternalServerErrorException('Unable to delete the menu item.');
      }
    });

    return {
      message: 'Menu Item has been deleted successfully!',
    };
  }

}
