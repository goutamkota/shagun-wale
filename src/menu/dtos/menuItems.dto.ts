import { CategoryType } from '@prisma/client';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateMenuDto {

  @IsString()
  name: string;

  @IsEnum(CategoryType)
  category_type: CategoryType;

  @IsArray()
  items: ItemDto[];

}

export class UpdateMenuDto {

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CategoryType)
  category_type: CategoryType;

  @IsArray()
  items: ItemDto[];

}

export class ItemDto {

  @IsNumber()
  item_id: number;

  @IsNumber()
  quantity: number;

}