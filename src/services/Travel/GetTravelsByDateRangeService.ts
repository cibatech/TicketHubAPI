import { EntityNotFoundError } from "../../Errors/EntityNotFoundError";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelsToTravelInServices } from "../../utils/format/FormatTravelToTravelInService";

interface GetTravelsByRangeDateParams {
    afterDay: Date,
    beforeDay: Date,
    page: number
}

export class GetTravelsByRangeDateUseCase {
    constructor(private TravelRepo: TravelRepository){}
    async execute({
        afterDay,
        beforeDay,
        page,
    }: GetTravelsByRangeDateParams): Promise<TravelInService[]>{
        const travels = await this.TravelRepo.findByRangeDate(afterDay, beforeDay, page)
        if(!travels){
            throw new EntityNotFoundError("Travels")
        }
        return FormatTravelsToTravelInServices(travels)
    }
}