/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `menu_item_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_menuItemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "menuItemId",
ADD COLUMN     "menu_item_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
