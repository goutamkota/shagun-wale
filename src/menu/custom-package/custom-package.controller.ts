import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomPackageService } from './custom-package.service';
import { CreateMenuDto, UpdateMenuDto } from '../dtos/menuItems.dto';

@Controller('custom')
export class CustomPackageController {

  constructor(private customService: CustomPackageService) {
  }

  @Get('/customMenuItems')
  async getWholeMenu(): Promise<any> {
    return this.customService.getWholeMenu();
  }

  @Get('/customMenuItem/:id')
  async getMenuItemById(@Param('id') id: number): Promise<any> {
    return this.customService.getMenuItem(id);
  }

  @Post('/createCustomMenuItem')
  async createMenu(@Body() { name, category_type, items }: CreateMenuDto) {
    return this.customService.createMenu({ name, category_type, items });
  }

  @Put('/updateCustomMenuItem')
  async updateMenu(
    @Body() updateMenu: UpdateMenuDto,
  ) {
    return this.customService.updateMenu(updateMenu);
  }

  @Delete('/delete/:id')
  async deleteMenu(@Param('id') id: number): Promise<any> {
    return this.customService.deleteMenu(id);
  }

  // @Post("/createCustomMenuItem")
  // async estimateCustomerCustom(@Body() customerCustomData: any) {
  //   try {
  //     // const result = await this.customService.estimateCustomerCustom(customerCustomData);
  //     // return { status: "success", data: result };
  //   } catch (error) {
  //     return { status: "failure", error: error.message };
  //   }
  // }

}
