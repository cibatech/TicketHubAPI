import { TicketRepository } from "../../repository/TicketRepository";
import { Prisma } from "@prisma/client"
import { TicketInService } from "../../types/.index";
import { FormatTicketToTicketInService } from "../../utils/format/formatTicketToTicketInService";
import { TravelRepository } from "../../repository/TravelRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/UserRepository";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";

/**
 * Classe Service para criar Tickets
 * @author Pedro Henryk
 */
export class CreateTicketUseCase {

    /**
     * @param TicketRepo `TicketRepository` Repositório para tickets
     */
    constructor(private TicketRepo: TicketRepository, private TravelRepo: TravelRepository, private UserRepo: UserRepository, private ClientsTicketRepo: ClientsTicketRepository){}
    async execute(data: Prisma.TicketUncheckedCreateInput): Promise<TicketInService>{
        
        const doesTheUserExists = await this.UserRepo.findById(data.userId)
        if(!doesTheUserExists) throw new EntityDoesNotExistsError("User")

        const ticket = await this.TicketRepo.create(data)


        await this.ClientsTicketRepo.create({
            CPF:doesTheUserExists.CPF,
            OwnerId: doesTheUserExists.Id,
            PersonName: doesTheUserExists.Nome,
            TicketId: ticket.Id
        })

        return FormatTicketToTicketInService(ticket)
    }
}