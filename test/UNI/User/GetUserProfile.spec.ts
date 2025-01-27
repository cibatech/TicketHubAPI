import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { InMemoryUserRepository } from "../../../src/repository/.index";
import { GetUserProfileUseCase } from "../../../src/services";
import { randomUUID } from "crypto";
import { EntityDoesNotExistsError } from "../../../src/Errors/EntityDoesNotExistsError";
import { hash } from "bcryptjs";

describe("GetUserProfileUseCase", () => {
  const makeUser = async () => ({
    Nome: faker.name.fullName(),
    Email: faker.internet.email(),
    Password:await hash(faker.internet.password({
        length:10
    }),9),
  });

  it("should return the user's profile if the user exists", async () => {
    const userRepository = new InMemoryUserRepository();
    const {Email,Nome,Password} = await makeUser();
    const {Id} = await userRepository.create({Email,Nome,Password});

    const useCase = new GetUserProfileUseCase(userRepository);

    const result = await useCase.execute({Id});

    expect(result).toEqual({
      Email: Email,
      Nome: Nome,
    });
  });

  it("should throw EntityDoesNotExistsErro if the user does not exist", async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new GetUserProfileUseCase(userRepository);

    await expect(useCase.execute({ Id: randomUUID() }))
      .rejects.toBeInstanceOf(EntityDoesNotExistsError);
  });
});
