import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TicketRepository } from "../../repository/TicketRepository";
import { FormatTicketToTicketInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe Service para deletar ticket
 * 
 * @author Pedro Henryk
 */
export class DeleteTicketUseCase {

     /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}

    /**
     * Executa a ação
     * @param Id - Id do Ticket
     * @throws `EntityDoesNotExistsError` se o ticket não for encontrado
     * @returns O Ticked deletado
     */
    async execute(Id: string){
        const deletedTicket = await this.TicketRepo.delete(Id)
        if(!deletedTicket){
            throw new EntityDoesNotExistsError("Ticket")
        }
        return FormatTicketToTicketInService(deletedTicket)
    }
}