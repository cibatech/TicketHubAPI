import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { TicketRepository } from "../../repository/TicketRepository";
import { UserRepository } from "../../repository/UserRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { FormatToInServiceClientsTicket } from "../../utils/format/FormatToInServiceClientsTicket";
import { TravelRepository } from "../../repository/TravelRepository";
import { NullArgumentError } from "../../Errors/NullArgumentError";


export interface CreateClienstTicketInterface{
    OwnerId:string,
    TicketId:string,
    IsCompanion:boolean | undefined,
    Age:number | undefined,
    CPF:string,
    PersonName?:string
}

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
    constructor(private ClientsTicketRepo: ClientsTicketRepository, private TicketRepo: TicketRepository, private UserRepo: UserRepository,private TravelRepo:TravelRepository){}
    async execute(data:CreateClienstTicketInterface){
        const doesUserExists = await this.UserRepo.findById(data.OwnerId)
        if(!doesUserExists) throw new EntityDoesNotExistsError("User")

        const doesTicketExists = await this.TicketRepo.findById(data.TicketId)
        if(!doesTicketExists) throw new EntityDoesNotExistsError("Ticket")

        const clientTicket = await this.ClientsTicketRepo.create({
            PersonName:data.PersonName?data.PersonName:doesUserExists.Nome,
            OwnerId:data.OwnerId,
            TicketId:data.TicketId,
            IsCompanion:data.IsCompanion,
            Age:data.Age?data.Age:18,
            CPF:data.CPF
        })

        
        const travel = await this.TravelRepo.findById(doesTicketExists.TravelId)
        if(!travel){
            throw new NullArgumentError("Travel")
        }
        const price = travel.TravelBasePrice;

        //atualiza o preço do ticket
        await this.TicketRepo.update(data.TicketId,{
            TotalTicketPrice:doesTicketExists.TotalTicketPrice+price
        })

        return FormatToInServiceClientsTicket(clientTicket)
    }
}