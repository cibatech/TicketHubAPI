import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError"
import { TicketRepository } from "../../repository/TicketRepository"
import { UserRepository } from "../../repository/UserRepository"
import { TicketInService } from "../../types/.index"
import { FormatTicketsToTicketsInService } from "../../utils/format/formatTicketToTicketInService"

/**
 * Classe Service para pegar Tickets pela UserId
 * @author Pedro Henryk
 */
export class GetTicketsByUserIdUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository,private UserRepo:UserRepository){}
    async execute(UserId: string): Promise<TicketInService[]> {
        const doesTheUserExists = await this.UserRepo.findById(UserId)
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        const tickets = await this.TicketRepo.findByUser(UserId);
        return FormatTicketsToTicketsInService(tickets);
    }
}