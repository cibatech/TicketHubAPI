import { routeKind } from "@prisma/client";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
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
    }: FilterTravelParams): Promise<TravelInService[]>{
        if(BeginningPointId){
            const doesBeginningPointExists = await this.PointRepo.findById(BeginningPointId)
            if(!doesBeginningPointExists) throw new EntityDoesNotExistsError("BeginningPoint")
        }
        if(FinishingPointId){
            const doesFinishingPointExists = await this.PointRepo.findById(FinishingPointId)
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
        })
        return FormatTravelsToTravelInServices(travels)
    }
}