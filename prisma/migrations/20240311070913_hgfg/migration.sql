/*
  Warnings:

  - You are about to drop the column `custom_item_id` on the `CustomOrder` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `custom_menu_id` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomOrder" DROP CONSTRAINT "CustomOrder_custom_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_item_id_fkey";

-- AlterTable
ALTER TABLE "CustomOrder" DROP COLUMN "custom_item_id",
ADD COLUMN     "custom_menu_id" INTEGER NOT NULL,
ALTER COLUMN "paid" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "item_id",
ADD COLUMN     "menu_id" INTEGER NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "paid" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_custom_menu_id_fkey" FOREIGN KEY ("custom_menu_id") REFERENCES "CustomMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
