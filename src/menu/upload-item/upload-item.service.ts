import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ItemList } from "@prisma/client";
import { AppService } from "../../app.service";

@Injectable()
export class UploadItemService {

  constructor(private prisma: AppService) {
  }

  async showItemList() {
    const itemList: ItemList[] = await this.prisma.itemList.findMany();
    if (!itemList.length) throw new InternalServerErrorException("Unable to fetch Items or no items found!");
    return itemList;
  }

  async createItem({ item_name, item_price, item_image = "nil", shelf_life }: any) {
    const itemList = await this.prisma.itemList.createMany({
      data: {
        item_name,
        item_price,
        shelfLife: shelf_life // once db is changed then change to shelf_life only
        //also add item_image
      }
    });

    if (!itemList) throw new InternalServerErrorException("Unable to upload Items(s)");

    return {
      message: "Uploaded the Item(s)!"
    };
  }
}
