import { hash } from "bcryptjs";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/.index";
import { UserInService } from "../../types/dtos/InServiceUser";
import { EntityAlreadyExists } from "../../Errors/EntityAlreadyExistsError";

export class UpdateUserServiceUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(UserId:string, data:Partial<UserInService>):Promise<UserInService>{
        const doesTheUserExists = await this.UserRepo.findById(UserId)
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        if(data.Email){
            const theresAlreadyAnEmailAdressWithTheProvidedEmail = await this.UserRepo.findByEmail(data.Email);
            if(theresAlreadyAnEmailAdressWithTheProvidedEmail){
                throw new EntityAlreadyExists("User");
            }
        }

        const updateUser = await this.UserRepo.update(UserId,
            {Email:data.Email?data.Email:doesTheUserExists.Email,
             Nome:data.Nome?data.Nome:doesTheUserExists.Nome,
             Password:data.Password?await hash(data.Password,9):doesTheUserExists.Password   
            }
        );

        if(updateUser){
            return {
                Email:updateUser.Email,
                Nome:updateUser.Nome,
                Password:updateUser.Password
            }
        }else{
            return {
                Email:doesTheUserExists.Email,
                Nome:doesTheUserExists.Nome,
                Password:doesTheUserExists.Password
            }
        }
    }
}