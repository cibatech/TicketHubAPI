import { FastifyInstance } from "fastify";
import { UserRouter } from "./routes/User.Router";

export async function Router(app:FastifyInstance) {
    app.register(UserRouter,{
        prefix:"/user"
    })
}