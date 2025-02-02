import { ClientsTicket } from "@prisma/client";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { ClientsTicketRepository } from "../../repository/ClientsTicketRepository";
import { TicketRepository } from "../../repository/TicketRepository";
import { TicketInService } from "../../types/.index";
import { FormatTicketToTicketInService } from "../../utils/format/formatTicketToTicketInService";

export interface GetTicketByIdResponse{
    ticket:TicketInService,
    ClientList:ClientsTicket[]
}

/**
 * Classe Service para procurar Tickets no Banco de Dados
 * @author Pedro Henryk
 */
export class GetTicketByIdUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository, private ClientRepo:ClientsTicketRepository){}
    async execute(Id: string):Promise<GetTicketByIdResponse>{
        const ticket = await this.TicketRepo.findById(Id)
        if(!ticket) throw new EntityDoesNotExistsError("Ticket")

        const ClientList = await this.ClientRepo.findByTicketId(Id);
        
        return {
            ticket:await FormatTicketToTicketInService(ticket),
            ClientList
        }
    }
}