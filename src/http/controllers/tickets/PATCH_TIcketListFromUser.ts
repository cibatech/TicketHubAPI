import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import { GetTicketsByUserIdUseCase } from "../../../services/Ticket/GetTicketsByUserIdService";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { GetTicketsByFilterUseCase } from "../../../services/Ticket/GetTicketsByFilterService";
import { PrismaTravelRepository } from "../../../repository/Prisma/PrismaTravelRepository";
import z from "zod";
import { PrismaPointRepository } from "../../../repository/.index";

export async function PATCHTicketListFromUserController(req:FastifyRequest, res:FastifyReply) {
    const service = new GetTicketsByFilterUseCase(
        new PrismaTicketRepository, 
        new PrismaUserRepository, 
        new PrismaTravelRepository, 
        new PrismaPointRepository
    );

    const UserId = req.user.sub //Get Token from JWT

    const {Page} = z.object({
        Page:z.string().default("1")
    }).parse(req.params)

    const {completedAfterDay,completedBeforeDay,validatedAfterDay,validatedBeforeDay,TravelId,maxPrice,minPrice} = z.object({
        TravelId:z.string().uuid().optional() ,
        minPrice:z.number().optional(),
        maxPrice:z.number().optional(),
        validatedAfterDay:z.string().optional(),
        validatedBeforeDay:z.string().optional(),
        completedAfterDay:z.string().optional(),
        completedBeforeDay:z.string().optional(),
    }).parse(req.body)

    try{


        const response = await service.execute({UserId,
            completedAfterDay:completedAfterDay?new Date(completedAfterDay):undefined,
            completedBeforeDay:completedBeforeDay?new Date(completedBeforeDay):undefined
            ,maxPrice,minPrice,
            TravelId,
            validatedAfterDay:validatedAfterDay?new Date(validatedAfterDay):undefined,
            validatedBeforeDay:validatedBeforeDay?new Date(validatedBeforeDay):undefined
        },Number(Page));

        res.status(200).send({
            Description:"Returned Ticket List",
            Ticket:response,
            config:{
                completedAfterDay,completedBeforeDay,maxPrice,minPrice,TravelId,validatedAfterDay,validatedBeforeDay
            }
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any user with the provided UserId"
            })
        }
    }
}