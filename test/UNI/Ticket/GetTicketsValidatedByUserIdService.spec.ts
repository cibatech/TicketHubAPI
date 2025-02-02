import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTicketRepository, InMemoryUserRepository } from "../../../src/repository/.index";
import { GetTicketsValidatedByUserIdUseCase } from "../../../src/services/Ticket/GetTicketsValidatedByUserId";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var TicketRepo: InMemoryTicketRepository
var UserRepo: InMemoryUserRepository
var Service: GetTicketsValidatedByUserIdUseCase
describe("Get The Validated Tickets of a User Service", () => {
    beforeEach(() => {
        UserRepo = new InMemoryUserRepository()
        TicketRepo = new InMemoryTicketRepository()
        Service = new GetTicketsValidatedByUserIdUseCase(TicketRepo, UserRepo)
    })
    it("Should be able to get the Validated Tickets of a User", async () => {
        const user = await UserRepo.create({
            Email:"dragonbollz@email.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
        })
        const {Id} = await TicketRepo.create({
            TravelId:"",
            userId:user.Id,
            Validated_at:new Date(),
        })
        const tickets = await Service.execute(user.Id)
        expect(tickets[0].Id).toBe(Id)
    })

    it("Should throw EntityDoesNotExistError if the User does not exists", async () => {
        await expect(Service.execute("1")).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})