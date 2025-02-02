import { EntityDoesNotExistsError } from "../../Errors/EntityDoesNotExistsError";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelToTravelInService } from "../../utils/format/FormatTravelToTravelInService";

export class DeleteTravelUseCase {
    constructor(private TravelRepo: TravelRepository){}
    async execute(Id: string): Promise<TravelInService>{
        const deletedTravel = await this.TravelRepo.delete(Id)
        if(!deletedTravel){
            throw new EntityDoesNotExistsError("Travel")
        }
        return FormatTravelToTravelInService(deletedTravel)
    }
}