import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AppService } from "../app.service";
import { Booking } from "@prisma/client";

@Injectable()
export class CategoryService {

  constructor(private prisma: AppService) {
  }
  async takeBooking(userId: string, details: Booking) {
    // const booking: Booking = await this.prisma.booking.create({
    //   data: {
    //     ...details,
    //     user: { connect: { id: userId } },
    //     products: {
    //       create : {
    //
    //       }
    //     }
    //   },
    // });
    // if(!booking) throw new InternalServerErrorException('Unable to take bookings!')
    // return booking;
  }
}
