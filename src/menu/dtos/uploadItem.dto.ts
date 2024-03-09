import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UploadItemDto {

  @IsString()
  item_name: string;

  @IsNumber()
  item_price: number;

  @IsNumber()
  item_quantity: number;

  @IsString()
  s_i_unit: string;

  @IsBoolean()
  in_stock: boolean;

  @IsOptional()
  @IsNumber()
  shelf_life?: number;

  @IsOptional()
  @IsString()
  item_image?: string;

}


export class DeleteDto {

  @IsArray()
  toDeleteList: (string | number)[] | undefined;

}