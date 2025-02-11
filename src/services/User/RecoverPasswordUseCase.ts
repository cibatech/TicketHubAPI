import { boolean } from "zod";
import { EntityDoesNotExistsError } from "../../Errors/.index";
import { PrismaUserRepository } from "../../repository/Prisma/PrismaUserRepository";
import { UserRepository } from "../../repository/UserRepository";
import { splitStringAtDash } from "../../utils/SeparateCookieString";
import { hash } from "bcryptjs";

export class RecoveryPasswordUseCase{
    constructor(private UserRepo:UserRepository){}

    /**
     * 
     * @param refString - string retirada do cookie
     * @param RefCode - Ref Code entregue pelo usuário
     */
    async execute(refString:string,RefCode:string,newPassword:string){

        const [UserEmail,ValCode] = splitStringAtDash(refString);
        console.log(UserEmail)
        const doesTheUserExists = await this.UserRepo.findByEmail(UserEmail);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User");
        }

    

        if(RefCode == ValCode){
            const updateUser = this.UserRepo.update(doesTheUserExists.Id,{
                Password:await hash(newPassword,9)
            })
        }
    }
}