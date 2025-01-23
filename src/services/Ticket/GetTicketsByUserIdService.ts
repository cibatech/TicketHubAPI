import { TicketRepository } from "../../repository/TicketRepository"
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService"

/**
 * Classe Service para pegar Tickets pela UserId
 * @author Pedro Henryk
 */
export class GetTicketsByUserIdUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(UserId: string) {
        const tickets = await this.TicketRepo.findByUser(UserId)
        if(!tickets) return null
        return FormatTicketsToTicketsInService(tickets)
    }
}