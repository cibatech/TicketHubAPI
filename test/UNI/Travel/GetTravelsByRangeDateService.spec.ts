import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { GetTravelsByRangeDateUseCase } from "../../../src/services/Travel/GetTravelsByDateRangeService";
import { EntityNotFoundError } from "../../../src/Errors/EntityNotFoundError";

var Service: GetTravelsByRangeDateUseCase
var TravelRepo: InMemoryTravelRepository
describe("Get Travel by a Range Date Test: Good Case", () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByRangeDateUseCase(TravelRepo)
        await TravelRepo.create({
            BeginningPointId:"",
            FinnishPointId:"a",
            TravelBasePrice:1,
            Travel_Day: new Date("2025-01-27")
        })
    })

    it("Should be able to get Travels within a range date", async () => {
        const travels = await Service.execute({
            page: 1,
            afterDay: new Date("2025-01-25"),
            beforeDay: new Date("2025-01-30"),
        })
        expect(travels[0].FinishingPointId).toBe("a")
    })
})

describe("Get Travel by a Range Date Test: Bad Case", () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByRangeDateUseCase(TravelRepo)
    })

    it("Should throw EntityNotFoundError if there isn't Travels within a range date", async () => {
        await expect(Service.execute({
            page: 1,
            afterDay: new Date("2025-01-25"),
            beforeDay: new Date("2025-01-30"),
        })).rejects.toBeInstanceOf(EntityNotFoundError)
    })
})
