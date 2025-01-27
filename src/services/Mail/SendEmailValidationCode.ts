import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { SendEmail } from "../../lib/nodemailer";
import { UserRepository } from "../../repository/UserRepository";
import { EmailType } from "../../types/.index";
import { GenValidationCode } from "../../utils/genValidCode";

export class SendEmailValidationCode{
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
            text:`  Assunto: Verificação de Email

                    Olá ${doesTheUserExists.Nome},

                    Este email foi utilizado para fazer login em nossa aplicção. Se você não fez essa solicitação, por favor, ignore este e-mail.

                    Para validar o seu email, utilize o código abaixo:
                                    
                                        ${code} 

                    Atenciosamente,
                    CibaTech
                    entre em contato conosco em: ciringamen@gmail.com`
        }
        //Envia o Email e retorna o código que deve ser guardado em cookie 

        await SendEmail(_email)

        return code
    }
}