import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe para pegar Tickets completados de usuário específico
 * @author Pedro Henryk
 */
export class GetTicketsCompletedByUserIdUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(UserId: string){
        const tickets = await this.TicketRepo.findByCompletedAndUserId(UserId)
        if(!tickets) return null
        return FormatTicketsToTicketsInService(tickets)
    }
}