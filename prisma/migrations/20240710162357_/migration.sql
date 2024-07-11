-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RedeemItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "redeemId" INTEGER NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RedeemHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
