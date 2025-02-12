import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../middlewares";
import { POSTTicketController, DELETETicketController, GETTicketInfoController, PATCHTicketListFromUserController } from "../controllers";

export async function TicketRouter(app:FastifyInstance) {
    //POST - ticket/create
    app.route({
        url:"/create",
        handler:POSTTicketController,
        method:"POST",
        preHandler:[VerifyJWT]
    })

    //PATCH - ticket/list
    app.route({
        url:"/list/:Page",
        handler:PATCHTicketListFromUserController,
        method:"PATCH",
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