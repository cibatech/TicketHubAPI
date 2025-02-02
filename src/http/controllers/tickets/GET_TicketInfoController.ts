import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTicketUseCase } from "../../../services/Ticket/CreateTicketService";
import { PrismaTicketRepository } from "../../../repository/Prisma/PrismaTicketRepository";
import { GetTicketsByUserIdUseCase } from "../../../services/Ticket/GetTicketsByUserIdService";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { GetTicketByIdUseCase } from "../../../services";
import { PrismaClientsTicketRepository } from "../../../repository/.index";
import z from "zod";

export async function GETTicketInfoController(req:FastifyRequest, res:FastifyReply) {
    const service = new GetTicketByIdUseCase(new PrismaTicketRepository, new PrismaClientsTicketRepository);

    const {Id} = z.object({
        Id:z.string().uuid()
    }).parse(req.params)

    try{
        const response = await service.execute(Id)

        res.status(200).send({
            Description:"Informações do ticket retornadas com sucesso",
            response
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Não foi possivel encontrar o ticket"
            })
        }else{
            res.status(500).send({
                Description:"Erro desconhecido"
            })
        }
    }
}