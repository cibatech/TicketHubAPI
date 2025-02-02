import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketToTicketInService } from "../../utils/format/formatTicketToTicketInService";

/**
 * Classe Service para procurar Tickets no Banco de Dados
 * @author Pedro Henryk
 */
export class GetTicketByIdUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(Id: string) {
        const ticket = await this.TicketRepo.findById(Id)
        if(!ticket) throw new EntityDoesNotExistsError("Ticket")
        return FormatTicketToTicketInService(ticket)
    }
}