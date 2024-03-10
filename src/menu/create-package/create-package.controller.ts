import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePackageService } from './create-package.service';
import { CreateMenuDto, UpdateMenuDto } from '../dtos/menuItems.dto';

@Controller('package')
export class CreatePackageController {

  constructor(private readonly packageService: CreatePackageService) {
  }

  @Get('/menuItems')
  async getWholeMenu(): Promise<any> {
    return this.packageService.getWholeMenu();
  }

  @Get('/menuItem/:id')
  async getMenuItemById(@Param('id') id: number): Promise<any> {
    return this.packageService.getMenuItem(id);
  }

  @Post('/createMenuItem')
  async createMenu(@Body() { name, category_type, items }: any): Promise<any> {
    return this.packageService.createMenu({ name, category_type, items });
  }

  @Put('/updateMenuItem')
  async updateMenu(
    @Body() updateMenu: UpdateMenuDto,
  ) {
    return this.packageService.updateMenu(updateMenu);
  }

  @Delete('/delete/:id')
  async deleteMenu(@Param('id') id: number): Promise<any> {
    return this.packageService.deleteMenu(id);
  }

}
