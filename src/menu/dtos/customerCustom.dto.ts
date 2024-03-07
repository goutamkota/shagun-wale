import { CategoryType } from "@prisma/client";

export class CustomerCustomDto {
  name: string;
  category_type: CategoryType;
  items: { item_id: number; item_quantity: number }[];
}


export class ItemListDto {
  item_id: number;
  item_quantity: number;
}