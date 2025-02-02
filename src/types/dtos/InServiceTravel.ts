import { routeKind } from "@prisma/client";

export interface TravelInService {
    BeginningPointId: string,
    FinishingPointId: string,
    TravelBasePrice: number,
    TravelDay: Date,
    Transport: routeKind
    Id: string,
}