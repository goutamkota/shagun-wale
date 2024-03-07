import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePackageService } from '../create-package/create-package.service';
import { UploadItemService } from './upload-item.service';
import { UploadItemDto } from './dtos/upload_item.dto';

@Controller('upload-item')
export class UploadItemController {

  constructor(private readonly itemService: UploadItemService) {
  }

  @Get('/items')
  async showItemList() {
    return this.itemService.showItemList();
  }

  @Get('/item')
  async showItem(@Query('id') id?: number, @Query('itemName') item_name?: string) {
    if (id && item_name) throw new BadRequestException('Provide either id or itemName, not both.');
    const data: number | string | undefined = Number(id) || item_name;
    if (!data) throw new BadRequestException('Provide either id or itemName.');
    return this.itemService.showItem(data);
  }

  @Post('/single-item')
  async createItem(@Body() itemData: UploadItemDto) {
    return this.itemService.createItem(itemData);
  }

  @Post('/multiple-items')
  async createMultipleItems(@Body() itemsData: UploadItemDto[]) {
    return this.itemService.createMultipleItems(itemsData);
  }

  @Patch('/update-item')
  async updateItem(
    @Query('id') id?: number,
    @Query('itemName') item_name?: string,
    @Body() uploadItemDto?: UploadItemDto,
  ) {
    if (id && item_name) throw new BadRequestException('Provide either id or itemName, not both.');
    const data: number | string | undefined = Number(id) || item_name;
    if (!data) throw new BadRequestException('Provide either id or itemName.');
    return this.itemService.updateItem(data, uploadItemDto);
  }

  @Delete('/delete-items')
  async deleteItems(
    @Query('uniqueData') uniqueData?: string | number,
    @Body() deleteData?: (string | number)[] | undefined,
  ) {
    if (typeof uniqueData == 'string') uniqueData = Number(uniqueData);
    if (Array.isArray(deleteData)) {
      return this.itemService.deleteItems(deleteData);
    } else {
      return this.itemService.deleteItems(uniqueData);
    }
  }
}
