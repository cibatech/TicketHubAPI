import { Prisma, Ticket } from "@prisma/client";
import { TicketRepository } from "../TicketRepository";
import { randomUUID } from "crypto";


export class InMemoryTicketRepository implements TicketRepository {
    public tickets: Ticket[] = [];

    async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
        const newTicket: Ticket = {
            Id: String(randomUUID()),
            userId: String(data.userId),
            Completed_at: data.Completed_at?new Date(data.Completed_at):null,
            Validated_at: data.Validated_at?new Date(data.Validated_at):null,
            TravelId: data.TravelId
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

    async findByValidated(): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Validated_at !== null);
    }

    async findByValidatedAndUserId(UserId: string): Promise<Ticket[]> {
        return this.tickets.filter(ticket => (ticket.userId === UserId && ticket.Validated_at !== null))
    }

    async findByCompleted(): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Completed_at !== null);
    }

    async findByCompletedAndUserId(UserId: string): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.userId === UserId && ticket.Completed_at !== null)
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
