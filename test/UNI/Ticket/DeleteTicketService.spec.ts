import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryTicketRepository, InMemoryUserRepository } from "../../../src/repository/.index"
import { DeleteTicketUseCase } from "../../../src/services/Ticket/DeleteTicketService"
import { randomUUID } from "crypto"
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError"
import { ForbiddenActionError } from "../../../src/Errors/ForbiddenActionError"

var TicketRepo: InMemoryTicketRepository
var UserRepo: InMemoryUserRepository
var Service: DeleteTicketUseCase
var UserId: string
var Id: string
describe("Delete Ticket: Good Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository();
        UserRepo = new InMemoryUserRepository()
        Service = new DeleteTicketUseCase(TicketRepo, UserRepo);
        const user = await UserRepo.create({
            Email:"example@gmail.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
        })
        UserId = user.Id
        const ticket = await TicketRepo.create({
            userId: UserId,
            Completed_at: null,
            Validated_at: null,
            TravelId:"",
        })
        Id = ticket.Id
    })

    it("Should be able to delete a ticket", async () => {
        const deletedTicket = await Service.execute({
            Id,
            UserId,
        });
        expect(deletedTicket.Id).toBe(Id)
    })
})

describe("Delete Ticket: Bad Case", async () => {
    beforeEach(async () => {
        TicketRepo = new InMemoryTicketRepository();
        UserRepo = new InMemoryUserRepository()
        Service = new DeleteTicketUseCase(TicketRepo, UserRepo);
        const user = await UserRepo.create({
            Email:"example@gmail.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
        })
        UserId = user.Id
        const ticket = await TicketRepo.create({
            userId: String(randomUUID),
            Completed_at: null,
            Validated_at: null,
            TravelId:"",
        })
        Id = ticket.Id
    })

    it("Should throw EntityDoesNotExistsError if the ticket user does not exist", async () => {
        await expect(Service.execute({
            Id:"",//User verification comes before ticket verification
            UserId:"1234",
        })).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Should throw EntityDoesNotExistsError if the ticket does not exist", async () => {
        await expect(Service.execute({
            Id:"1234",
            UserId,
        })).rejects.toBeInstanceOf(EntityDoesNotExistsError);
    })

    it("Should trow ForbiddenActionError if the UserId and the userId of the ticket does not match", async () => {
        const user = await UserRepo.create({
            Email:"examplew@gmail.com",
            Nome:"Tulyos Zinga",
            Password:"1234",
        })
        await expect(Service.execute({
            Id,
            UserId: user.Id
        })).rejects.toBeInstanceOf(ForbiddenActionError)
    })
})
