import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../middlewares";
import { PATCHTravelListByFiltersController, POSTTicketController } from "../controllers";

export async function TravelRouter(app:FastifyInstance) {
    //PATCH - travel/filter
    app.route({
        url:"/filter",
        handler:PATCHTravelListByFiltersController,
        method:"PATCH"
    })
}