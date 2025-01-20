/*
  Warnings:

  - You are about to drop the column `IsChild` on the `ClientsTicket` table. All the data in the column will be lost.
  - You are about to drop the column `BegginingPoint` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `FinishPoint` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `CPF` to the `ClientsTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BeginningPointId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FinnishPointId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientsTicket" DROP COLUMN "IsChild",
ADD COLUMN     "Age" INTEGER NOT NULL DEFAULT 18,
ADD COLUMN     "CPF" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "BegginingPoint",
DROP COLUMN "FinishPoint",
ADD COLUMN     "BeginningPointId" TEXT NOT NULL,
ADD COLUMN     "FinnishPointId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transport" ADD COLUMN     "Capacity" INTEGER NOT NULL DEFAULT 20;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_BeginningPointId_fkey" FOREIGN KEY ("BeginningPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_FinnishPointId_fkey" FOREIGN KEY ("FinnishPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
