import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { UploadItemService } from "./upload-item.service";
import { DeleteDto, UploadItemDto } from "../dtos/uploadItem.dto";

@Controller("item")
export class UploadItemController {

  constructor(private readonly itemService: UploadItemService) {
  }

  @Get("/items")
  async showItemList() {
    return this.itemService.showItemList();
  }

  @Get("/item")
  async showItem(@Query("id") id?: number, @Query("itemName") item_name?: string) {
    if (id && item_name) throw new BadRequestException("Provide either id or itemName, not both.");
    const data: number | string | undefined = Number(id) || item_name;
    if (!data) throw new BadRequestException("Provide either id or itemName.");
    return this.itemService.showItem(data);
  }

  @Post("/single-item")
  async createItem(@Body() itemData: UploadItemDto) {
    return this.itemService.createItem(itemData);
  }

  @Post("/multiple-items")
  async createMultipleItems(@Body() itemsData: UploadItemDto[]) {
    return this.itemService.createMultipleItems(itemsData);
  }

  @Patch("/update")
  async updateItem(
    @Query("id") id?: number,
    @Query("itemName") item_name?: string,
    @Body() uploadItemDto?: UploadItemDto
  ) {
    if (id && item_name) throw new BadRequestException("Provide either id or itemName, not both.");
    const data: number | string | undefined = Number(id) || item_name;
    if (!data) throw new BadRequestException("Provide either id or itemName.");
    return this.itemService.updateItem(data, uploadItemDto);
  }

  @Patch("/update-multiple")
  async updateMultipleItem(
    @Body() itemListWithIds?: (UploadItemDto & { id: number })[]
  ) {
    return this.itemService.updateMultipleItem(itemListWithIds);
  }

  @Delete("/delete")
  async deleteItems(
    @Query("uniqueData") uniqueData?: string | number,
    @Body() deleteList?: DeleteDto
  ) {
    if (typeof uniqueData === "string" && !isNaN(Number(uniqueData))) uniqueData = Number(uniqueData);
    if (Array.isArray(deleteList.toDeleteList)) {
      return this.itemService.deleteItems(deleteList.toDeleteList);
    } else {
      return this.itemService.deleteItems(uniqueData);
    }
  }
}
