import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { ForbiddenActionError } from "../../Errors/ForbiddenActionError";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { FormatToInServiceClientsTicket } from "../../utils/FormatToInServiceClientsTicket";

/**
 * Classe para deletar um ClientTicket
 * 
 * @param Id - Id do ClientTicket
 * 
 * @param UserId - Id do dono do ClientTicket
 * 
 * @throws `EntityDoesNotExistsError` se o User ou o ClientTicket não existirem
 * 
 * @throws `ForbiddenActionError` se o UserId não for igual ao OwnerId do ClientTicket encontrado
 * 
 * @returns InServiceClientsTicket com as informações do ClientTicket deletado
 */
export class DeleteClientsTicketUseCase {
    constructor(private ClientsTicketRepo: ClientsTicketRepository, private UserRepo: UserRepository){}
    async execute(Id: string, UserId: string){
        const doesUserExists = await this.UserRepo.findById(UserId)
        if(!doesUserExists) throw new EntityDoesNotExistsError("User")

        const doesClientTicketExists = await this.ClientsTicketRepo.findById(Id)
        if(!doesClientTicketExists) throw new EntityDoesNotExistsError("ClientTicket")

        if(!(doesClientTicketExists.OwnerId === doesUserExists.Id)) throw new ForbiddenActionError("User is not the owner of the ClientTicket")

        const deletedClientTicket = await this.ClientsTicketRepo.delete(Id)
        if(!deletedClientTicket) throw new Error("Congratulations, it was supposed to be impossible to see this error message!")

        return FormatToInServiceClientsTicket(deletedClientTicket)
    }
}