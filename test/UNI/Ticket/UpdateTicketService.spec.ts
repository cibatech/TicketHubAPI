import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTicketRepository } from "../../../src/repository/.index";
import { UpdateTicketUseCase } from "../../../src/services/Ticket/UpdateTicketService";
import { randomUUID } from "crypto";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var Service: UpdateTicketUseCase
var TicketRepo: InMemoryTicketRepository
describe("Update Ticket: Good Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new UpdateTicketUseCase(TicketRepo)
    });

    it("Should be able to update a ticket", async () => {
        const {Id} = await TicketRepo.create({
            userId: String(randomUUID()),
            Completed_at: null,
            Validated_at: null,
            TravelId:"",
        })

        const ticket = await Service.execute(Id, {
            Validated_at: new Date(),
            Completed_at: new Date()
        })

        expect((ticket.ValidatedAt && ticket.CompletedAt)).not.toBeNull()
    })
})

describe("Update Ticket: Bad Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository();
        Service = new UpdateTicketUseCase(TicketRepo);
    })

    it("Should throw an error if ticket does not exist", async () => {
        await TicketRepo.create({
            userId: String(randomUUID()),
            Completed_at: null,
            Validated_at: null,
            TravelId:"1",
        })
        await expect(Service.execute("1", {
            Validated_at: new Date(),
            Completed_at: new Date(),
        })).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})
