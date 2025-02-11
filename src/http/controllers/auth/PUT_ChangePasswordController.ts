import { FastifyReply, FastifyRequest } from "fastify";

import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { ValidateUserUseCase } from "../../../services/User/ValidateUserUseCase";
import z from "zod";
import { RecoveryPasswordUseCase } from "../../../services/User/RecoverPasswordUseCase";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";

export async function PUTUpdatePasswordController(req:FastifyRequest,res:FastifyReply) {
    const service = new RecoveryPasswordUseCase(new PrismaUserRepository)
    
    const {refCode,newPassword} = z.object({
        refCode:z.string(),
        newPassword:z.string()
    }).parse(req.body)


    try{
        const cookie = req.cookies.ValidCode;
        console.log(cookie)
        if(cookie){
            const response = await service.execute(cookie,refCode,newPassword);

            res.status(201).send({
                Description:"Senha atualizada com sucesso"
            })
        }else{
            res.status(500).send({
                Description:"Non existent or expired cookie. send email first"
            })
        }
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Can't find any user with this ID",
                err
            })
        }
    }
}