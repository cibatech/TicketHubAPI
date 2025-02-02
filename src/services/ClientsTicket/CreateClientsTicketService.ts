import { Prisma } from "@prisma/client";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { TicketRepository } from "../../repository/TicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { FormatToInServiceClientsTicket } from "../../utils/FormatToInServiceClientsTicket";

/**
 * Criar um ClientTicket
 * 
 * @param data - Prisma.ClientsTicketUncheckedCreateInput
 * 
 * @throws `EntityDoesNotExistsError` se o usuário ou o ticket não existirem
 * 
 * @return O ClientTicket criado
 */
export class CreateClientsTicketUseCase {
    constructor(private ClientsTicketRepo: ClientsTicketRepository, private TicketRepo: TicketRepository, private UserRepo: UserRepository){}
    async execute(data: Prisma.ClientsTicketUncheckedCreateInput){
        const doesUserExists = await this.UserRepo.findById(data.OwnerId)
        if(!doesUserExists) throw new EntityDoesNotExistsError("User")

        const doesTicketExists = await this.TicketRepo.findById(data.TicketId)
        if(!doesTicketExists) throw new EntityDoesNotExistsError("Ticket")

        const clientTicket = await this.ClientsTicketRepo.create(data)

        return FormatToInServiceClientsTicket(clientTicket)
    }
}