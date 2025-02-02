import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { ForbiddenActionError } from "../../Errors/ForbiddenActionError";
import { TicketRepository } from "../../repository/TicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { FormatTicketToTicketInService } from "../../utils/format/formatTicketToTicketInService";

interface DeleteTicketParams {
    Id: string,
    UserId: string,
}

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
    constructor(private TicketRepo: TicketRepository, private UserRepo: UserRepository){}

    /**
     * Executa a ação
     * @param Id - Id do Ticket
     * @param UserId - Id do dono do ticket
     * @throws `EntityDoesNotExistsError` se o ticket não for encontrado
     * @returns O Ticked deletado
     */
    async execute({
        Id,
        UserId,
    }: DeleteTicketParams){
        const doesUserExists = await this.UserRepo.findById(UserId)
        if(!doesUserExists) throw new EntityDoesNotExistsError("User")

        const doesTicketExists = await this.TicketRepo.findById(Id)
        if(!doesTicketExists) throw new EntityDoesNotExistsError("Travel")

        if(doesTicketExists.userId !== doesUserExists.Id)
            throw new ForbiddenActionError("UserId does not match ticket's owner Id")

        const deletedTicket = await this.TicketRepo.delete(Id)
        if(!deletedTicket) throw new Error("Congratulations ,it was supposed to be impossible to see this error message!")

        return FormatTicketToTicketInService(deletedTicket)
    }
}