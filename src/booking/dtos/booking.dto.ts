import { CategoryType, Product } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class BookingDto {

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsNumber()
  price?: Number;

  @IsOptional()
  @IsString()
  description?: String;

  @IsOptional()
  @IsNumber()
  boxCount?: Number;
}