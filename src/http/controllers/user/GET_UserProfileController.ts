import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserProfileUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import z from "zod";
import { truncateSync } from "fs";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";


export async function GETUserProfileController(req:FastifyRequest,res:FastifyReply) {
    const service = new GetUserProfileUseCase(new PrismaUserRepository);

    //Carrega o token da requisição
    const Id = req.user.sub;

    try{
        const response = await service.execute({Id});

        res.status(200).send({
            Description:"Successfully returned user profile",
            response,
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any user with this ID"
            })
        }

        res.status(500).send({
            Description:"Unknow error while trying to get user profile"
        })
    }
}