import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { EntityAlreadyExists } from "../../../Errors/.index";

export async function POSTUserController(req:FastifyRequest,res:FastifyReply) {
    const service = new CreateUserUseCase(new PrismaUserRepository);
    const {Email,Password,Nome} = z.object({
        Email:z.string().email(),
        Password:z.string(),
        Nome:z.string()
    }).parse(req.body)

    try{
        const response = await service.execute({
            Email,Password,Nome
        })

        res.status(201).send({
            Description:"Successfully registered the user",
            response,
        })
    }catch(err){
        if(err instanceof EntityAlreadyExists){
            res.status(403).send({
                Description:"There's already an user registered with this email adress",
                
            })
        }
        res.status(500).send({
            Description:"Unknow error while trying to register a user"
        })
    }
}