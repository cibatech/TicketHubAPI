/*
  Warnings:

  - Added the required column `Transport` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CPF` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientsTicket" DROP CONSTRAINT "ClientsTicket_TicketId_fkey";

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "Transport" "routeKind" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Age" INTEGER NOT NULL DEFAULT 18,
ADD COLUMN     "CPF" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClientsTicket" ADD CONSTRAINT "ClientsTicket_TicketId_fkey" FOREIGN KEY ("TicketId") REFERENCES "Ticket"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
