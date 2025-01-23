import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe para pegar Tickets pela data que foram completadas
 * @author Pedro Henryk
 */
export class GetTicketsByCompletedDateUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(CompletedAt: Date){
        const tickets = await this.TicketRepo.findByCompletedDate(CompletedAt)
        if(!tickets) return null
        return FormatTicketsToTicketsInService(tickets)
    }
}