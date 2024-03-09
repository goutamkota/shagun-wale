/*
  Warnings:

  - Added the required column `itm_qty_price` to the `ItemForCustomMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemForCustomMenu" ADD COLUMN     "itm_qty_price" DOUBLE PRECISION NOT NULL;
