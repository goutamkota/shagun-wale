import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AppService } from "../../app.service";
import { CategoryType, ItemList, MenuItem } from "@prisma/client";
import { CustomerCustomDto, ItemListDto } from "../dtos/customerCustom.dto";

@Injectable()
export class CreatePackageService {
  private itemListMap: any;

  constructor(private readonly prisma: AppService) {
  }

  // async getAllMenuItems() {
  //   return this.prisma.menuItem.findMany({
  //     include: {
  //       items: true
  //     }
  //   });
  // }
  //
  // async getMenuItem(id: number) {
  //   const menuItem: MenuItem = await this.prisma.menuItem.findUnique({
  //     where: { id },
  //     include: {
  //       items: true
  //     }
  //   });
  //
  //   if (!menuItem) {
  //     throw new NotFoundException("Menu item not found");
  //   }
  //
  //   return menuItem;
  // }
  //
  // async createMenuItem(name: string, categoryType: CategoryType, price: number, items: {
  //   item_name: string;
  //   item_quantity: number;
  // }[] = []) {
  //
  //   const toCheckDuplicates = await this.getAllMenuItems();
  //
  //   if (toCheckDuplicates.some((pack: any) => pack.category_type === categoryType)) {
  //     throw new ConflictException(`Package with category type '${categoryType}' already exists.`);
  //   }
  //
  //   const menu = await this.prisma.menuItem.create(
  //     {
  //       data: {
  //         category_type: categoryType,
  //         name,
  //         price,
  //         items: {
  //           createMany: {
  //             data: items.map(item => ({
  //               item_name: item.item_name,
  //               item_quantity: item.item_quantity
  //             }))
  //           }
  //         }
  //       }
  //     }
  //   );
  //
  //   if (!menu) throw new InternalServerErrorException("Unable to create a menu item!");
  //
  //   return {
  //     message: "Menu Item has been created Successfully!"
  //   };
  // }
  //
  // async updateMenuItem(id: number, name: string, category_type: CategoryType, price: number, items: {
  //   item_name: string;
  //   item_quantity: number
  // }[] = []) {
  //   const existingMenuItem = await this.prisma.menuItem.findUnique({
  //     where: { id },
  //     include: { items: true }
  //   });
  //
  //   if (!existingMenuItem) {
  //     throw new NotFoundException(`Menu Item with ID ${id} not found.`);
  //   }
  //
  //   const updatedMenuItem = await this.prisma.menuItem.update({
  //     where: { id },
  //     data: {
  //       category_type,
  //       name,
  //       price
  //     }
  //   });
  //
  //   // if items provided in the payload then do this action
  //   if (items && items.length > 0) {
  //     const updatedItems = await Promise.all(items.map(async (item) => {
  //       const existingItem = existingMenuItem.items.find(existingItem => existingItem.item_name === item.item_name);
  //
  //       if (existingItem) {
  //         // If the item already exists, update it
  //         return this.prisma.itemForMenu.update({
  //           where: { id: existingItem.id },
  //           data: {
  //             item_quantity: item.item_quantity
  //           }
  //         });
  //       } else {
  //         // If the item doesn't exist, create a new one
  //         return this.prisma.itemForMenu.create({
  //           data: {
  //             item_name: item.item_name,
  //             item_quantity: item.item_quantity,
  //             menu_item: {
  //               connect: { id: id }
  //             }
  //           }
  //         });
  //       }
  //     }));
  //
  //     // Delete items that are not present in the updated payload
  //     const itemsToDelete = existingMenuItem.items.filter(existingItem =>
  //       !items.some(updatedItem => updatedItem.item_name === existingItem.item_name)
  //     );
  //
  //     if (itemsToDelete.length > 0) {
  //       await Promise.all(itemsToDelete.map(item =>
  //         this.prisma.itemForMenu.delete({
  //           where: { id: item.id }
  //         })
  //       ));
  //     }
  //   } else {
  //     // If no items provided in the payload, delete all existing items
  //     // await this.prisma.item.deleteMany({
  //     //   where: { menu_item_id: id },
  //     // });
  //     console.log("if u want to delete the items not provided in the payload then uncomment the code");
  //   }
  //
  //
  //   if (!updatedMenuItem) {
  //     throw new InternalServerErrorException("Unable to update the menu item.");
  //   }
  //
  //   return {
  //     message: "Menu Item has been updated successfully!"
  //   };
  // }
  //
  // async deleteMenuItem(id: number) {
  //   const existingMenuItem = await this.prisma.menuItem.findUnique({
  //     where: { id },
  //     include: { items: true }
  //   });
  //
  //   if (!existingMenuItem) {
  //     throw new NotFoundException(`Menu Item with ID ${id} not found.`);
  //   }
  //
  //   // Delete associated items first
  //   await this.prisma.itemForMenu.deleteMany({
  //     where: { menu_item_id: id }
  //   });
  //   if (existingMenuItem.items) {
  //     await this.prisma.itemForMenu.deleteMany({
  //       where: { menu_item_id: id }
  //     });
  //   }
  //
  //   // Now, delete the menu item
  //   const deletedMenuItem = await this.prisma.menuItem.delete({
  //     where: { id }
  //   });
  //
  //   if (!deletedMenuItem) {
  //     throw new InternalServerErrorException("Unable to delete the menu item.");
  //   }
  //
  //   return {
  //     message: "Menu Item has been deleted successfully!"
  //   };
  // }
  //
  // async estimateCustomerCustom({ name, category_type, items }: CustomerCustomDto) {
  //   const totalCost = await this.calculateTotalCost(items);
  //
  //   const menuItem = await this.createCustomMenuItem({ name, category_type, items }, totalCost);
  //
  //   this.itemListMap.clear();
  //   Object.assign(menuItem, { price: undefined, id: undefined });
  //   menuItem.items.forEach((item) => Object.assign(item, { id: undefined, menu_item_id: undefined }));
  //
  //   return {
  //     menuItem,
  //     totalCost
  //   };
  // }
  //
  // private async calculateTotalCost(items: ItemListDto[]): Promise<number> {
  //   console.log(items, "calculateTotalCost");
  //
  //   // Extract item_ids from the CustomerCustomDto
  //   const itemIds = items?.map(item => item.item_id);
  //
  //   // Fetch all relevant ItemList records in a single query
  //   const itemListRecords = await this.prisma.itemList.findMany(
  //     {
  //       where: {
  //         id: {
  //           in: itemIds
  //         }
  //       }
  //     }
  //   );
  //
  //   if (!itemListRecords.length) {
  //     throw new NotFoundException("ItemList records not found.");
  //   }
  //
  //   this.itemListMap = new Map(itemListRecords.map(item => [item.id, item]));
  //   // console.log("itemListMap:", this.itemListMap);
  //
  //   let totalCost = 0;
  //
  //   for (const item of items) {
  //     const itemList = this.itemListMap.get(item.item_id);
  //
  //     if (!itemList) {
  //       throw new NotFoundException(`Item with id ${item.item_id} not found.`);
  //     }
  //
  //     // Use item_price from the fetched ItemList
  //     totalCost += itemList.item_price * item.item_quantity;
  //   }
  //   console.log(this.itemListMap);
  //   return totalCost;
  // }
  //
  // private async createCustomMenuItem(
  //   { name, category_type, items }: CustomerCustomDto,
  //   totalCost: number
  // ) {
  //   const menuItem = await this.prisma.customMenuItem.create({
  //     data: {
  //       name,
  //       category_type,
  //       price: totalCost,
  //       items: {
  //         createMany: {
  //           data: items.map((item) => ({
  //             item_name: this.itemListMap.get(item.item_id).item_name,
  //             item_quantity: item.item_quantity
  //           }))
  //         }
  //       }
  //     },
  //     include: {
  //       items: true
  //     }
  //   });
  //
  //   if (!menuItem) {
  //     throw new InternalServerErrorException("Unable to create MenuItem.");
  //   }
  //
  //   return menuItem;
  // }

}
