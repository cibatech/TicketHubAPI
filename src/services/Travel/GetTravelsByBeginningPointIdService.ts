import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { EntityNotFoundError } from "../../Errors/EntityNotFoundError";
import { PointRepository } from "../../repository/PointRepository";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelsToTravelInServices } from "../../utils/FormatTravelToTravelInService";

export class GetTravelsByBeginningPointIdUseCase {
    constructor(private TravelRepo: TravelRepository, private PointRepo: PointRepository){}
    async execute(PointId: string, Page: Number): Promise<TravelInService[]>{

        const doesPointExists = await this.PointRepo.findById(PointId)
        if(!doesPointExists){
            throw new EntityDoesNotExistsError("Point")
        }

        const travels = await this.TravelRepo.findByBeginningPointId(PointId, Page)
        if(!travels) throw new EntityNotFoundError("Travel")

        return FormatTravelsToTravelInServices(travels)
    }
}