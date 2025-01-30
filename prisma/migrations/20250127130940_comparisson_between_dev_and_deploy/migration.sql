/*
  Warnings:

  - Made the column `userId` on table `Ticket` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `TravelBasePrice` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "TotalTicketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "TravelBasePrice" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
