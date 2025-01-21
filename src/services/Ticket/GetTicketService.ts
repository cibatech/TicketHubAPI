import { TicketRepository } from "../../repository/TicketRepository";
import { TicketInService } from "../../types/.index";

interface GetTicketParams {
    Id?: string,
    UserId?: string,
    ValidatedAt?: Date,
    CompletedAt?: Date,
}

/**
 * Classe Service para procurar Tickets no Banco de Dados
 * @author Pedro Henryk
 */
export class GetTicketUseCase {

    /**
     * Construtor da classe
     * @param TicketRepo - O repositório dos Tickets
     */
    constructor(private TicketRepo: TicketRepository){}

    /**
     * Executar a ação de procurar o Ticket
     * @param GetTicketParams - Interface que pode receber quatro parametros um Id de Ticket, um UserId de usuário, uma date ValidatedAt e uma 
     * data CompletedAt, a função fará a procura de acorda com os parâmetros passados (Se for o Id, procurará por aquele Id, se for UserId 
     * procurará pelo Id do usuário, etc..). Por isso, não passe mais de um parâmetro por vez, mas se passar (teimoso) a ordem dos IF-ELSE é: 1.
     * Id, 2.UserId, 3.ValidationAt, 4.CompletedAt
     */
    async execute({
        Id,
        UserId,
        ValidatedAt,
        CompletedAt,
    }: GetTicketParams): Promise<TicketInService | null>{
        if(Id){
            const ticket = await this.TicketRepo.findById(Id)
            if(!ticket) return null
            return {
                ValidatedAt: ticket.Completed_at,
                CompletedAt: ticket.Validated_at,
                TravelId: ticket.TravelId,
            }
        }
        else if(UserId){
            //#TODO
        }
        else if(ValidatedAt){

        }
        else if(CompletedAt){
            
        }
        return null
    }
}