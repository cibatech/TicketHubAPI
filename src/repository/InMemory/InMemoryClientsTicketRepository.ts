import { Prisma, ClientsTicket } from "@prisma/client";
import { ClientsTicketRepository } from "../ClientsTicketRepository";
import { randomUUID } from "crypto";

export class InMemoryClientsTicketRepository implements ClientsTicketRepository {
    private clientsTickets: ClientsTicket[] = []

    async create(data: Prisma.ClientsTicketUncheckedCreateInput): Promise<ClientsTicket> {
        const clientTicket: ClientsTicket = {
            IsCompanion: Boolean(data.IsCompanion),
            PersonName: data.PersonName,
            TicketId: data.TicketId,
            OwnerId: data.OwnerId,
            CPF: data.CPF,
            Age: Number(data.Age),
            Id: String(randomUUID())
        }
        this.clientsTickets.push(clientTicket)
        return clientTicket
    }

    async findById(Id: string): Promise<ClientsTicket | null> {
        return this.clientsTickets.find(clientsTicket => clientsTicket.Id === Id) ?? null
    }

    async findByTicketId(TicketId: string): Promise<ClientsTicket[]> {
        return this.clientsTickets.filter(clientsTicket => clientsTicket.TicketId === TicketId)
    }

    async update(Id: string, data: Partial<ClientsTicket>): Promise<ClientsTicket | null> {
        const clientTicket = this.clientsTickets.find(clientsTicket => clientsTicket.Id === Id)
        if(!clientTicket) return null

        const updatedClientTicket = {
            ...clientTicket,
            ...data
        }

        this.clientsTickets = this.clientsTickets.map(clientsTicket => clientsTicket.Id === Id ? updatedClientTicket : clientsTicket)
        return updatedClientTicket
    }

    async delete(Id: string): Promise<ClientsTicket | null> {
        const index = this.clientsTickets.findIndex(clientsTicket => clientsTicket.Id === Id)
        if(index === -1) return null

        const [deletedClientTicket] = this.clientsTickets.splice(index, 1)
        return deletedClientTicket
    }

}