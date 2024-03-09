import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AppService } from '../../app.service';
import { CustomerCustomDto, ItemListDto } from '../dtos/customerCustom.dto';

@Injectable()
export class CustomPackageService {

  private itemListMap!: Map<number, any>;

  constructor(private prisma: AppService) {
  }

  // async estimateCustomerCustom({ name, category_type, items }: CustomerCustomDto) {
  //   const totalCost = await this.calculateTotalCost(items);
  //
  //   const menuItem = await this.createCustomMenuItem({ name, category_type, items }, totalCost);
  //
  //   this.itemListMap.clear();
  //   Object.assign(menuItem, { price: undefined, id: undefined });
  //   menuItem.items.forEach((item: any) => Object.assign(item, { id: undefined, menu_item_id: undefined }));
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
  //   totalCost: number,
  // ) {
  //   const menuItem = await this.prisma.customMenu.create({
  //     data: {
  //       name,
  //       category_type,
  //       price: totalCost,
  //       items: {
  //         createMany: {
  //           data: items.map((item) => ({
  //             item_id: this.itemListMap.get(item.item_id).item_name,
  //             quantity: item.item_quantity,
  //           })),
  //         },
  //       },
  //     },
  //     include: {
  //       items: true,
  //     },
  //   });
  //
  //   if (!menuItem) {
  //     throw new InternalServerErrorException('Unable to create MenuItem.');
  //   }
  //
  //   return menuItem;
  // }
}
