import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemDto } from './dtos/menuItems.dto';
import { ItemList } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface ItemListQty extends ItemDto {
  itm_qty_price: number;
}

@Injectable()
export class MenuService {

  constructor(private prisma: PrismaService) {
  }

  // # Utility Functions/Methods ------------------------ //

  async fetchItemsByIdList(items: ItemDto[]) {
    const itemListData: ItemList[] = await this.prisma.itemList.findMany({
      where: {
        id: { in: items.map((item: ItemDto) => item.item_id) },
      },
    });
    if (!itemListData) throw new NotFoundException('Error in fetching items through list of ids!');
    return itemListData;
  }

  async createOrUpdateItemForMenu(existingItems: ItemListQty[], newItems: ItemDto[], itemListData: ItemList[]): Promise<ItemListQty[]> {
    const itemForMenuData: ItemListQty[] = [];

    newItems.forEach((item) => {
      const itemListRecord = itemListData.find((i) => i.id === item.item_id);
      const existingItem = existingItems.find((ei) => ei.item_id === item.item_id);

      if (existingItem) {
        // Update existing item
        itemForMenuData.push({
          item_id: item.item_id,
          quantity: item.quantity,
          itm_qty_price: item.quantity * (itemListRecord?.item_price || 0),
        });
      } else {
        // Create new item
        itemForMenuData.push({
          item_id: item.item_id,
          quantity: item.quantity,
          itm_qty_price: item.quantity * (itemListRecord?.item_price || 0),
        });
      }
    });

    return itemForMenuData;
  }

  async getAllMenuItems() {
    return this.prisma.menu.findMany();
  }

}
