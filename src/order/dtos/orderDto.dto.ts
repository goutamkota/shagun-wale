import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryType, Payment } from "@prisma/client";

export class OrderDto {

  @IsString()
  user_id: string;

  @IsOptional()
  @IsNumber()
  menu_id?: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsEnum(Payment)
  payment_method?: Payment

  @IsOptional()
  @IsString()
  customer_notes?: string;

  @IsOptional()
  @IsString()
  tracking_number?: string

  @IsString()
  shipping_address: string

  @IsOptional()
  @IsBoolean()
  paid: boolean

}

export class CustomOrderDto {

  @IsString()
  user_id: string;

  @IsOptional()
  @IsNumber()
  menu_id?: number;

  @IsOptional()
  @IsEnum(CategoryType)
  category_type?: CategoryType;

  @IsOptional()
  @IsNumber()
  quantity: number;

}