import { Ticket } from "@prisma/client"

export async function FormatTicketToTicketInService(ticket: Ticket) {
    return {
        ValidatedAt: ticket.Validated_at,
        CompletedAt: ticket.Completed_at,
        TravelId: ticket.TravelId,
        Id: ticket.Id,
    }
}

export async function FormatTicketsToTicketsInService(tickets: Ticket[]){
    return tickets.map((ticket) => {
        return {
            ValidatedAt: ticket.Validated_at,
            CompletedAt: ticket.Completed_at,
            TravelId: ticket.TravelId,
            Id: ticket.Id
        }
    })
}