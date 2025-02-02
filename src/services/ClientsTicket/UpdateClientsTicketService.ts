import { ClientsTicket } from "@prisma/client";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/UserRepository";
import { ForbiddenActionError } from "../../Errors/ForbiddenActionError";
import { FormatToInServiceClientsTicket } from "../../utils/FormatToInServiceClientsTicket";

/**
 * Classe para atualizar um ClientTicket
 * 
 * @param Id - Id do ClientTicket
 * 
 * @param UserId - Id do dono do ClientTicket
 * 
 * @param data - Dados novos do ClientTicket
 * 
 * @throws `EntityDoesNotExistsError` se o User ou o ClientTicket não existirem
 * 
 * @throws `ForbiddenActionError` se o UserId não for igual ao OwnerId do ClientTicket encontrado
 * 
 * @returns InServiceClientsTicket com as informações do ClientTicket atualizado
 */
export class UpdateClientsTicketUseCase {
    constructor(private ClientsTicketRepo: ClientsTicketRepository, private UserRepo: UserRepository){}
    async execute(Id: string, UserId: string, data: Partial<ClientsTicket>){
        const doesUserExists = await this.UserRepo.findById(UserId)
        if(!doesUserExists) throw new EntityDoesNotExistsError("User")

        const doesClientTicketExists = await this.ClientsTicketRepo.findById(Id)
        if(!doesClientTicketExists) throw new EntityDoesNotExistsError("ClientTicket")

        if(!(doesClientTicketExists.OwnerId === doesUserExists.Id)) throw new ForbiddenActionError("User is not the owner of the ClientTicket")

        const updatedClientTicket = await this.ClientsTicketRepo.update(Id, data)
        if(!updatedClientTicket) throw new Error("Congratulations, it was supposed to be impossible to see this error message!")

        return FormatToInServiceClientsTicket(updatedClientTicket)
    }
}