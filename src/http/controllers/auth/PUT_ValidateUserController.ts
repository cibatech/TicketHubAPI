import { FastifyReply, FastifyRequest } from "fastify";

import { PrismaUserRepository } from "../../../repository/Prisma/PrismaUserRepository";
import { ValidateUserUseCase } from "../../../services/User/ValidateUserUseCase";

export async function PUTValidateUserController(req:FastifyRequest,res:FastifyReply) {
    const service = new ValidateUserUseCase(new PrismaUserRepository)
    
}