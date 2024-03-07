/*
  Warnings:

  - You are about to drop the column `shelfLife` on the `ItemList` table. All the data in the column will be lost.
  - Changed the type of `item_id` on the `ItemForCustomMenu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `item_id` on the `ItemForMenu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `item_quantity` to the `ItemList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s_i_unit` to the `ItemList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemForCustomMenu" DROP COLUMN "item_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ItemForMenu" DROP COLUMN "item_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ItemList" DROP COLUMN "shelfLife",
ADD COLUMN     "item_image" TEXT,
ADD COLUMN     "item_quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "s_i_unit" TEXT NOT NULL,
ADD COLUMN     "shelf_life" DOUBLE PRECISION,
ALTER COLUMN "item_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_pic" TEXT;
