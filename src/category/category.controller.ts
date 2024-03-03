import { Body, Controller, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Booking } from "@prisma/client";

@Controller("category")
export class CategoryController {

  constructor(private bookingService: CategoryService) {
  }

  @Post(":id")
  takeBooking(@Param("id") id: string, @Body() bookingDetails: Booking) {
    return this.bookingService.takeBooking(id, bookingDetails);
  }

}

export const data = {
  type: "GOLD",
  price: 15000,
  description: "Please parcel the boxes perfectly.",
  boxCount: 30,
  products: {
    cake: 3,
    biscuit: 4,
    fruits: 5,
    dryfruits: 6
  }
};