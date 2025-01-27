import { Ticket } from "@prisma/client";
import { TicketRepository } from "../../repository/TicketRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { FormatTicketToTicketInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe Service para modificar um Ticket.
 * @author Pedro Henryk
 */
export class UpdateTicketUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}

    /**
     * Executa a ação, não dá pra mudar O Id e o UserId
     * @param Id - Id do Ticket
     * @param data - Dados para serem atualizados
     */
    async execute(Id: string, data: Partial<Ticket>){
        const ticket = await this.TicketRepo.update(Id, {
            Completed_at: data.Completed_at,
            Validated_at: data.Validated_at,
            TravelId: data.TravelId,
        })
        if(!ticket){
            throw new EntityDoesNotExistsError("Ticket")
        }
        return FormatTicketToTicketInService(ticket) 
    }
}