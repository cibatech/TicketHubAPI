/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_Nome_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClientsTicket" (
    "Id" TEXT NOT NULL,
    "OwnerId" TEXT NOT NULL,
    "PersonName" TEXT NOT NULL,
    "IsChild" BOOLEAN NOT NULL DEFAULT false,
    "IsCompanion" BOOLEAN NOT NULL DEFAULT false,
    "TicketId" TEXT NOT NULL,

    CONSTRAINT "ClientsTicket_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "ClientsTicket" ADD CONSTRAINT "ClientsTicket_TicketId_fkey" FOREIGN KEY ("TicketId") REFERENCES "Ticket"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
