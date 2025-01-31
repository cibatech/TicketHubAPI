import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import z from "zod";
import { NullArgumentError } from "../../../Errors/NullArgumentError";

export async function POSTTicketController(req:FastifyRequest, res:FastifyReply) {
    const service = new CreateTicketUseCase(new PrismaTicketRepository);

    const UserId = req.user.sub //Get Token from JWT

    const {TravelId} = z.object({
        TravelId:z.string().uuid(),
    }).parse(req.body)

    try{
        const response = await service.execute({
            TravelId,userId:UserId
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