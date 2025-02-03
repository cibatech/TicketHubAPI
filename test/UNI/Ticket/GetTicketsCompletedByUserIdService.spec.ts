import { beforeEach, describe, expect, it } from "vitest";
import { GetTicketsCompletedByUserIdUseCase } from "../../../src/services/Ticket/GetTicketsCompletedByUserId";
import { InMemoryTicketRepository, InMemoryUserRepository } from "../../../src/repository/.index";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var Service: GetTicketsCompletedByUserIdUseCase
var UserRepo: InMemoryUserRepository
var TicketRepo: InMemoryTicketRepository
describe("Get the Completed Tickets of a User", () => {
    beforeEach(() => {
        UserRepo = new InMemoryUserRepository()
        TicketRepo = new InMemoryTicketRepository()
        Service = new GetTicketsCompletedByUserIdUseCase(TicketRepo, UserRepo)
    })

    it("Should be able to get the the completed tickets of a user", async () => {
        const user = await UserRepo.create({
            Email:"random@email.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
            CPF:"1223"
        })
        const {Id} = await TicketRepo.create({
            TravelId:"2",
            userId:user.Id,
            Completed_at:new Date(),
        })
        const tickets = await Service.execute(user.Id)
        expect(tickets[0].Id).toBe(Id)
    })

    it("Should throw EntityDoesNotExistsError if the user does not exist", async () => {
        await expect(Service.execute("1")).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})