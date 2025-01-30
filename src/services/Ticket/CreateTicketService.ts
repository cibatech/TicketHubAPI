import { NullArgumentError } from "../../Errors/NullArgumentError";
import { TicketRepository } from "../../repository/TicketRepository";
import { Prisma } from "@prisma/client"
import { TicketInService } from "../../types/.index";

/**
 * Classe Service para criar Tickets
 * @author Pedro Henryk
 */
export class CreateTicketUseCase {

    /**
     * @param TicketRepo `TicketRepository` Repositório para tickets
     */
    constructor(private TicketRepo: TicketRepository){}
    async execute(data: Prisma.TicketUncheckedCreateInput): Promise<TicketInService>{
        if(!data.TravelId){
            throw new NullArgumentError("TravelId")
        }
        const ticket = await this.TicketRepo.create(data)
        return {
            ValidatedAt: ticket.Validated_at,
            CompletedAt: ticket.Completed_at,
            TravelId: ticket.TravelId,
            Id: ticket.Id
        }
    }
}