import { FastifyInstance } from "fastify";
import {POSTUserController,GETUserProfileController, DELETEUserController, PUTUserController} from "../controllers/index.ts"
import { PATCHLoginAsUser } from "../controllers/user/PATCH_LoginAsUser.ts";
import { VerifyJWT } from "../middlewares/index.ts";

export async function UserRouter(app:FastifyInstance) {
    //POST - /user/register
    app.route({
        method:"POST",
        url:"/register",
        handler:POSTUserController
    })

    //GET - /user/profile
    app.route({
        method:"GET",
        url:"/profile",
        handler:GETUserProfileController,
        preHandler:[VerifyJWT]
    })

    //DELETE - /user/delete
    app.route({
        method:"DELETE",
        url:"/delete",
        handler:DELETEUserController
    })

    //PATCH - /user/auth/login
    app.route({
        method:"PATCH",
        url:"/auth/login",
        handler:PATCHLoginAsUser
    })

    //PUT - /user/update
    app.route({
        method:"PUT",
        url:"/update",
        handler:PUTUserController,
        preHandler:[VerifyJWT]
    })


}