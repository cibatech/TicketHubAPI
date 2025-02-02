-- CreateEnum
CREATE TYPE "routeKind" AS ENUM ('Air', 'Naval', 'Land', 'Rail');

-- CreateTable
CREATE TABLE "Point" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "Description" TEXT,
    "Ports" BOOLEAN NOT NULL DEFAULT false,
    "Railroads" BOOLEAN NOT NULL DEFAULT false,
    "Airports" BOOLEAN NOT NULL DEFAULT false,
    "route_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Route" (
    "Id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "RouteType" "routeKind" NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Company" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "Id" TEXT NOT NULL,
    "Model" TEXT NOT NULL,
    "Year" TIMESTAMP(3),
    "Color" TEXT,
    "Capacity" INTEGER NOT NULL DEFAULT 20,
    "Company" TEXT NOT NULL,
    "AssignedRoute" TEXT NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ClientsTicket" (
    "Id" TEXT NOT NULL,
    "OwnerId" TEXT NOT NULL,
    "PersonName" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "Age" INTEGER NOT NULL DEFAULT 18,
    "IsCompanion" BOOLEAN NOT NULL DEFAULT false,
    "TicketId" TEXT NOT NULL,

    CONSTRAINT "ClientsTicket_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "Id" TEXT NOT NULL,
    "TotalTicketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "Validated_at" TIMESTAMP(3),
    "Completed_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "TravelId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "Id" TEXT NOT NULL,
    "TravelBasePrice" DOUBLE PRECISION NOT NULL,
    "BeginningPointId" TEXT NOT NULL,
    "FinnishPointId" TEXT NOT NULL,
    "Travel_Day" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "Age" INTEGER NOT NULL DEFAULT 18,
    "Verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Point_Name_key" ON "Point"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_CNPJ_key" ON "Company"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_AssignedRoute_key" ON "Transport"("AssignedRoute");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_Company_fkey" FOREIGN KEY ("Company") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_AssignedRoute_fkey" FOREIGN KEY ("AssignedRoute") REFERENCES "Route"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsTicket" ADD CONSTRAINT "ClientsTicket_TicketId_fkey" FOREIGN KEY ("TicketId") REFERENCES "Ticket"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_TravelId_fkey" FOREIGN KEY ("TravelId") REFERENCES "Travel"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_BeginningPointId_fkey" FOREIGN KEY ("BeginningPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_FinnishPointId_fkey" FOREIGN KEY ("FinnishPointId") REFERENCES "Point"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
