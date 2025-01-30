import { FastifyReply, FastifyRequest } from "fastify";
import { SendEmailValidationCodeUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { z } from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";

export async function GETValidateEmailController(req:FastifyRequest, res:FastifyReply) {
    
    const service = new SendEmailValidationCodeUseCase(new PrismaUserRepository);

    const Id = req.user.sub;

    try{
        const response = await service.execute(Id);

        res.setCookie("ValidCode",`${Id}-${response}`,{
            maxAge:1000*60*60*24 //24 horas de vida
        })

        res.status(200).send({
            Description:"Email Sent"
        })
    }catch(err){
            if(err instanceof EntityDoesNotExistsError){
                res.status(404).send({
                    Description:"Can't find any user with this ID",
                    err
                })
            }
    }

}