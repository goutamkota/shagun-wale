import { Controller, Get, Param, ParseEnumPipe, Post, Query } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CategoryType } from "@prisma/client";

@Controller("booking")
export class BookingController {

  constructor(private bookingService: BookingService) {
  }

  @Get(':id')
  takeBookings(@Param('id') id : string, @Query('type', new ParseEnumPipe(CategoryType)) type: CategoryType) {
    return this.bookingService.takeBookings(id,type)
  }

}
