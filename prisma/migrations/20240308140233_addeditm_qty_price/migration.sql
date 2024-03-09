/*
  Warnings:

  - Added the required column `itm_qty_price` to the `ItemForMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemForMenu" ADD COLUMN     "itm_qty_price" DOUBLE PRECISION NOT NULL;
