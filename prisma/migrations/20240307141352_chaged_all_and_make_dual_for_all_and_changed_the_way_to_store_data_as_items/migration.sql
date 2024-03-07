/*
  Warnings:

  - You are about to drop the column `item_name` on the `ItemForCustomMenu` table. All the data in the column will be lost.
  - You are about to drop the column `item_quantity` on the `ItemForCustomMenu` table. All the data in the column will be lost.
  - You are about to drop the column `item_name` on the `ItemForMenu` table. All the data in the column will be lost.
  - You are about to drop the column `item_quantity` on the `ItemForMenu` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `ItemForCustomMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ItemForCustomMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `ItemForMenu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ItemForMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomOrder" ALTER COLUMN "quantity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemForCustomMenu" DROP COLUMN "item_name",
DROP COLUMN "item_quantity",
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemForMenu" DROP COLUMN "item_name",
DROP COLUMN "item_quantity",
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "quantity" DROP NOT NULL;
