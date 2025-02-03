import { Prisma, Travel } from "@prisma/client";

export interface TravelRepository {
    create(data: Prisma.TravelUncheckedCreateInput): Promise<Travel>
    findById(Id: string): Promise<Travel | null>
    findByBeginningPointId(PointId: string, Page: Number): Promise<Travel[] | null>
    findByFinishingPointId(PointId: string, Page: Number): Promise<Travel[] | null>
    findByRangePrice(min: Number, max: Number, page: Number): Promise<Travel[] | null>
    findByRangeDate(afterDay: Date, beforeDay: Date, Page: Number): Promise<Travel[] | null>
    findByFilter(where: Prisma.TravelWhereInput): Promise<Travel[]>
    update(Id: string, data: Partial<Travel>): Promise<Travel | null>
    delete(Id: string): Promise<Travel | null>
}