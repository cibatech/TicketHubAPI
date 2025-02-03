import { Prisma, Travel } from "@prisma/client";
import { TravelRepository } from "../TravelRepository";
import { randomUUID } from "crypto";
import { string } from "zod";
import { tr } from "@faker-js/faker";

export class InMemoryTravelRepository implements TravelRepository {
    private travels: Travel[] = []

    async create(data: Prisma.TravelUncheckedCreateInput): Promise<Travel> {
        const newTravel: Travel = {
            Id: randomUUID(),
            Travel_Day: data.Travel_Day?new Date(data.Travel_Day):new Date(),
            TravelBasePrice: data.TravelBasePrice,
            BeginningPointId: data.BeginningPointId,
            FinnishPointId: data.FinnishPointId,
            Transport: data.Transport
        }
        this.travels.push(newTravel)
        return newTravel
    }

    async findById(Id: string): Promise<Travel | null> {
        const travel = this.travels.find(travel => travel.Id === Id)
        return travel ?? null
    }

    async findByBeginningPointId(PointId: string, Page: number): Promise<Travel[] | null> {
        const travelList = this.travels.filter(travel => travel.BeginningPointId === PointId)
                            .slice((Page-1)*20, Page*20);
        if(!travelList.length) return null
        return travelList
    }

    async findByFinishingPointId(PointId: string, Page: number): Promise<Travel[] | null> {
        const travelList = this.travels.filter(travel => travel.FinnishPointId === PointId)
                            .slice((Page-1)*20, Page*20);
        if(!travelList.length) return null
        return travelList
    }

    async findByRangePrice(min: number, max: number, Page: number): Promise<Travel[] | null> {
        const travelList = this.travels.filter(travel => travel.TravelBasePrice >= min && travel.TravelBasePrice <= max)
                            .slice((Page-1)*20, Page*20);
        if(!travelList.length) return null
        return travelList
    }

    async findByRangeDate(afterDay: Date, beforeDay: Date, Page: number): Promise<Travel[] | null> {
        const travelList = this.travels.filter(travel => travel.Travel_Day >= afterDay && travel.Travel_Day <= beforeDay)
                            .slice((Page-1)*20, Page*20)
        if(!travelList.length) return null
        return travelList
    }

    async findByFilter(where: Prisma.TravelWhereInput): Promise<Travel[]> {
        return []
    }

    async update(Id: string, data: Partial<Travel>): Promise<Travel | null> {
        const travel = this.travels.find(travel => travel.Id === Id) ?? null
        if(!travel) return null

        const updatedTravel = {
            ...travel,
            ...data,
        }

        this.travels = this.travels.map(travel => (travel.Id == Id ? updatedTravel : travel))
        return updatedTravel
    }

    async delete(Id: string): Promise<Travel | null> {
        const index = this.travels.findIndex(travel => travel.Id === Id)
        if(index === -1) return null

        const [deletedTravel] = this.travels.splice(index, 1)
        return deletedTravel
    }
}