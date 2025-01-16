import { FastifyInstance } from "fastify";
import {POSTUserController,GETUserProfileController, DELETEUserController} from "../controllers/.index.ts"

export async function UserRouter(app:FastifyInstance) {
    //POST - /user/register
    app.route({
        method:"POST",
        url:"/register",
        handler:POSTUserController
    })

    //GET - /user/profile
    app.route({
        method:"POST",
        url:"/profile",
        handler:GETUserProfileController
    })

    //DELETE - /user/delete
    app.route({
        method:"DELETE",
        url:"/delete",
        handler:DELETEUserController
    })
}