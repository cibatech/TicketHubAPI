import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { InMemoryPointRepository } from "../../../src/repository/.index";
import { DeleteTravelUseCase } from "../../../src/services/Travel/DeleteTravelService";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var Id: string
var Service: DeleteTravelUseCase
var PointRepo: InMemoryPointRepository
var TravelRepo: InMemoryTravelRepository
describe("Delete Travel Service Test: Good Case", async () => {
    beforeEach(async () => {
        PointRepo = new InMemoryPointRepository()
        TravelRepo = new InMemoryTravelRepository()
        Service = new DeleteTravelUseCase(TravelRepo)
        const point = await PointRepo.create({
            Name:"San Francisco",
            route_id:"2",
            UF:"CE",
        })
        const travel = await TravelRepo.create({
            BeginningPointId: point.Id,
            FinnishPointId: point.Id,
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
        Id = travel.Id
    })

    it("Should be able to delete a travel by the Id", async () => {
        const deletedTravel = await Service.execute(Id)
        expect(deletedTravel.Id).toBe(Id)
    })
})

describe("Delete Travel Service Test: Bad Case", async () => {
    beforeEach(async () => {
        PointRepo = new InMemoryPointRepository()
        TravelRepo = new InMemoryTravelRepository()
        Service = new DeleteTravelUseCase(TravelRepo)
    })

    it("Should throw EntityDoesNotExistsError if the Id does not exists", async () => {
        await expect(Service.execute(Id)).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})