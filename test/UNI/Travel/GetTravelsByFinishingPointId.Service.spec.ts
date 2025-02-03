import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPointRepository } from "../../../src/repository/.index";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { GetTravelsByBeginningPointIdUseCase } from "../../../src/services/Travel/GetTravelsByBeginningPointIdService";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { EntityNotFoundError } from "../../../src/Errors/EntityNotFoundError";
import { GetTravelsByFinishingPointIdUseCase } from "../../../src/services/Travel/GetTravelsByFinishingPointIdService";

var PointId: string
var Service: GetTravelsByFinishingPointIdUseCase
var PointRepo: InMemoryPointRepository
var TravelRepo: InMemoryTravelRepository
describe("Get Travels by the Beginning Point Id Service: Good Case", async () => {
    beforeEach(async () => {
        PointRepo = new InMemoryPointRepository()
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByFinishingPointIdUseCase(TravelRepo, PointRepo)
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:"2",
            UF:"CE",
        })
        await TravelRepo.create({
            BeginningPointId: Id,
            FinnishPointId: Id,
            Travel_Day: new Date(),
            TravelBasePrice: 6,
            Transport:"Air",
        })
        PointId = Id
    })

    it("Should be able to get Travels by the Beginning Point Id", async () => {
        const travels = await Service.execute(PointId, 1)
        expect(travels[0].FinishingPointId).toBe(PointId)
    })
})

describe("Get Travels by the Finishing Point Id Service: Bad Case", async () => {
    beforeEach(async () => {
        PointRepo = new InMemoryPointRepository()
        TravelRepo = new InMemoryTravelRepository()
        Service = new GetTravelsByFinishingPointIdUseCase(TravelRepo, PointRepo)

        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:"2",
            UF:"CE",
        })
        PointId = Id
    })

    it("Should throw EntityDoesNotExistsError if Finishing Point Id does not exists", async () => {
        await expect(Service.execute("1", 1)).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Should throw EntityNotFoundError if there aren't any travels with the point", async () => {
        await expect(Service.execute(PointId, 1)).rejects.toBeInstanceOf(EntityNotFoundError)
    })
})