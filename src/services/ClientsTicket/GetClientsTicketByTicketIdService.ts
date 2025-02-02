import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { TicketRepository } from "../../repository/TicketRepository";
import { InServiceClientsTickets } from "../../types/dtos/InServiceClientTicket";
import { FormatToInServiceClientsTickets } from "../../utils/FormatToInServiceClientsTicket";

/**
 * Pegar vários ClientsTickets pelo TicketId
 * 
 * @param TicketId - Id do Ticket
 * 
 * @throws `EntityDoesNotExistsError` se o Ticket não existir
 * 
 * @returns A Promise de uma lista de Tickets em Service
 */
export class GetClientsTicketByTicketIdUseCase {
    constructor(private ClientsTicketRepo: ClientsTicketRepository, private TicketRepo: TicketRepository){}
    async execute(TicketId: string): Promise<InServiceClientsTickets[]> {
        const doesTicketExists = await this.TicketRepo.findById(TicketId)
        if(!doesTicketExists) throw new EntityDoesNotExistsError("Ticket")

        const clientsTickets = await this.ClientsTicketRepo.findByTicketId(TicketId)

        return FormatToInServiceClientsTickets(clientsTickets)
    }
}