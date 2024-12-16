import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../../repository";
import { EntityAlreadyExists } from "../../Errors";
import { UserInService } from "../../types/dtos/InServiceEntitys";
import { hash } from "bcryptjs";


export class CreateUserUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(data:Prisma.UserCreateInput):Promise<UserInService>{
        const doesTheUserAlreadyExists = await this.UserRepo.findByEmail(data.Email);
        if(doesTheUserAlreadyExists){
            throw new EntityAlreadyExists("User","There's already a user with this email adress")
        }

        const Password = await hash(data.Password,9);

        const registerUser = await this.UserRepo.create({
            Email:data.Email,Nome:data.Nome,Password
        });

        return {
            Email:registerUser.Email,
            Nome:registerUser.Nome,
            Password:registerUser.Nome
        }
    }
}