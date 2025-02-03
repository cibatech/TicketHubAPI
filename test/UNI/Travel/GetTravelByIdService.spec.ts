import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { GetTravelByIdUseCase } from "../../../src/services/Travel/GetTravelByIdService";

var Id: string
var Service: GetTravelByIdUseCase
var TravelRepo: InMemoryTravelRepository
describe("Get Travels by the Id Service: Good Case", async () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelByIdUseCase(TravelRepo)
        const travel = await TravelRepo.create({
            BeginningPointId: "",
            FinnishPointId: "",
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
        Id = travel.Id
    })

    it("Should be able to get Travels by the Id", async () => {
        const travel = await Service.execute(Id)
        expect(travel.Id).toBe(Id)
    })
})

describe("Get Travels by the Id Service: Bad Case", async () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelByIdUseCase(TravelRepo)
        await TravelRepo.create({
            BeginningPointId: "",
            FinnishPointId: "",
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
    })

    it("Should throw EntityDoesNotExistsError if the Id does not exists", async () => {
        await expect(Service.execute("")).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})
