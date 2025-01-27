import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe para pegar Tickets validados de usuário específico
 * @author Pedro Henryk
 */
export class GetTicketsValidatedByUserIdUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(UserId: string){
        const tickets = await this.TicketRepo.findByValidatedAndUserId(UserId)
        if(!tickets) return null
        return FormatTicketsToTicketsInService(tickets)
    }
}