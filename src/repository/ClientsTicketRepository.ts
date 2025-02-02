import { ClientsTicket, Prisma } from "@prisma/client";

export interface ClientsTicketRepository {
    create(data: Prisma.ClientsTicketUncheckedCreateInput): Promise<ClientsTicket>
    findById(Id: string): Promise<ClientsTicket | null>
    findByTicketId(TicketId: string): Promise<ClientsTicket[]>
    update(Id: string, data: Partial<ClientsTicket>): Promise<ClientsTicket | null>
    delete(Id: string): Promise<ClientsTicket | null>
}