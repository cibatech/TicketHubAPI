import { beforeEach, describe, expect, it } from "vitest";
import { GetClientsTicketByTicketIdUseCase } from "../../../src/services/ClientsTicket/GetClientsTicketByTicketIdService";
import { InMemoryClientsTicketRepository, InMemoryTicketRepository } from "../../../src/repository/.index";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";

var ClientsTicketRepo: InMemoryClientsTicketRepository
var TicketRepo: InMemoryTicketRepository
var service: GetClientsTicketByTicketIdUseCase
describe("Get ClientsTickets by the TicketId Test: Good Case", () => {
    beforeEach(async () => {
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        TicketRepo = new InMemoryTicketRepository()
        service = new GetClientsTicketByTicketIdUseCase(ClientsTicketRepo, TicketRepo)
    })

    it("Should be able to get ClientsTickets by the TicketId", async () => {
        const {Id} = await TicketRepo.create({
            TravelId:"",
            userId:"",
        })
        await ClientsTicketRepo.create({
            CPF:"x",
            OwnerId:"",
            PersonName:"",
            TicketId:Id,
        })
        const clientsTickets = await service.execute(Id)
        expect(clientsTickets[0].CPF).toBe("x")
    })
})

describe("Get ClientsTickets by the TicketId Test: Bad Case", () => {
    beforeEach(async () => {
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        TicketRepo = new InMemoryTicketRepository()
        service = new GetClientsTicketByTicketIdUseCase(ClientsTicketRepo, TicketRepo)
    })

    it("Should throw EntityDoesNotExistsError if the Ticket is invalid", async () => {
        await ClientsTicketRepo.create({
            CPF:"x",
            OwnerId:"",
            PersonName:"",
            TicketId:"",
        })
        await expect(service.execute("")).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})