import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import z from "zod";
import { NullArgumentError } from "../../../Errors/NullArgumentError";
import { PrismaTravelRepository } from "../../../repository/Prisma/PrismaTravelRepository";
import { PrismaClientsTicketRepository, PrismaUserRepository } from "../../../repository/.index";
import { ClientsTicketRouter } from "../../routes/ClientsTicket.Router";

export async function POSTTicketController(req:FastifyRequest, res:FastifyReply) {
    const service = new CreateTicketUseCase(
                        new PrismaTicketRepository,
                        new PrismaTravelRepository,
                        new PrismaUserRepository,
                        new PrismaClientsTicketRepository
                    );

    const UserId = req.user.sub //Get Token from JWT

    const {TravelId,CompanionsList} = z.object({
        TravelId:z.string().uuid(),
        CompanionsList:z.array(z.object({
            Age:z.number(),
            CPF:z.string(),
            IsCompanion:z.boolean().default(false),
            Name:z.string()
        }))
    }).parse(req.body)

    try{
        
        const response = await service.execute({
            data:{
                TravelId,userId:UserId
            },
            CompanionsList:CompanionsList
        })

        res.status(201).send({
            Description:"Created Ticket for user",
            Ticket:response
        })
    }catch(err){
        if(err instanceof NullArgumentError){
            res.status(400).send({
                Description:"Null argument"
            })
        }
    }
}