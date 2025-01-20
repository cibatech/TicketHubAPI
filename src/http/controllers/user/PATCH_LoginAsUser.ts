import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { ValidadeUserUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { EntityDoesNotExistsErro } from "../../../Errors/.index.ts";

export async function PATCHLoginAsUser(req:FastifyRequest,res:FastifyReply) {
    const service = await new ValidadeUserUseCase(new PrismaUserRepository);
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
        if(err instanceof EntityDoesNotExistsErro ){
            res.status(400).send({
                Description:"User does not exits",
                err
            })
        }   
    }
}