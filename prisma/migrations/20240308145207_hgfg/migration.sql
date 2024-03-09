/*
  Warnings:

  - You are about to drop the column `custom_menu_item_id` on the `ItemForCustomMenu` table. All the data in the column will be lost.
  - You are about to drop the column `menu_item_id` on the `ItemForMenu` table. All the data in the column will be lost.
  - Added the required column `custom_menu_id` to the `ItemForCustomMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `ItemForMenu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemForCustomMenu" DROP CONSTRAINT "ItemForCustomMenu_custom_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemForMenu" DROP CONSTRAINT "ItemForMenu_menu_item_id_fkey";

-- AlterTable
ALTER TABLE "ItemForCustomMenu" DROP COLUMN "custom_menu_item_id",
ADD COLUMN     "custom_menu_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemForMenu" DROP COLUMN "menu_item_id",
ADD COLUMN     "menu_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemForMenu" ADD CONSTRAINT "ItemForMenu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemForCustomMenu" ADD CONSTRAINT "ItemForCustomMenu_custom_menu_id_fkey" FOREIGN KEY ("custom_menu_id") REFERENCES "CustomMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
