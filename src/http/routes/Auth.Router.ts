import { FastifyInstance } from "fastify";
import { GETPasswordEmailController } from "../controllers/auth/GET_PasswordEmailController";

export async function AuthenticationRouter(app:FastifyInstance) {
    //GET - auth/password
    app.route({
        url:"/password/:Email",
        handler:GETPasswordEmailController,
        method:"GET"
    })
}