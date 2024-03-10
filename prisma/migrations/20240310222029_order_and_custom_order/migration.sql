/*
  Warnings:

  - Added the required column `paid` to the `CustomOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'SHIPPED', 'DELIVERED', 'RETURN_REQUESTED', 'RETURN_COMPLETED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('UPI', 'BANK', 'CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'OTHER');

-- AlterTable
ALTER TABLE "CustomOrder" ADD COLUMN     "customer_notes" TEXT,
ADD COLUMN     "paid" BOOLEAN NOT NULL,
ADD COLUMN     "payment_method" "Payment",
ADD COLUMN     "shipping_address" TEXT,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tracking_number" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customer_notes" TEXT,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "payment_method" "Payment",
ADD COLUMN     "shipping_address" TEXT,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tracking_number" TEXT;
