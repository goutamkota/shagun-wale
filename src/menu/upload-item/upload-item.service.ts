import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ItemList } from "@prisma/client";
import { AppService } from "../../app.service";
import { UploadItemDto } from "./dtos/upload_item.dto";

@Injectable()
export class UploadItemService {

  constructor(private prisma: AppService) {
  }

  async showItemList() {
    const itemList: ItemList[] = await this.prisma.itemList.findMany();
    if (!itemList.length) throw new InternalServerErrorException("Unable to fetch Items or no items found!");
    return itemList;
  }

  async showItem(data: number | string) {
    try {
      const item: ItemList = await this.prisma.itemList.findUnique({
        where: typeof data === "number" ? { id: data } : { item_name: data }
      });
      return item;
    } catch (error) {
      if (error.code === "P2025" || error.code === "P2001") throw new NotFoundException("Unable to find your items with us!");
      throw new InternalServerErrorException(error);
    }
  }

  async createItem(itemData: UploadItemDto) {
    const { item_name, item_price, shelf_life, s_i_unit, item_quantity, item_image } = itemData;
    try {
      await this.prisma.itemList.createMany({
        data: {
          item_name,
          item_price,
          shelf_life,
          s_i_unit,
          item_quantity,
          item_image
        }
      });
      return {
        message: "Uploaded the Item!"
      };
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(`Item with given name already exists.`);
      } else {
        throw new InternalServerErrorException("Unable to create items.");
      }
    }
  }

  async createMultipleItems(itemListDataArray: UploadItemDto[]) {
    try {
      await this.prisma.itemList.createMany({
        data: itemListDataArray.map(
          (itemList) => ({
            ...itemList
          }))
      });
      return {
        message: "Uploaded the Items!"
      };
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(`Item with given name(s) already exists.`);
      } else {
        throw new InternalServerErrorException("Unable to create items.");
      }
    }
  }

  async updateItem(uniqueData: number | string, { ...rest }: Partial<UploadItemDto>) {
    try {
      await this.prisma.itemList.update({
        where: typeof uniqueData === "number" ? { id: uniqueData } : { item_name: uniqueData },
        data: {
          ...rest
        }
      });
      return {
        message: "Item has been updated with given changes!"
      };
    } catch (error) {
      if (error.code === "P2022") throw new NotFoundException("Items doesnt exist!");
      if (error.code === "P2025" || error.code === "P2001") throw new NotFoundException("Unable to find your items with us!");
      throw new InternalServerErrorException(error);
    }
  }

  async updateMultipleItem(itemListWithIds: (UploadItemDto & { id: number })[]) {
    try {
      await Promise.all(
        itemListWithIds.map(async (item: (UploadItemDto & { id: number })) => {
          await this.prisma.itemList.updateMany({
            where: {
              id: item.id
            },
            data: {
              ...item
            }
          });
        })
      );

      return {
        message: "Items updated successfully!"
      };
    } catch (error) {
      // Handle errors appropriately
      throw new Error(`Failed to update items: ${error.message}`);
    }
  }

  async deleteItems(uniqueData: (number | string) | (number | string)[]) {
    try {
      let deletedItems: any;
      if (Array.isArray(uniqueData)) {
        deletedItems = await this.prisma.itemList.deleteMany({
          where: {
            OR: uniqueData.map((data) =>
              typeof data === "number" ? { id: data } : { item_name: data }
            )
          }
        });
        if (deletedItems.count != uniqueData.length) return { message: "Unable to find item with given Information!" };
      } else {
        deletedItems = await this.prisma.itemList.delete({
          where: typeof uniqueData === "number" ? { id: uniqueData } : { item_name: uniqueData }
        });
        if (!deletedItems) return { message: "Unable to find item with given Information!" };
      }

      return {
        message: "Items have been deleted!",
        deletedItems
      };
    } catch (error) {
      if (error.code === "P2022") throw new NotFoundException("Items doesnt exist!");
      if (error.code === "P2025" || error.code === "P2001") throw new NotFoundException("Unable to find your items with us!");
      throw new InternalServerErrorException(error);
    }
  }

}