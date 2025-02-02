import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../../repository/.index";
import { EntityAlreadyExists } from "../../Errors/.index";
import { UserInService } from "../../types/dtos/InServiceUser";
import { hash } from "bcryptjs";


export class CreateUserUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(data:Prisma.UserCreateInput):Promise<UserInService>{
        const doesTheUserAlreadyExists = await this.UserRepo.findByEmail(data.Email);
        if(doesTheUserAlreadyExists){
            throw new EntityAlreadyExists("User")
        }

        const Password = await hash(data.Password,9);

        const registerUser = await this.UserRepo.create({
            Email:data.Email,Nome:data.Nome,Password,CPF:data.CPF
        });
        
        console.log("Cheguei aqui");


        return {
            Email:registerUser.Email,
            Nome:registerUser.Nome,
            Password:registerUser.Nome
        }
    }
}