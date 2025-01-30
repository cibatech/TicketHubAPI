import { beforeEach, describe, expect, it } from "vitest";
import { GetTicketByIdUseCase } from "../../../src/services/Ticket/GetTicketByIdService";
import { TicketRepository } from "../../../src/repository/TicketRepository";
import { InMemoryTicketRepository } from "../../../src/repository/.index";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var Service: GetTicketByIdUseCase
var TicketRepo: TicketRepository
describe("Get a Ticket By Id Service: Good Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository()
        Service = new GetTicketByIdUseCase(TicketRepo)
    })
    it("Should be able to find the Ticket by it's Id", async () => {
        const {Id} = await TicketRepo.create({ TravelId:"1", userId:"1"})
        const ticket = await Service.execute(Id)
        expect(ticket.Id).toBe(Id)
    })
})

describe("Get a Ticket By Id Service: Bad Case", async () => {
    TicketRepo = new InMemoryTicketRepository()
    Service = new GetTicketByIdUseCase(TicketRepo)

    it("Should throw EntityDoesNotExistsError if the Ticket does not exists", async () => {
        await expect(Service.execute("2"))
               .rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})