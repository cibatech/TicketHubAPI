import { TicketRepository } from "../../repository/TicketRepository";
import { Prisma } from "@prisma/client"
import { TicketInService } from "../../types/.index";
import { FormatTicketToTicketInService } from "../../utils/formatTicketToTicketInService";
import { TravelRepository } from "../../repository/TravelRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/UserRepository";

/**
 * Classe Service para criar Tickets
 * @author Pedro Henryk
 */
export class CreateTicketUseCase {

    /**
     * @param TicketRepo `TicketRepository` Repositório para tickets
     */
    constructor(private TicketRepo: TicketRepository, private TravelRepo: TravelRepository, private UserRepo: UserRepository){}
    async execute(data: Prisma.TicketUncheckedCreateInput): Promise<TicketInService>{
        const doesTravelExists = this.TravelRepo.findById(data.TravelId)
        if(!doesTravelExists || data.TravelId === "") throw new EntityDoesNotExistsError("Travel")

        const doesTheUserExists = this.UserRepo.findById(data.userId)
        if(!doesTheUserExists || data.userId === "") throw new EntityDoesNotExistsError("User")

        const ticket = await this.TicketRepo.create(data)
        return FormatTicketToTicketInService(ticket)
    }
}