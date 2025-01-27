import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryTicketRepository } from "../../../src/repository/.index";
import { CreateTicketUseCase } from "../../../src/services/Ticket/CreateTicketService";
import { NullArgumentError } from "../../../src/Errors/NullArgumentError";

var Service: CreateTicketUseCase
var TicketRepo: InMemoryTicketRepository
describe("Create Ticket: Good Case", async () => {
    beforeEach(() => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new CreateTicketUseCase(TicketRepo)
    })
    it("Should be able to create a Ticket", async () => {
        const ticket = await Service.execute({
            TravelId: "1",
            userId: "null",
            Validated_at: new Date("2025-09-01"),
            Completed_at: null
        })
        expect(ticket.TravelId).toBe("1")
    })
})

describe("Create Ticket: Bad Case", async () => {
    beforeEach(() => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new CreateTicketUseCase(TicketRepo)
    })
    it("Shouldn't be able to create a Ticket with TravelId been empty",async () => { 
        await expect(
            Service.execute({
                TravelId: "",
            })
        ).rejects.toBeInstanceOf(NullArgumentError)
    })
})