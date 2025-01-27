import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTicketRepository } from "../../../src/repository/.index";
import { GetTicketsCompletedUseCase } from "../../../src/services/Ticket/GetTicketsCompleted";

var TicketRepo: InMemoryTicketRepository
var Service: GetTicketsCompletedUseCase
describe("Get Completed Tickets Service", async () => {
    beforeEach(() => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new GetTicketsCompletedUseCase(TicketRepo)
    })
    it("Should be able to get the completed Tickets", async () => {
        const {Id} = await TicketRepo.create({
            TravelId:"1",
            Completed_at:new Date(),
        })
        const tickets = await Service.execute()
        expect(tickets[0].Id).toBe(Id)
    })
})