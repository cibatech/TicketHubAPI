/*
  Warnings:

  - A unique constraint covering the columns `[CNPJ]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Company_CNPJ_key" ON "Company"("CNPJ");
