import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import { GetTicketsByUserIdUseCase } from "../../../services/Ticket/GetTicketsByUserIdService";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { DeleteTicketUseCase } from "../../../services/Ticket/DeleteTicketService";
import z from "zod";

export async function DELETETicketController(req:FastifyRequest, res:FastifyReply) {
    const service = new DeleteTicketUseCase(new PrismaTicketRepository, new PrismaUserRepository);

    const {deleteTicket} = z.object({
        deleteTicket:z.string()
    }).parse(req.params)

    const UserId = req.user.sub;
    try{
        const response = await service.execute({Id:deleteTicket,UserId})

        res.status(200).send({
            Description:"Deleted the specified ticket",
            Ticket:response
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any ticket with the specified ID"
            })
        }
    }
}