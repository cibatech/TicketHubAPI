import { Prisma, Travel } from "@prisma/client";
import { TravelRepository } from "../TravelRepository";
import { randomUUID } from "crypto";
import { string } from "zod";

export class InMemoryTravelRepository implements TravelRepository {
    private travels: Travel[] = []

    async create(data: Prisma.TravelUncheckedCreateInput): Promise<Travel> {
        const newTravel: Travel = {
            Id: randomUUID(),
            Travel_Day: data.Travel_Day?new Date(data.Travel_Day):new Date(),
            BeginningPointId: data.BeginningPointId,
            FinnishPointId: data.FinnishPointId,
            TravelBasePrice:data.TravelBasePrice
        }
        this.travels.push(newTravel)
        return newTravel
    }

    async findById(Id: string): Promise<Travel | null> {
        return this.travels.find(travel => travel.Id === Id) || null
    }

    async findByBeginningPointId(PointId: string): Promise<Travel[] | null> {
        return this.travels.filter(travel => travel.BeginningPointId === PointId)
    }

    async findByFinishingPointId(PointId: string): Promise<Travel[] | null> {
        return this.travels.filter(travel => travel.FinnishPointId === PointId)
    }

    async findByTravelDay(Day: Date): Promise<Travel[] | null> {
        return this.travels.filter(travel => travel.Travel_Day === Day)
    }

    async update(Id: string, data: Partial<Travel>): Promise<Travel | null> {
        const travel = this.travels.find(travel => travel.Id === Id)
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