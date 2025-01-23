import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { EntityDoesNotExistsErro } from "../../../Errors/EntityDoesNotExistsError";

export async function DELETEUserController(req:FastifyRequest,res:FastifyReply) {
        const service = new DeleteUserUseCase(new PrismaUserRepository);
    
        const {Id} = z.object({
            Id:z.string().uuid()
        }).parse(req.params)
     
    
        try{
            const response = await service.execute(Id);
    
            res.status(200).send({
                Description:"Successfully deleted user",
                response,
            })
        }catch(err){
            if(err instanceof EntityDoesNotExistsErro){
                res.status(404).send({
                    Description:"Can't find any user with this ID",
                    err
                })
            }
    
            res.status(500).send({
                Description:"Unknow error while trying to delete user",
                err
            })
        }
}