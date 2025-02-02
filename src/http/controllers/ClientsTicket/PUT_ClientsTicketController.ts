import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClientsTicketUseCase, UpdateClientsTicketUseCase } from "../../../services";
import { PrismaClientsTicketRepository, PrismaTicketRepository, PrismaUserRepository } from "../../../repository/.index";
import z from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { ForbiddenActionError } from "../../../Errors/ForbiddenActionError";

export async function PUTClientsTicketController(req:FastifyRequest, res:FastifyReply) {
        const service = new UpdateClientsTicketUseCase(
            new PrismaClientsTicketRepository,
            new PrismaUserRepository
        )

        const OwnerId = req.user.sub;

        const {CPF,IsCompanion,TicketId,Age} = z.object({
            TicketId:z.string().uuid().optional(),
            Age:z.number().optional(),
            CPF:z.string().optional(),
            IsCompanion:z.boolean().default(false).optional()
        
        }).parse(req.body)

        const {Id} = z.object({
            Id:z.string().uuid()
        }).parse(req.params)

        try{
            const response = await service.execute(Id,OwnerId,{TicketId,Age,CPF,IsCompanion});

            res.status(201).send({
                Description:"Cliente atualizado com sucesso",
                Client:response
            })


        }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                res.status(404).send({
                    Description:"Entidade nao encontrada",
                    err:err.message
                })
            }else if(err instanceof ForbiddenActionError){
                    res.status(401).send({
                        Description:"O Id do usuário informado não é dono do ticket"
                    })
            } else{
                res.status(500).send({
                    Description:"Erro desconhecido"
                })
            }
        }
    }