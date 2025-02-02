import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsTicketRepository } from "../../../src/repository/InMemory/InMemoryClientsTicketRepository";
import { InMemoryTicketRepository } from "../../../src/repository/InMemory/InMemoryTicketRepository";
import { InMemoryUserRepository } from "../../../src/repository/InMemory/InMemoryUserRepository";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { CreateClientsTicketUseCase } from "../../../src/services/ClientsTicket/CreateClientsTicketService";

var Service: CreateClientsTicketUseCase;
var ClientsTicketRepo: InMemoryClientsTicketRepository;
var TicketRepo: InMemoryTicketRepository;
var UserRepo: InMemoryUserRepository;

describe("Create a ClientsTicket Service", async () => {
  beforeEach(async () => {
    ClientsTicketRepo = new InMemoryClientsTicketRepository();
    TicketRepo = new InMemoryTicketRepository();
    UserRepo = new InMemoryUserRepository();
    Service = new CreateClientsTicketUseCase(ClientsTicketRepo, TicketRepo, UserRepo);
  });

  it("Should be able to create a ClientsTicket: Good Case", async () => {
    const user = await UserRepo.create({
      Nome: "John Doe",
      Email: "john@example.com",
      Password: "1234",
    });

    const ticket = await TicketRepo.create({
      TravelId: "1234",
      userId:user.Id,
    });

    const clientsTicket = await Service.execute({
      OwnerId: user.Id,
      TicketId: ticket.Id,
      IsCompanion: false,
      PersonName: "Jane Doe",
      Age: 25,
      CPF: "123.456.789-10"
    });

    expect(clientsTicket.Age).toBe(25);
  });

  it("Shouldn't be able to create a ClientsTicket without a valid OwnerId: Bad Case", async () => {
    const ticket = await TicketRepo.create({
        TravelId: "1234",
        userId:"",
    });

    await expect(Service.execute({
      OwnerId: "",
      TicketId: ticket.Id,
      IsCompanion: false,
      PersonName: "Jane Doe",
      Age: 25,
      CPF: "123.456.789-10"
    })).rejects.toBeInstanceOf(EntityDoesNotExistsError);
  });

  it("Shouldn't be able to create a ClientsTicket without a valid TicketId: Bad Case", async () => {
    const user = await UserRepo.create({
      Nome: "John Doe",
      Email: "john@example.com",
      Password: "1234"
    });

    await expect(Service.execute({
      OwnerId: user.Id,
      TicketId: "",
      IsCompanion: false,
      PersonName: "Jane Doe",
      Age: 25,
      CPF: "123.456.789-10"
    })).rejects.toBeInstanceOf(EntityDoesNotExistsError);
  });
});
