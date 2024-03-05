/*
  Warnings:

  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grand_total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "grand_total" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;
