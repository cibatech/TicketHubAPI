import { Travel } from "@prisma/client";
import { TravelInService } from "../../types/dtos/InServiceTravel";

export function FormatTravelToTravelInService(data: Travel): TravelInService {
    return {
        BeginningPointId: data.BeginningPointId,
        FinishingPointId: data.FinnishPointId,
        TravelBasePrice: data.TravelBasePrice,
        TravelDay: data.Travel_Day,
        Transport: data.Transport,
        Id: data.Id,
    }
}

export function FormatTravelsToTravelInServices(travels: Travel[]): TravelInService[] {
    return travels.map((travel) => {
        return {
            BeginningPointId: travel.BeginningPointId,
            FinishingPointId: travel.FinnishPointId,
            TravelBasePrice: travel.TravelBasePrice,
            TravelDay: travel.Travel_Day,
            Transport: travel.Transport,
            Id: travel.Id,
        }
    })
}