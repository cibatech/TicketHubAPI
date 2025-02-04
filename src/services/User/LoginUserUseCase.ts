import { compare } from "bcryptjs";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { UserRepository } from "../../repository/.index";
import { ValidationError } from "../../Errors/ValidationError";

export class LoginUserUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(Email:string, Password:string):Promise<string>{
        const doesTheUserExists = await this.UserRepo.findByEmail(Email);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }

        if(await compare(Password,doesTheUserExists.Password)){
            return doesTheUserExists.Id
        }else{
            throw new ValidationError("Wrong Password");
        }
    }
}