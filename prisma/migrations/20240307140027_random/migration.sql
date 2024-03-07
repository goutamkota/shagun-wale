/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_custom_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_menu_item_id_fkey";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "ItemForMenu" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,

    CONSTRAINT "ItemForMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemForCustomMenu" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "custom_menu_item_id" INTEGER NOT NULL,

    CONSTRAINT "ItemForCustomMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemForMenu" ADD CONSTRAINT "ItemForMenu_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemForCustomMenu" ADD CONSTRAINT "ItemForCustomMenu_custom_menu_item_id_fkey" FOREIGN KEY ("custom_menu_item_id") REFERENCES "CustomMenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
