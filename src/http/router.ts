import { FastifyInstance } from "fastify";
import { UserRouter } from "./routes/User.Router";
import { TicketRouter } from "./routes/Ticket.Router";
import { ClientsTicketRouter } from "./routes/ClientsTicket.Router";

export async function Router(app:FastifyInstance) {
    //Rotas de usuário
    app.register(UserRouter,{
        prefix:"/user"
    })

    //Rotas de Tickets
    app.register(TicketRouter,{
        prefix:"/ticket"
    })

    //Rotas de clientes (Pessoas dentro de uma passagem)
    app.register(ClientsTicketRouter,{
        prefix:"/client",
    })
}