import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../middlewares";
import { POSTTicketController, GETTicketListFromUserController, DELETETicketController, GETTicketInfoController } from "../controllers";
import { GETPointsListController } from "../controllers/points/GET_PointsListController";

export async function PointsRouter(app:FastifyInstance) {
    //POST - point/:Query/:Page
    app.route({
        url:"/:Query/:Page",
        handler:GETPointsListController,
        method:"GET",
    })
}