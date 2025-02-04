import { Point, routeKind } from "@prisma/client";
import { TravelRepository } from "../../repository/TravelRepository";
import { PointRepository } from "../../repository/PointRepository";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { FormatTravelsToTravelInServices } from "../../utils/format/FormatTravelToTravelInService";

interface FilterTravelParams {
    BeginningPointId?: string,
    FinishingPointId?: string,
    RouteKind?: routeKind,
    afterDay?: Date,
    beforeDay?: Date,
    minPrice?: number,
    maxPrice?: number,
}
interface TravelFilterResponse{
    BeginningPoint: Point,
    FinishingPoint: Point,
    TravelBasePrice: number,
    TravelDay: Date,
    Transport: routeKind
    Id: string,
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
    }: FilterTravelParams, Page: number) {
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

        return travels.map((travel) => {
            return {
                TravelBasePrice: travel.TravelBasePrice,
                TravelDay: travel.Travel_Day,
                Transport: travel.Transport,
                BeginningPoint: doesBeginningPointExists,
                FinishingPoint: doesFinishingPointExists,
            }
        })
    }
}