import { EntityDoesNotExistsErro } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/.index";
import { UserInService } from "../../types/.index";

export class DeleteUserUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(UserId:string):Promise<UserInService>{
        const doesTheUserExists = await this.UserRepo.delete(UserId);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsErro("User")
        }

        const deletedOne = await this.UserRepo.delete(UserId);

        return {
            Email:doesTheUserExists.Email,
            Nome:doesTheUserExists.Nome,
            Password:doesTheUserExists.Password
        }
    }
}
