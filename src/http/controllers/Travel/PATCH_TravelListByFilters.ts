import { FastifyReply, FastifyRequest } from "fastify";
import { GetTravelsByFilterUseCase } from "../../../services/Travel/GetTravelsByFilterService";
import { PrismaTravelRepository } from "../../../repository/Prisma/PrismaTravelRepository";
import { PrismaPointRepository } from "../../../repository/.index";
import z from "zod";
import { routeKind } from "@prisma/client";
import { EntityDoesNotExistsError } from "../../../Errors/EntityDoesNotExistsError";
import { Deserializer } from "v8";

export async function PATCHTravelListByFiltersController(req:FastifyRequest, res:FastifyReply) {
    
    const service = new GetTravelsByFilterUseCase(new PrismaTravelRepository, new PrismaPointRepository);

    const {FinishingPointId,afterDay,beforeDay,BeginningPointId,RouteKind} = z.object({
        RouteKind:z.enum(["Air","Naval","Land","Rail"]).optional(),
        afterDay:z.date().optional(),
        beforeDay:z.date().optional(),
        BeginningPointId:z.string().uuid().optional(),
        FinishingPointId:z.string().uuid().optional()
    }).parse(req.body)

    try{
        const response = await service.execute({
            RouteKind,afterDay,beforeDay,BeginningPointId,FinishingPointId
        })

        res.status(200).send({
            Description:"Lista de Viagens retornada e filtrada com sucesso",
            response,
            config:{
                RouteKind,afterDay,beforeDay,BeginningPointId,FinishingPointId
            }
        })
    }catch(err){
        if(err instanceof EntityDoesNotExistsError){
            res.status(404).send({
                Description:"Não foi possível encontrar nenhuma entidade",
                error:err.message
            })
        }else{
            res.status(500).send({
                Description:"Erro desconhecido"
            })
        }
    }
}