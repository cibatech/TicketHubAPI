import { log } from "console";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { SendEmail } from "../../lib/nodemailer";
import { UserRepository } from "../../repository/UserRepository";
import { EmailType } from "../../types/.index";
import { GenValidationCode } from "../../utils/genValidCode";
import { ADMIN_EMAIL } from "../../lib/env";

export class SendEmailRecoveryCodeUseCase{
    constructor(private UserRepo:UserRepository){}
    async execute(Email:string):Promise<string>{
        const doesTheUserExists = await this.UserRepo.findByEmail(Email);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        const code = GenValidationCode()
        const _email:EmailType = {
            to:Email,
            subject:"No-Reply Email de Validação de usuário",
            text:`  Assunto: Recuperação de senha

                    Olá ${doesTheUserExists.Nome},

                    Olá, você deseja recuperar a sua senha?

                    Para recuperar o seu email, utilize o código abaixo:
                                    
                                        ${code} 

                    Atenciosamente,
                    CibaTech
                    entre em contato conosco em: ${ADMIN_EMAIL}`
        }
        //Envia o Email e retorna o código que deve ser guardado em cookie 

        log("Chegou aqui")
        const a = await SendEmail(_email)
        log(a)
        return code
    }
}