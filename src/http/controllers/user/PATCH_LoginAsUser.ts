import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/.index.ts";
import { LoginUserUseCase } from "../../../services/index.ts";

export async function PATCHLoginAsUser(req:FastifyRequest,res:FastifyReply) {
    const service = new LoginUserUseCase(new PrismaUserRepository);
    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)

    try{
        const response = await service.execute(Email,Password)
        const token = await res.jwtSign({},{
            sign:{
                sub:response
            }
        })

        res.status(201).send({
            Description:"Successfully logged user-in",
            UserToken:token
        })
        
    }catch(err){
        if(err instanceof EntityDoesNotExistsError ){
            res.status(400).send({
                Description:"User does not exits",
                err
            })
        }   
    }
}