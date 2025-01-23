import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe Service para pegar Tickets que foram completados
 * @author Pedro Henryk
 */
export class GetTicketsCompletedUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(){
        const tickets = await this.TicketRepo.findByCompleted()
        if(!tickets) return null
        return FormatTicketsToTicketsInService(tickets)
    }
}