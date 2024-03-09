/*
  Warnings:

  - You are about to drop the `CustomMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomOrder" DROP CONSTRAINT "CustomOrder_custom_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemForCustomMenu" DROP CONSTRAINT "ItemForCustomMenu_custom_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemForMenu" DROP CONSTRAINT "ItemForMenu_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_item_id_fkey";

-- DropTable
DROP TABLE "CustomMenuItem";

-- DropTable
DROP TABLE "MenuItem";

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_type" "CategoryType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomMenu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_type" "CategoryType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CustomMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemForMenu" ADD CONSTRAINT "ItemForMenu_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_custom_item_id_fkey" FOREIGN KEY ("custom_item_id") REFERENCES "CustomMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemForCustomMenu" ADD CONSTRAINT "ItemForCustomMenu_custom_menu_item_id_fkey" FOREIGN KEY ("custom_menu_item_id") REFERENCES "CustomMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
