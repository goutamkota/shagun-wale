/*
  Warnings:

  - A unique constraint covering the columns `[item_name]` on the table `ItemList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemList_item_name_key" ON "ItemList"("item_name");
