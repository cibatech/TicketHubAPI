import { FastifyReply, FastifyRequest } from "fastify";
import { SendEmailValidationCodeUseCase } from "../../../services";
import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { z } from "zod";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { SendEmailRecoveryCodeUseCase } from "../../../services/Mail/SendEmailRecoveryPassword";
import { log } from "console";

export async function GETPasswordEmailController(req:FastifyRequest, res:FastifyReply) {
    
    const service = new SendEmailRecoveryCodeUseCase(new PrismaUserRepository);

    const {Email} = z.object({
        Email:z.string().email()
    }).parse(req.params)

    try{
        const response = await service.execute(Email);

        res.setCookie("ValidCode",`${Email}-${response}`,{
            maxAge:1000*60*60*24, //24 horas de vida,
            httpOnly:false,sameSite: "lax",
            secure:false
        })

        res.status(200).send({
            Description:"Email Sent, including recovery code",
            response,
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any user with this Email",
                err
            })
        }else{
            res.status(500).send({
                Description:"Erro desconhecido",
                err
            })
        }
    }

}