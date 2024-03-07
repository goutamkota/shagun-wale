/*
  Warnings:

  - Added the required column `custom_menu_item_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "custom_menu_item_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CustomOrder" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "total" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "custom_item_id" INTEGER NOT NULL,

    CONSTRAINT "CustomOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomMenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_type" "CategoryType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CustomMenuItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomOrder" ADD CONSTRAINT "CustomOrder_custom_item_id_fkey" FOREIGN KEY ("custom_item_id") REFERENCES "CustomMenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_custom_menu_item_id_fkey" FOREIGN KEY ("custom_menu_item_id") REFERENCES "CustomMenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
