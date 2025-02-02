import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientsTicketUseCase } from "../../../services";
import { PrismaClientsTicketRepository, PrismaTicketRepository, PrismaUserRepository } from "../../../repository/.index";
import z from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { PrismaTravelRepository } from "../../../repository/Prisma/PrismaTravelRepository";

export async function POSTClientsTicketController(req:FastifyRequest, res:FastifyReply) {
        const service = new CreateClientsTicketUseCase(
            new PrismaClientsTicketRepository,
            new PrismaTicketRepository,
            new PrismaUserRepository,
            new PrismaTravelRepository
        )

        const OwnerId = req.user.sub;

        const {CPF,IsCompanion,TicketId,Age} = z.object({
            TicketId:z.string().uuid(),
            Age:z.number().optional(),
            CPF:z.string(),
            IsCompanion:z.boolean().default(false)
        
        }).parse(req.body)

        try{
            const response = await service.execute({OwnerId,TicketId,Age,CPF,IsCompanion});

            res.status(201).send({
                Description:"Cliente adicionado ao ticket",
                Client:response
            })
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                res.status(404).send({
                    Description:"Entidade nao encontrada",
                    err:err.message
                })
            }else{
                res.status(500).send({
                    Description:"Erro desconhecido"
                })
            }
        }
    }