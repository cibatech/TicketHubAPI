import { FastifyReply, FastifyRequest } from "fastify";

import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { ValidateUserUseCase } from "../../../services/User/ValidateUserUseCase";
import z from "zod";

export async function PUTValidateUserController(req:FastifyRequest,res:FastifyReply) {
    const service = new ValidateUserUseCase(new PrismaUserRepository)
    
    const {refCode} = z.object({
        refCode:z.string()
    }).parse(req.body)


    try{
        const cookie = req.cookies.ValidCode;

        if(cookie){
            const response = await service.execute(cookie,refCode);

            res.status(201).send({
                Description:"Usuário validado com sucesso"
            })
        }else{
            res.status(500).send({
                Description:"Non existent or expired cookie. send email first"
            })
        }
    }catch(err){
        
    }
}