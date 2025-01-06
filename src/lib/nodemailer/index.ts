import {createTransport} from "nodemailer"
import { EmailType } from "../../types/.index";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../env";

//configuração de conexao com o nodemailer
export const config = {
    host:"smtp.gmail.com",
    port:587, // nescessario utilizar portas especificas para o google
    user:ADMIN_EMAIL, //Gmail needs to accept conections of low secutiry
    pass:ADMIN_PASSWORD
}

// setup nodemailer instance
const transport = createTransport({
    host:config.host,
    port:config.port,
    secure:false, //define que nao havera segurança
    auth:{ //usuário que enviará os emails
        user:config.user, //Puxa de config o email que utilizamos
        pass:config.pass //Puxa de config a senha que utilizamos
    }, 
    tls:{
        rejectUnauthorized:false //define que nao será recusado em redes nao autorizadas
    }
});

/**
 * Envia um e-mail utilizando as configurações do transporte de e-mail.
 *
 * @param email - Objeto contendo as informações do e-mail a ser enviado.
 * @param email.subject - O assunto do e-mail.
 * @param email.text - O conteúdo do e-mail no formato de texto simples.
 * @param email.to - O endereço de e-mail do destinatário.
 * 
 * @returns Uma promessa que resolve para o resultado do envio do e-mail.
 *          O resultado contém informações sobre o e-mail enviado, como identificador e status.
 *
 * @throws Pode lançar erros relacionados ao envio de e-mails, incluindo problemas de configuração
 *         do transporte ou dados inválidos.
 *
 * @example
 * ```typescript
 * const email: EmailType = {
 *   subject: "Bem-vindo ao nosso serviço!",
 *   text: "Estamos felizes em ter você conosco.",
 *   to: "usuario@exemplo.com",
 * };
 *
 * SendEmail(email)
 *   .then(response => console.log("E-mail enviado com sucesso:", response))
 *   .catch(error => console.error("Erro ao enviar o e-mail:", error));
 * ```
 */
export async function SendEmail(email:EmailType) {
    const {subject,text,to} = email
    const emailSent = await transport.sendMail({
        text,
        subject,
        to,
        from:config.user
    })
    return emailSent
}