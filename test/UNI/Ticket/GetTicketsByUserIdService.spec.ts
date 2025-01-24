import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTicketRepository, InMemoryUserRepository } from "../../../src/repository/.index";
import { GetTicketsByUserIdUseCase } from "../../../src/services/Ticket/GetTicketsByUserIdService";
import { TicketInService } from "../../../src/types/.index";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var TicketRepo: InMemoryTicketRepository
var UserRepo: InMemoryUserRepository
var Service: GetTicketsByUserIdUseCase
describe("Get a Ticket by the User Id Service: Good Case", async () => {{
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository()
        UserRepo = new InMemoryUserRepository()
        Service = new GetTicketsByUserIdUseCase(TicketRepo, UserRepo)
    })
    it("Should be able to find Tickets by the UserId", async () => {
        const {Id} = await UserRepo.create({
            Email: "random@email.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
        })
        await TicketRepo.create({
            TravelId: "1",
            userId: Id,
        })
        const tickets = await Service.execute(Id)
        expect(tickets[0].TravelId).toBe("1")
    })
}})

describe("Get a Ticket by the User Id Service: Bad Case", async () => {{
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository()
        UserRepo = new InMemoryUserRepository()
        Service = new GetTicketsByUserIdUseCase(TicketRepo, UserRepo)
        await TicketRepo.create({
            TravelId:"1",
            userId:"2",
        })
    })
    it("Shouldn't be able to find Tickets of a UserId that doesn't exists", async () => {
        await expect(Service.execute("1"))
               .rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
}})