import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../middlewares";
import { POSTClientsTicketController,GETClientsTicketController,PUTClientsTicketController, DELETEClientsTicketController } from "../controllers";

export async function ClientsTicketRouter(app:FastifyInstance) {
    //POST - client/create
    app.route({
        url:"/create",
        handler:POSTClientsTicketController,
        method:"POST",
        preHandler:[VerifyJWT]
    })

    //GET - client/ticket/:TicketId
    app.route({
        url:"/ticket/:TicketId",
        handler:GETClientsTicketController,
        method:"GET",
    })

    //PUT - client/update/:Id
    app.route({
        url:"/update/:Id",
        handler:PUTClientsTicketController,
        method:"PUT",
        preHandler:[VerifyJWT]
    })

    //DELETE - client/delete/:Id
    app.route({
        url:"/delete/:Id",
        handler:DELETEClientsTicketController,
        method:"DELETE",
        preHandler:[VerifyJWT]
    })
}