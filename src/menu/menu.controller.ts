import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from '@prisma/client';

@Controller('menu')
export class MenuController {

  constructor(private readonly menuService: MenuService) {
  }

  @Get()
  async getAllMenuItems(): Promise<any> {
    return this.menuService.getAllMenuItems();
  }

  @Get(':id')
  async getMenuItemById(@Param('id') id: number): Promise<MenuItem | null> {
    return this.menuService.getMenuItem(id);
  }

  @Post()
  async createMenuItem(@Body() { name, category_type, price, items }: any): Promise<any> {
    return this.menuService.createMenuItem(name, category_type, price, items);
  }

  @Put(':id')
  async updateMenuItem(
    @Param('id') id: number,
    @Body() { name, category_type, price, items }: any,
  ): Promise<any> {
    return this.menuService.updateMenuItem(id, name, category_type, price, items);
  }


  @Delete(':id')
  async deleteMenuItem(@Param('id') id: number): Promise<any> {
    return this.menuService.deleteMenuItem(id);
  }
}
