import { Prisma, Travel } from "@prisma/client";

export interface TravelRepository {
    create(data: Prisma.TravelUncheckedCreateInput): Promise<Travel>
    findById(Id: string): Promise<Travel | null>
    findByBeginningPointId(PointId: string): Promise<Travel[] | null>
    findByFinishingPointId(PointId: string): Promise<Travel[] | null>
    findByTravelDay(Day: Date): Promise<Travel[] | null>
    update(Id: string, data: Partial<Travel>): Promise<Travel | null>
    delete(Id: string): Promise<Travel | null>
}