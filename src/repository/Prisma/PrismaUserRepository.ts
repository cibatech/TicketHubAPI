import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../.index";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepository implements UserRepository {
  /**
   * Cria um novo usuário no banco de dados.
   * @param data - Dados do usuário a ser criado.
   * @returns O usuário criado.
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  /**
   * Encontra um usuário pelo ID.
   * @param uId - ID do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findById(uId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {  Id:uId },
    });
  }

  /**
   * Encontra um usuário pelo e-mail.
   * @param Email - E-mail do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findByEmail(Email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { Email },
    });
  }

  /**
   * Exclui um usuário pelo ID.
   * @param Id - ID do usuário a ser excluído.
   * @returns O usuário excluído ou `null` se não existir.
   */
  async delete(Id: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {Id},
    });
  }

  /**
   * Atualiza as informações de um usuário.
   * @param Id - ID do usuário a ser atualizado.
   * @param data - Dados para atualizar.
   * @returns O usuário atualizado ou `null` se não existir.
   */
  async update(Id: string, data: Partial<User>): Promise<User | null> {
    return await prisma.user.update({
      where: {Id},
      data,
    });
  }
}
