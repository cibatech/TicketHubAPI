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
    "Company" TEXT NOT NULL,
    "AssignedRoute" TEXT NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "Id" TEXT NOT NULL,
    "Travel_Day" TIMESTAMP(3) NOT NULL,
    "Validated_at" TIMESTAMP(3),
    "Completed_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "FinishPoint" TEXT NOT NULL,
    "BegginingPoint" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Point_Name_key" ON "Point"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_AssignedRoute_key" ON "Transport"("AssignedRoute");

-- CreateIndex
CREATE UNIQUE INDEX "User_Nome_key" ON "User"("Nome");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_Company_fkey" FOREIGN KEY ("Company") REFERENCES "Company"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_AssignedRoute_fkey" FOREIGN KEY ("AssignedRoute") REFERENCES "Route"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
