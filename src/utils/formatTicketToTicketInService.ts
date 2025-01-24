import { Ticket } from "@prisma/client"
import { TicketInService } from "../types/.index"

export async function FormatTicketToTicketInService(ticket: Ticket): Promise<TicketInService> {
    return {
        ValidatedAt: ticket.Validated_at,
        CompletedAt: ticket.Completed_at,
        TravelId: ticket.TravelId,
        Id: ticket.Id,
    }
}

export async function FormatTicketsToTicketsInService(tickets: Ticket[]): Promise<TicketInService[]>{
    return tickets.map((ticket) => {
        return {
            ValidatedAt: ticket.Validated_at,
            CompletedAt: ticket.Completed_at,
            TravelId: ticket.TravelId,
            Id: ticket.Id
        }
    })
}