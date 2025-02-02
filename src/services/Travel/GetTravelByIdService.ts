import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelToTravelInService } from "../../utils/format/FormatTravelToTravelInService";

export class GetTravelByIdUseCase {
    constructor(private TravelRepo: TravelRepository){}
    async execute(Id: string): Promise<TravelInService> {
        const travel = await this.TravelRepo.findById(Id)
        if(!travel){
            throw new EntityDoesNotExistsError("Travel")
        }
        return FormatTravelToTravelInService(travel)
    }
}