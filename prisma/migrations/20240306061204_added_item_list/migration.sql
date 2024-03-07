-- CreateTable
CREATE TABLE "ItemList" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_price" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "shelfLife" DOUBLE PRECISION,

    CONSTRAINT "ItemList_pkey" PRIMARY KEY ("id")
);
