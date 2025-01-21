import { Prisma, Ticket } from "@prisma/client";
import { TicketRepository } from "../TicketRepository";
import { randomUUID } from "crypto";


export class InMemoryTicketRepository implements TicketRepository {
    private tickets: Ticket[] = [];

    async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
        const newTicket: Ticket = {
            Id: randomUUID(),
            userId: String(data.userId),
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

    async findByValidation(): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Validated_at !== null);
    }

    async findByValidatedDate(ValidatedAt: Date): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Validated_at === ValidatedAt)
    }

    async findByCompleted(): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Completed_at !== null);
    }

    async findByCompletedDate(CompletedAt: Date): Promise<Ticket[]> {
        return this.tickets.filter(ticket => ticket.Completed_at === CompletedAt)
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
