import { FastifyInstance } from "fastify";
import { UserRouter } from "./routes/User.Router";
import { onResponse } from "./hooks/onResponse";

export async function Router(app:FastifyInstance) {

    //Hook essencial para o funcionamento da aplicação (nao retire, caso contrario o código irá inevitavelmente quebrar)
    app.addHook("onResponse",onResponse)
    

    //Rotas de usuário
    app.register(UserRouter,{
        prefix:"/user"
    })
}