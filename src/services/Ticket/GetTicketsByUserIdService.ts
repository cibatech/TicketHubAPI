import { Ticket } from "@prisma/client"
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError"
import { TicketRepository } from "../../repository/TicketRepository"
import { UserRepository } from "../../repository/UserRepository"
import { TicketInService } from "../../types/.index"
import { FormatTicketsToTicketsInService } from "../../utils/format/formatTicketToTicketInService"
import { TravelRepository } from "../../repository/TravelRepository"
import { faker } from "@faker-js/faker"

/**
 * Classe Service para pegar Tickets pela UserId
 * @author Pedro Henryk
 */
export class GetTicketsByUserIdUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository,private UserRepo:UserRepository,private travelRepo:TravelRepository){}
    async execute(UserId: string){
        const doesTheUserExists = await this.UserRepo.findById(UserId)
        var finalList:Ticket[] = [];
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        const tickets = await this.TicketRepo.findByUser(UserId);
        
        return await Promise.all(tickets.map(async e =>{
            const travel = this.travelRepo.findById(e.TravelId);

            return{
                ticket:e,
                travelRef:travel,
                byCompany:faker.company.name()
            }
        }))
    }
}