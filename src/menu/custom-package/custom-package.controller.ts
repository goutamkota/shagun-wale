import { Body, Controller, Post } from '@nestjs/common';
import { CustomPackageService } from './custom-package.service';

@Controller('custom-package')
export class CustomPackageController {

  constructor(private customService: CustomPackageService) {
  }

  @Post("/createCustomMenuItem")
  async estimateCustomerCustom(@Body() customerCustomData: any) {
    try {
      // const result = await this.customService.estimateCustomerCustom(customerCustomData);
      // return { status: "success", data: result };
    } catch (error) {
      return { status: "failure", error: error.message };
    }
  }

}
