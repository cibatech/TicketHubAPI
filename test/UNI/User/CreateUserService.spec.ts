import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../src/repository";
import { CreateUserUseCase } from "../../../src/services";
import { faker } from "@faker-js/faker";
import { EntityAlreadyExists } from "../../../src/Errors";

var service:CreateUserUseCase
var UserRepo:InMemoryUserRepository
describe("Create user: Good Case",async()=>{
    beforeEach(()=>{
        UserRepo = new InMemoryUserRepository
        service = new CreateUserUseCase(UserRepo)
    })
    it("Should be able to create a user",async()=>{
        const SUT = await service.execute({
            Email:"randomUser@gmail.com",
            Nome:faker.internet.username(),
            Password:faker.internet.password()
        })

        expect(SUT.Email).toBe("randomUser@gmail.com")
    })
})

describe("Create User: Bad Case",async()=>{
    beforeEach(()=>{
        UserRepo = new InMemoryUserRepository
        service = new CreateUserUseCase(UserRepo)
        UserRepo.create({
            Email:"randomUser@gmail.com",
            Nome:faker.internet.username(),
            Password:faker.internet.password()
        })
    })
    it("Should not be able to create a user with an already existing email adress",async()=>{
        await expect(service.execute({
            Email:"randomUser@gmail.com",
            Nome:faker.internet.username(),
            Password:faker.internet.password()
        })).rejects.toBeInstanceOf(EntityAlreadyExists)
    })
})
