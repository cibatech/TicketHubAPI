import { EntityNotFoundError } from "../../Errors/EntityNotFoundError";
import { TravelRepository } from "../../repository/TravelRepository";
import { TravelInService } from "../../types/dtos/InServiceTravel";
import { FormatTravelsToTravelInServices } from "../../utils/FormatTravelToTravelInService";

interface GetTravelsByRangePriceParams {
    min: number,
    max: number,
    page: number
}

export class GetTravelsByRangePriceUseCase {
    constructor(private TravelRepo: TravelRepository){}
    async execute({
        min,
        max,
        page,
    }: GetTravelsByRangePriceParams): Promise<TravelInService[]>{
        const travels = await this.TravelRepo.findByRangePrice(min, max, page)
        if(!travels){
            throw new EntityNotFoundError("Travels")
        }
        return FormatTravelsToTravelInServices(travels)
    }
}