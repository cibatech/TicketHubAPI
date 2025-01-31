import { Prisma } from "@prisma/client";
import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { PointRepository } from "../../repository/PointRepository";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelToTravelInService } from "../../utils/FormatTravelToTravelInService";

export class CreateTravelUseCase {
    constructor(private TravelRepo: TravelRepository, private PointRepo: PointRepository){}
    async execute(data: Prisma.TravelUncheckedCreateInput): Promise<TravelInService>{
        const doesBeginningPointExists = this.PointRepo.findById(data.BeginningPointId)
        if(!doesBeginningPointExists || data.BeginningPointId === "") throw new EntityDoesNotExistsError("Beginning point")

        const doesFinishingPointExists = this.PointRepo.findById(data.FinnishPointId)
        if(!doesFinishingPointExists || data.FinnishPointId === "") throw new EntityDoesNotExistsError("Finishing point")

        const travel = await this.TravelRepo.create(data)

        return FormatTravelToTravelInService(travel)
    }
}