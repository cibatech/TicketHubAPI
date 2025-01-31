import { describe, it, expect, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { compare, hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { UserRepository } from "../../../src/repository/.index";
import { EntityDoesNotExistsError, ValidationError } from "../../../src/Errors/.index";
import { ValidateUserUseCase } from "../../../src/services/User/ValidateUserUseCase";

const PreHashPassword = "teste"

describe("ValidadeUserUseCase", () => {
  const makeUser = async() => ({
    Id: randomUUID,
    Email: faker.internet.email(),
    Password:await hash(PreHashPassword,9) , // Simula uma senha criptografada
  });

  it("should return the user ID if the email and password match", async () => {
    const {Email,Id,Password} = await makeUser();
    const mockRepository = {
      findByEmail: vi.fn().mockResolvedValue({Email,Id,Password}),
    };

    const useCase = new ValidateUserUseCase(mockRepository as unknown as UserRepository);

    const result = await useCase.execute(Email,PreHashPassword);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(Email);
    expect(result).toBe(Id);
  });

  it("should throw EntityDoesNotExistsErro if the user does not exist", async () => {
    const mockRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
    };

    const useCase = new ValidateUserUseCase(mockRepository as unknown as UserRepository);

    await expect(useCase.execute(faker.internet.email(), faker.internet.password()))
      .rejects.toBeInstanceOf(EntityDoesNotExistsError);

    expect(mockRepository.findByEmail).toHaveBeenCalled();
  });

  it("should throw ValidationError if the password is incorrect", async () => {
    const {Email,Id,Password} = await makeUser();
    const mockRepository = {
      findByEmail: vi.fn().mockResolvedValue({Email,Id,Password}),
    };

    const useCase = new ValidateUserUseCase(mockRepository as unknown as UserRepository);

    await expect(useCase.execute(Email, "wrong-password"))
      .rejects.toBeInstanceOf(ValidationError);

    expect(mockRepository.findByEmail).toHaveBeenCalledWith(Email);
  });
});