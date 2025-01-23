import { Prisma, Ticket } from "@prisma/client";
import { TickerRepository } from "../TicketRepository";
import { randomUUID } from "crypto";


export class InMemoryTicketRepository implements TickerRepository {
    private tickets: Ticket[] = [];

    async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
        const newTicket: Ticket = {
            Id: randomUUID(),
            userId: String(data.userId),
            BegginingPoint: data.BegginingPoint,
            FinishPoint: data.FinishPoint,
            Travel_Day:new Date(data.Travel_Day),
            Completed_at:null,Validated_at:null
        };

        this.tickets.push(newTicket);
        return newTicket;
    }

    async findById(id: string): Promise<Ticket | null> {
        return this.tickets.find(ticket => ticket.Id === id) || null;
    }

    async findByUser(userId: string): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.userId === userId);
    }

    async findByBegginingPoint(pointId: string): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.BegginingPoint === pointId);
    }

    async findByEndingPoint(pointId: string): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.FinishPoint === pointId);
    }
    
    async update(id: string, data: Partial<Ticket>): Promise<Ticket | null> {
        const ticket = this.tickets.find(ticket => ticket.Id === id);
        if (!ticket) return null;

        const updatedTicket: Ticket = {
            ...ticket,
            ...data,
        };

        this.tickets = this.tickets.map(t => (t.Id === id ? updatedTicket : t));
        return updatedTicket;
    }

    async delete(id: string): Promise<Ticket | null> {
        const index = this.tickets.findIndex(ticket => ticket.Id === id);
        if (index === -1) return null;

        const [deletedTicket] = this.tickets.splice(index, 1);
        return deletedTicket;
    }
}
