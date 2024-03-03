import { Injectable } from "@nestjs/common";
import { AppService } from "../app.service";
import { Booking, CategoryType, Prisma } from "@prisma/client";

@Injectable()
export class BookingService {
  constructor(private prisma: AppService) {
  }

  async takeBookings(userId: string, type: CategoryType) {
    const booking: Booking = await this.prisma.booking.create({
      data: {
        type,
        user: { connect: { id: userId } }
      } as Prisma.BookingCreateInput
    });
    return booking;
  }
}
