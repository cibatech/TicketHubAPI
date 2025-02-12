import { Ticket } from "@prisma/client";
import { TicketRepository } from "../../repository/TicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TravelRepository } from "../../repository/TravelRepository";
import { FormatTicketToTicketInService } from "../../utils/format/formatTicketToTicketInService";
import { faker } from "@faker-js/faker";

interface FilterTicketParams {
    UserId: string,
    TravelId?: string,
    minPrice?: number,
    maxPrice?: number,
    validatedAfterDay?: Date,
    validatedBeforeDay?: Date,
    completedAfterDay?: Date,
    completedBeforeDay?: Date,
}

export class GetTicketsByFilterUseCase {
    constructor(private TicketRepo: TicketRepository, private UserRepo: UserRepository, private TravelRepo: TravelRepository){}
    async execute({
        UserId,
        TravelId,
        minPrice,
        maxPrice,
        validatedAfterDay,
        validatedBeforeDay,
        completedAfterDay,
        completedBeforeDay,
    }: FilterTicketParams, Page: number){
        if(UserId) {
            const doesTheUserExists = await this.UserRepo.findById(UserId)
            if(!doesTheUserExists) throw new EntityDoesNotExistsError("User")
        }
        if(TravelId) {
            const doesTravelExists = await this.TravelRepo.findById(TravelId)
            if(!doesTravelExists) throw new EntityDoesNotExistsError("Travel")
        }

        const tickets = await this.TicketRepo.findByFilter({
            TotalTicketPrice:{
                gte: minPrice,
                lte: maxPrice,
            },
            Validated_at:{
                gte: validatedAfterDay,
                lte: validatedBeforeDay,
            },
            Completed_at:{
                gte: completedAfterDay,
                lte: completedBeforeDay,
            },
            userId:UserId,
            TravelId,
        }, Page)

        const response = await Promise.all(tickets.map(async e =>{
            const travel = await this.TravelRepo.findById(e.TravelId);

            return{
                ticket:e,
                travelRef:travel,
                byCompany:faker.company.name()
            }
        }))

        return response
    }
}