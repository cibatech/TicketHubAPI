/*
  Warnings:

  - You are about to drop the column `BeginningPointId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `FinnishPointId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `Travel_Day` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `TravelId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_BeginningPointId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_FinnishPointId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "BeginningPointId",
DROP COLUMN "FinnishPointId",
DROP COLUMN "Travel_Day",
ADD COLUMN     "TotalTicketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "TravelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Travel" (
    "Id" TEXT NOT NULL,
    "TravelBasePrice" DOUBLE PRECISION NOT NULL,
    "BeginningPointId" TEXT NOT NULL,
    "FinnishPointId" TEXT NOT NULL,
    "Travel_Day" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_TravelId_fkey" FOREIGN KEY ("TravelId") REFERENCES "Travel"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_BeginningPointId_fkey" FOREIGN KEY ("BeginningPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_FinnishPointId_fkey" FOREIGN KEY ("FinnishPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
