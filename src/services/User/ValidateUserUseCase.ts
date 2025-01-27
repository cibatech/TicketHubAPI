import { boolean } from "zod";
import { EntityDoesNotExistsError } from "../../Errors/.index";
import { PrismaUserRepository } from "../../repository/Prisma/PrismaUserRepository";
import { UserRepository } from "../../repository/UserRepository";
import { splitStringAtDash } from "../../utils/SeparateCookieString";

export class ValidateUserUseCase{
    constructor(private UserRepo:UserRepository){}

    /**
     * 
     * @param refString - string retirada do cookie
     * @param RefCode - Ref Code entregue pelo usuário
     */
    async execute(refString:string,RefCode:string){

        const [UserId,ValCode] = splitStringAtDash(refString);

        const doesTheUserExists = await this.UserRepo.delete(UserId);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User");
        }


        if(RefCode == ValCode){
            const updateUser = this.UserRepo.update(UserId,{
                Verified:true
            })
        }
    }
}