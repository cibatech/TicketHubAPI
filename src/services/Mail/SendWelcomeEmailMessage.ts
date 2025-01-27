import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { SendEmail } from "../../lib/nodemailer";
import { UserRepository } from "../../repository/UserRepository";
import { EmailType } from "../../types/.index";
import { GenValidationCode } from "../../utils/genValidCode";

export class SendWelcomeEmailMessage{
    constructor(private UserRepo:UserRepository){}
    async execute(Email:string):Promise<boolean>{
        const doesTheUserExists = await this.UserRepo.findByEmail(Email);
        if(!doesTheUserExists){
            throw new EntityDoesNotExistsError("User")
        }
        const _email:EmailType = {
            to:Email,
            subject:"No-Reply Email de Validação de usuário",
            text:`  Assunto: Boas vindas ao TicketHub

                    Olá ${doesTheUserExists.Nome},

                    Seja bem vindo a nossa aplicação.

                 

                    Atenciosamente,
                    CibaTech
                    entre em contato conosco em: ciringamen@gmail.com`
        }
        //Envia o Email e retorna o código que deve ser guardado em cookie 

        const result = await SendEmail(_email)

        return result?true:false
    }
}