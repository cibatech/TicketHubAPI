import { Point, routeKind } from "@prisma/client";
import { TravelRepository } from "../../repository/TravelRepository";
import { PointRepository } from "../../repository/PointRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { FormatTravelsToTravelInServices } from "../../utils/format/FormatTravelToTravelInService";
import { faker } from "@faker-js/faker";

interface FilterTravelParams {
    BeginningPointId?: string,
    FinishingPointId?: string,
    RouteKind?: routeKind,
    afterDay?: Date,
    beforeDay?: Date,
    minPrice?: number,
    maxPrice?: number,
}
export class GetTravelsByFilterUseCase {
    constructor(private TravelRepo: TravelRepository, private PointRepo: PointRepository){}
    async execute({
        maxPrice,
        minPrice,
        afterDay,
        beforeDay,
        RouteKind,
        BeginningPointId,
        FinishingPointId,
    }: FilterTravelParams, Page: number){
        if(BeginningPointId){
            var doesBeginningPointExists = await this.PointRepo.findById(BeginningPointId)
            if(!doesBeginningPointExists) throw new EntityDoesNotExistsError("BeginningPoint")
        }
        if(FinishingPointId){
            var doesFinishingPointExists = await this.PointRepo.findById(FinishingPointId)
            if(!doesFinishingPointExists) throw new EntityDoesNotExistsError("FinishingPoint")
        }

        const travels = await this.TravelRepo.findByFilter({
            TravelBasePrice:{
                gte: minPrice,
                lte: maxPrice,
            },
            Travel_Day:{
                gte:afterDay,
                lte:beforeDay
            },
            Transport:RouteKind,
            BeginningPointId,
            FinnishPointId: FinishingPointId,
        }, Page)

        
        const response = await Promise.all(
            travels.map(async (travel) => {
                const bPoint = await this.PointRepo.findById(travel.BeginningPointId)
                const pPoint = await this.PointRepo.findById(travel.FinnishPointId)

                return {
                    CompanyName:faker.company.name(),
                    TravelBasePrice: travel.TravelBasePrice,
                    TravelDay: travel.Travel_Day,
                    Transport: travel.Transport,
                    BeginningPoint: bPoint,
                    FinishingPoint: pPoint,
                    Id:travel.Id,
                }
            })
        )

        
        return {
            response, 
            totalTravels:response.length,
            totalPages:Math.floor(response.length/5)
        }
    }
}