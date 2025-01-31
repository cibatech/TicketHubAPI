import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import { GetTicketsByUserIdUseCase } from "../../../services/Ticket/GetTicketsByUserIdService";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";

export async function GETTicketListFromUserController(req:FastifyRequest, res:FastifyReply) {
    const service = new GetTicketsByUserIdUseCase(new PrismaTicketRepository, new PrismaUserRepository);

    const UserId = req.user.sub //Get Token from JWT

    try{
        const response = await service.execute(UserId)

        res.status(200).send({
            Description:"Returned Ticket List",
            Ticket:response
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any user with the provided UserId"
            })
        }
    }
}