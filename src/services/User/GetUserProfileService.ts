import { EntityDoesNotExistsError } from "../../Errors/.index"
import {UserRepository} from "../../repository/.index"
import {UserInService} from "../../types/.index"


interface GetUserProfileParams{
    Id:string
}

export class GetUserProfileUseCase{
    constructor(private userRepo:UserRepository){}
    async execute({Id}:GetUserProfileParams):Promise<{Email:string,Nome:string}>{
        const doesTheUserExists = await this.userRepo.findById(Id)
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        const {Email,Nome} = doesTheUserExists
        return{
            Email,Nome
        }
    }
}