import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePackageService } from "./create-package.service";

@Controller('create-package')
export class CreatePackageController {

  constructor(private readonly packageService: CreatePackageService) {
  }



  // @Post("/createCustomMenuItem")
  // async estimateCustomerCustom(@Body() customerCustomData: any) {
  //   try {
  //     const result = await this.packageService.estimateCustomerCustom(customerCustomData);
  //     return { status: "success", data: result };
  //   } catch (error) {
  //     return { status: "failure", error: error.message };
  //   }
  // }
  //
  // @Get("/menuItems")
  // async getAllMenuItems(): Promise<any> {
  //   return this.packageService.getAllMenuItems();
  // }
  //
  // @Get("/menuItem/:id")
  // async getMenuItemById(@Param("id") id: number): Promise<any> {
  //   return this.packageService.getMenuItem(id);
  // }
  //
  // @Post("/createMenuItem")
  // async createMenuItem(@Body() { name, category_type, price, items }: any): Promise<any> {
  //   return this.packageService.createMenuItem(name, category_type, price, items);
  // }
  //
  // @Put("/updateMenuItem/:id")
  // async updateMenuItem(
  //   @Param("id") id: number,
  //   @Body() { name, category_type, price, items }: any
  // ): Promise<any> {
  //   return this.packageService.updateMenuItem(id, name, category_type, price, items);
  // }
  //
  // @Delete("/delete/:id")
  // async deleteMenuItem(@Param("id") id: number): Promise<any> {
  //   return this.packageService.deleteMenuItem(id);
  // }

}
