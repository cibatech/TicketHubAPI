import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientsTicketUseCase, DeleteClientsTicketUseCase } from "../../../services";
import { PrismaClientsTicketRepository, PrismaTicketRepository, PrismaUserRepository } from "../../../repository/.index";
import z from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { ForbiddenActionError } from "../../../Errors/ForbiddenActionError";

export async function DELETEClientsTicketController(req:FastifyRequest, res:FastifyReply) {
        const service = new DeleteClientsTicketUseCase(
            new PrismaClientsTicketRepository,
            new PrismaUserRepository
        )

        const OwnerId = req.user.sub;

        const {Id} = z.object({
            Id:z.string().uuid()        
        }).parse(req.params)

        try{
            const response = await service.execute(Id,OwnerId);

            res.status(200).send({
                Description:"Cliente removido do ticket",
                Client:response
            })
        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                res.status(404).send({
                    Description:"Entidade nao encontrada",
                    err:err.message
                })
            } else if(err instanceof ForbiddenActionError){
                res.status(401).send({
                    Description:"O Id do usuário informado não é dono do ticket"
                })
            }else{
                res.status(500).send({
                    Description:"Erro desconhecido"
                })
            }
        }
    }