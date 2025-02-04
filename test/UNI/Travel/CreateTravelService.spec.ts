import { beforeEach, describe, expect, it } from "vitest";
import { CreateTravelUseCase } from "../../../src/services/Travel/CreateTravelService";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { InMemoryPointRepository } from "../../../src/repository/.index";
import { randomUUID } from "crypto";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var Service: CreateTravelUseCase
var TravelRepo: InMemoryTravelRepository
var PointRepo: InMemoryPointRepository
describe("Create a Travel Service", async () => {
    beforeEach(async () => {
        TravelRepo = new InMemoryTravelRepository()
        PointRepo = new InMemoryPointRepository()
        Service = new CreateTravelUseCase(TravelRepo, PointRepo)
    })

    it("Should be able to create a Travel: Good Case", async () => {
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:String(randomUUID()),
            UF:"CE"
        })
        const travel = await Service.execute({
            BeginningPointId: Id,
            FinnishPointId: Id,
            TravelBasePrice: 100,
            Travel_Day: new Date(),
            Transport:"Air",
        })
        expect(travel.BeginningPointId).toBe(Id)
    })

    it("Shouldn't be able to create a Travel whithout the Beginning Point Id: Bad Case", async () => {
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:String(randomUUID()),
            UF:"CE"
        })
        await expect(Service.execute({
            BeginningPointId: "",
            FinnishPointId: Id,
            TravelBasePrice: 100,
            Travel_Day: new Date(),
            Transport: "Air",
        })).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Shouldn't be able to create a Travel whithout the Finishing Point Id: Bad Case", async () => {
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:String(randomUUID()),
            UF:"CE"
        })
        await expect(Service.execute({
            BeginningPointId: Id,
            FinnishPointId: "",
            TravelBasePrice: 100,
            Travel_Day: new Date(),
            Transport: "Air"
        })).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})