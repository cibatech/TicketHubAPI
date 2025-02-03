import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryPointRepository, InMemoryTicketRepository, InMemoryUserRepository } from "../../../src/repository/.index";
import { CreateTicketUseCase } from "../../../src/services/Ticket/CreateTicketService";
import { InMemoryTravelRepository } from "../../../src/repository/InMemory/InMemoryTravelRepository";
import { Travel, User } from "@prisma/client";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { InMemoryClientsTicketRepository } from "../../../src/repository/InMemory/InMemoryClientsTicketRepository";

var user: User
var travel: Travel
var Service: CreateTicketUseCase
var UserRepo: InMemoryUserRepository
var PointRepo: InMemoryPointRepository
var TicketRepo: InMemoryTicketRepository
var TravelRepo: InMemoryTravelRepository
var ClientsTicketRepo: InMemoryClientsTicketRepository
describe("Create Ticket: Good Case", async () => {
    beforeEach(async () => {
        UserRepo = new InMemoryUserRepository()
        PointRepo = new InMemoryPointRepository()
        TicketRepo = new InMemoryTicketRepository()
        TravelRepo = new InMemoryTravelRepository()
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        Service = new CreateTicketUseCase(TicketRepo, TravelRepo, UserRepo, ClientsTicketRepo)
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:"",
            UF:"CE"
        })
        travel = await TravelRepo.create({
            BeginningPointId: Id,
            FinnishPointId: Id,
            TravelBasePrice: 100,
            Travel_Day: new Date(),
            Transport:"Air",
        })
        user = await UserRepo.create({
            Email:"random@email.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
            CPF:"123",
        })
    })
    it("Should be able to create a Ticket", async () => {
        const ticket = await Service.execute({
            TravelId: travel.Id,
            userId: user.Id,
            Validated_at: new Date("2025-09-01"),
            Completed_at: null
        }, "123")
        expect(ticket.TravelId).toBe(travel.Id)
    })
})

describe("Create Ticket: Bad Case", async () => {
    beforeEach(async () => {
        UserRepo = new InMemoryUserRepository()
        PointRepo = new InMemoryPointRepository()
        TicketRepo = new InMemoryTicketRepository()
        TravelRepo = new InMemoryTravelRepository()
        ClientsTicketRepo = new InMemoryClientsTicketRepository()
        Service = new CreateTicketUseCase(TicketRepo, TravelRepo, UserRepo, ClientsTicketRepo)
        const {Id} = await PointRepo.create({
            Name:"San Francisco",
            route_id:"",
            UF:"CE"
        })
        travel = await TravelRepo.create({
            BeginningPointId: Id,
            FinnishPointId: Id,
            TravelBasePrice: 100,
            Travel_Day: new Date(),
            Transport:"Air",
        })
        user = await UserRepo.create({
            Email:"random@email.com",
            Nome:"Tulyo Zinga",
            Password:"1234",
            CPF:"123",
        })
    })

    it("Shouldn't be able to create a Ticket with TravelId been empty",async () => { 
        await expect(
            Service.execute({
                TravelId: "",
                userId: user.Id,
            }, "123")
        ).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })

    it("Shouldn't be able to create a Ticket with userId been empty",async () => { 
        await expect(
            Service.execute({
                TravelId: travel.Id,
                userId: "",
            }, "123")
        ).rejects.toBeInstanceOf(EntityDoesNotExistsError)
    })
})