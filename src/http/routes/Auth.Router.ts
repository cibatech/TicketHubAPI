import { FastifyInstance } from "fastify";
import { GETPasswordEmailController } from "../controllers/auth/GET_PasswordEmailController";
import { PUTUpdatePasswordController } from "../controllers/auth/PUT_ChangePasswordController";

export async function AuthenticationRouter(app:FastifyInstance) {
    //GET - auth/password
    app.route({
        url:"/password/:Email",
        handler:GETPasswordEmailController,
        method:"GET"
    })
    //PUT - auth/password
    app.route({
        url:"/password",
        handler:PUTUpdatePasswordController,
        method:"PUT"
    })
}