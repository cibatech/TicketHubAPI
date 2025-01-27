import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TicketRepository } from "../../repository/TicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { FormatTicketsToTicketsInService } from "../../utils/formatTicketToTicketInService";

/**
 * Classe para pegar Tickets completados de usuário específico
 * @author Pedro Henryk
 */
export class GetTicketsCompletedByUserIdUseCase {
    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository, private UserRepo: UserRepository){}
    async execute(UserId: string){
        const doesTheUserExists = await this.UserRepo.findById(UserId)
        if(!doesTheUserExists) throw new EntityDoesNotExistsError("User")
        const tickets = await this.TicketRepo.findByCompletedAndUserId(UserId)
        return FormatTicketsToTicketsInService(tickets)
    }
}