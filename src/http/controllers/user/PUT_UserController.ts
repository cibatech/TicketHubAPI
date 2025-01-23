import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUserUseCase, UpdateUserServiceUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { EntityDoesNotExistsErro } from "../../../Errors/EntityDoesNotExistsError";

export async function PUTUserController(req:FastifyRequest,res:FastifyReply) {
        const service = new UpdateUserServiceUseCase(new PrismaUserRepository);
    
        const Id = req.user.sub
        
        const {Email,Nome} = z.object({
            Nome:z.string().optional(),
            Email:z.string().email().optional()
        }).parse(req.body)
    
        try{
            const response = await service.execute(Id,{
                Email,Nome
            });
    
            res.status(200).send({
                Description:"Successfully updated user",
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
                Description:"Unknow error while trying to update user",
                err
            })
        }
}