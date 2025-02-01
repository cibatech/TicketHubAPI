import { Prisma, ClientsTicket } from "@prisma/client";
import { ClientsTicketRepository } from "../ClientsTicketRepository";
import { prisma } from "../../lib/prisma";

export class PrismaClientsTicketRepository implements ClientsTicketRepository {

    async create(data: Prisma.ClientsTicketUncheckedCreateInput): Promise<ClientsTicket> {
        return await prisma.clientsTicket.create({
            data,
        })
    }

    async findById(Id: string): Promise<ClientsTicket | null> {
        return await prisma.clientsTicket.findUnique({
            where:{
                Id,
            }
        })
    }

    async findByTicketId(TicketId: string): Promise<ClientsTicket[]> {
        return await prisma.clientsTicket.findMany({
            where:{
                TicketId,
            }
        })
    }

    async update(Id: string, data: Partial<ClientsTicket>): Promise<ClientsTicket | null> {
        return await prisma.clientsTicket.update({
            where:{
                Id,
            },
            data,
        })
    }

    async delete(Id: string): Promise<ClientsTicket | null> {
        return await prisma.clientsTicket.delete({
            where:{
                Id,
            }
        })
    }
}