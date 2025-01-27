import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryTicketRepository } from "../../../src/repository/.index"
import { DeleteTicketUseCase } from "../../../src/services/Ticket/DeleteTicketService"
import { randomUUID } from "crypto"
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError"

var TicketRepo: InMemoryTicketRepository
var Service: DeleteTicketUseCase
describe("Delete Ticket: Good Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository();
        Service = new DeleteTicketUseCase(TicketRepo);
    })

    it("Should be able to delete a ticket", async () => {
        const {Id} = await TicketRepo.create({
            userId: String(randomUUID()),
            Completed_at: null,
            Validated_at: null,
            TravelId:"",
        })
        const deletedTicket = await Service.execute(Id);
        expect(deletedTicket.Id).toBe(Id)
    })
})

describe("Delete Ticket: Bad Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository();
        Service = new DeleteTicketUseCase(TicketRepo);

        await TicketRepo.create({
            userId: String(randomUUID),
            Completed_at: null,
            Validated_at: null,
            TravelId:"",
        })
    })

    it("Should throw EntityDoesNotExistsError if the ticket does not exist", async () => {
        await expect(Service.execute("1")).rejects.toBeInstanceOf(EntityDoesNotExistsError);
    })
})
