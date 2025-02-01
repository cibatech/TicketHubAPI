import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsTicketRepository } from "../../../src/repository/InMemory/InMemoryClientsTicketRepository";
import { InMemoryTicketRepository } from "../../../src/repository/InMemory/InMemoryTicketRepository";
import { InMemoryUserRepository } from "../../../src/repository/InMemory/InMemoryUserRepository";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { DeleteClientsTicketUseCase } from "../../../src/services";
import { ForbiddenActionError } from "../../../src/Errors/ForbiddenActionError";

var Service: DeleteClientsTicketUseCase
var ClientsTicketRepo: InMemoryClientsTicketRepository
var TicketRepo: InMemoryTicketRepository
var UserRepo: InMemoryUserRepository
describe("Delete Clients Ticket Test: Good Case", () => {
    beforeEach(async () => {
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        TicketRepo = new InMemoryTicketRepository()
        UserRepo = new InMemoryUserRepository()
        Service = new DeleteClientsTicketUseCase(ClientsTicketRepo, UserRepo)
    })
    it("Should be able to delete a ClientsTicket", async () => {
        const user = await UserRepo.create({
            Email:"radonio",
            Nome:"xenonio",
            Password:"plutonio"
        })
        const {Id} = await ClientsTicketRepo.create({
            CPF:"123",
            OwnerId:user.Id,
            PersonName:"Tupac",
            TicketId:""
        })
        const deleted = await Service.execute(Id, user.Id)
        expect(deleted.PersonName).toBe("Tupac")
    })
})

describe("Delete Clients Ticket Test: Bad Case", () => {
    beforeEach(async () => {
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        TicketRepo = new InMemoryTicketRepository()
        UserRepo = new InMemoryUserRepository()
        Service = new DeleteClientsTicketUseCase(ClientsTicketRepo, UserRepo)
    })

    it("Should throw EntityDoesNotExistsError if the ClientTicketId is invalid", async () => {
        const user = await UserRepo.create({
            Email:"radonio",
            Nome:"xenonio",
            Password:"plutonio"
        })
        await expect(Service.execute("1", user.Id)).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Should throw EntityDoesNotExistsError if the UserId is invalid", async () => {
        await expect(Service.execute("1", "1")).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Should throw ForbiddenActionError if the UserId does not match OwnerId", async () => {
        const user = await UserRepo.create({
            Email:"radonio",
            Nome:"xenonio",
            Password:"plutonio"
        })
        const secondUser = await UserRepo.create({
            Email:"raabiaso",
            Nome:"xenonio",
            Password:"plutonio"
        })
        const {Id} = await ClientsTicketRepo.create({
            CPF:"123",
            OwnerId:user.Id,
            PersonName:"Tupac",
            TicketId:""
        })
        await expect(Service.execute(Id, secondUser.Id)).rejects.toBeInstanceOf(ForbiddenActionError)
    })
})