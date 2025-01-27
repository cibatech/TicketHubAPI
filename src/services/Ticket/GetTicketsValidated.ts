import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe para pegar Tickets que foram validados
 * @author Pedro Henryk
 */
export class GetTicketsValidatedUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    /**
     * Executa o service
     * @returns A list of `TicketInService`
     */
    async execute(){
        const tickets = await this.TicketRepo.findByValidated()
        return FormatTicketsToTicketsInService(tickets)
    }
}