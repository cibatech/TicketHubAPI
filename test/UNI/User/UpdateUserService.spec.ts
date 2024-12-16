

import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../src/repository";
import { CreateUserUseCase, UpdateUserServiceUseCase } from "../../../src/services";
import { faker } from "@faker-js/faker";
import { EntityAlreadyExists } from "../../../src/Errors";
import { User } from "@prisma/client";
import { EntityDoesNotExistsErro } from "../../../src/Errors/EntityDoesNotExistsError";

var service:UpdateUserServiceUseCase
var UserRepo:InMemoryUserRepository
var User:User
describe("Create user: Good Case",async()=>{
    beforeEach(async()=>{
        UserRepo = new InMemoryUserRepository
        service = new UpdateUserServiceUseCase(UserRepo)

        User = await UserRepo.create({
            Email:"randomUser@gmail.com",
            Nome:faker.internet.username(),
            Password:faker.internet.password()
        })
    })
    it("Should be able to update a user",async()=>{
        const SUT = await service.execute(User.Id,{
            Nome:"Pessoa"
        })

        expect(SUT.Nome).toBe("Pessoa")
    })
})

describe("Create User: Bad Case",async()=>{
    beforeEach(async()=>{
        UserRepo = new InMemoryUserRepository
        service = new UpdateUserServiceUseCase(UserRepo)

        User = await UserRepo.create({
            Email:"randomUser@gmail.com",
            Nome:faker.internet.username(),
            Password:faker.internet.password()
        })
    })
    it("Should be able to update a user",async()=>{

        await expect(service.execute("User.Id",{
            Nome:"Pessoa"
        })).rejects.toBeInstanceOf(EntityDoesNotExistsErro)
    })
})
