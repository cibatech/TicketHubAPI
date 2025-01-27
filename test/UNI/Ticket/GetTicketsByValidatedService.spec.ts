import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTicketRepository } from "../../../src/repository/.index";
import { GetTicketsValidatedUseCase } from "../../../src/services/Ticket/GetTicketsValidated";

var TicketRepo: InMemoryTicketRepository
var Service : GetTicketsValidatedUseCase
describe("Get Validated Tickets Service",() => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new GetTicketsValidatedUseCase(TicketRepo)
    })
    it("Should be able to get the validated tickets", async () => {
        const {Id} = await TicketRepo.create({
            TravelId: "1",
            Validated_at: new Date("2008-09-10"),
        })
        const tickets = await Service.execute()
        expect(tickets[0].Id).toBe(Id)
    })
})