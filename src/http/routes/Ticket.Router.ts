import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../middlewares";
import { POSTTicketController, GETTicketListFromUserController, DELETETicketController, GETTicketInfoController } from "../controllers";

export async function TicketRouter(app:FastifyInstance) {
    //POST - ticket/create
    app.route({
        url:"/create",
        handler:POSTTicketController,
        method:"POST",
        preHandler:[VerifyJWT]
    })

    //GET - ticket/list
    app.route({
        url:"/list",
        handler:GETTicketListFromUserController,
        method:"GET",
        preHandler:[VerifyJWT]
    })
    
    //GET - ticket/info/:Id
    app.route({
        url:"/info/:Id",
        handler:GETTicketInfoController,
        method:"GET",
        preHandler:[VerifyJWT]
    })

    //DELETE - tickets/cancel/:deletedTicket
    app.route({
        url:"/cancel/:deletedTicket",
        method:"DELETE",
        handler:DELETETicketController
    })
}