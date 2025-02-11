import { FastifyReply, FastifyRequest } from "fastify";
import { GetPointsByNameUseCase } from "../../../services/Points/GetPointsByNameService";
import { PrismaPointRepository } from "../../../repository/.index";
import z from "zod";

export async function GETPointsListController(req:FastifyRequest, res:FastifyReply) {
    const service = new GetPointsByNameUseCase(new PrismaPointRepository);
    const {Query,Page} = z.object({
        Query:z.string().optional(),
        Page:z.string().default("1")
    }).parse(req.params);

    try{
        const page = Number(Page);
        const response = await service.execute(Query?Query:"");

        res.status(200).send({
            Description:"Lista retornada com sucesso",
            response
        })
    }catch(err){
        res.status(500).send({
            Description:"Route has no kwon errors "
        })
    }
}