import { CategoryType } from '@prisma/client';


export class MenuItemDto {
  name: string;
  category_type: CategoryType
  price: number;
  items?: ItemDto[];
}

export class ItemDto {
  item_name: string;
  item_quantity: number;
}