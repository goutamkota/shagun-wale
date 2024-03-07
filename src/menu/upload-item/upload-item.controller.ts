import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePackageService } from "../create-package/create-package.service";
import { UploadItemService } from "./upload-item.service";

@Controller('upload-item')
export class UploadItemController {

  constructor(private readonly itemService: UploadItemService) {
  }

  @Get("/items")
  async showItemList() {
    return this.itemService.showItemList();
  }
  @Post("/items")
  async createItemForItemList(@Body() itemData: any) {
    return this.itemService.createItem(itemData);
  }
}
