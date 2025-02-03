import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPointRepository } from "../../../src/repository/.index";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { GetTravelsByRangePriceUseCase } from "../../../src/services/Travel/GetTravelsByRangePriceService";
import { EntityNotFoundError } from "../../../src/Errors/EntityNotFoundError";

var Id: String
var Service: GetTravelsByRangePriceUseCase
var TravelRepo: InMemoryTravelRepository
describe("Get Travels By Range Price Test: Good Case", () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByRangePriceUseCase(TravelRepo)
        const travel = await TravelRepo.create({
            BeginningPointId: "",
            FinnishPointId: "",
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
        Id = travel.Id
    })

    it("Should be able to get Travels by a range price", async () => {
        const travels = await Service.execute({max: 8, min: 4, page: 1})
        expect(travels[0].Id).toBe(Id)
    })
})

describe("Get Travels By Range Price Test: Bad Case", () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByRangePriceUseCase(TravelRepo)
        await TravelRepo.create({
            BeginningPointId: "",
            FinnishPointId: "",
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
    })

    it("Should throw EntityNotFoundError if there isn't travel within the price range", async () => {
        await expect(Service.execute({min: 1, max: 2, page: 1})).rejects.toBeInstanceOf(EntityNotFoundError)
    })
})