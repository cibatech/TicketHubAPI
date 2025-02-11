import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPointRepository } from "../../../src/repository/.index";
import { GetPointsByNameUseCase } from "../../../src/services/Points/GetPointsByNameService";

var PointRepo: InMemoryPointRepository
var service: GetPointsByNameUseCase
describe("Get Points By Name Service Test", () => {
    beforeEach(async () => {
        PointRepo = new InMemoryPointRepository()
        service = new GetPointsByNameUseCase(PointRepo)
        await PointRepo.create({
            Name:"South",
            UF:"CE",
            route_id:"1",
        })
    })
    it("Should be able to get many points by the Name", async () => {
        const points = await service.execute("S");
        expect(points[0].Name).toBe("South")
    })
})