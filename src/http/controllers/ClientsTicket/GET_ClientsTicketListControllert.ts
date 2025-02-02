import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientsTicketUseCase, GetClientsTicketByTicketIdUseCase } from "../../../services";
import { PrismaClientsTicketRepository, PrismaTicketRepository, PrismaUserRepository } from "../../../repository/.index";
import z from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";

export async function GETClientsTicketController(req:FastifyRequest, res:FastifyReply) {
        const service = new GetClientsTicketByTicketIdUseCase(
            new PrismaClientsTicketRepository,
            new PrismaTicketRepository,
        )

        const {TicketId} = z.object({
            TicketId:z.string().uuid()
        }).parse(req.params);

        try{
            const response = await service.execute(TicketId);

            res.status(201).send({
                Description:"Lista de clientes retornada com sucesso",
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