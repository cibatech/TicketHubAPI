import { PrismaClient, Ticket, Prisma } from "@prisma/client";
import {TicketRepository} from "../TicketRepository"
import { prisma } from "../../lib/prisma";

export class PrismaTicketRepository implements TicketRepository {


  /**
   * Cria um novo ticket no banco de dados.
   * @param data - Dados do ticket a ser criado.
   * @returns O ticket criado.
   */
  async create(data: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    return await prisma.ticket.create({
      data,
    });
  }

  /**
   * Encontra um ticket pelo ID.
   * @param uId - ID do ticket.
   * @returns O ticket encontrado ou `null` se não existir.
   */
  async findById(Id: string): Promise<Ticket | null> {
    return await prisma.ticket.findUnique({
      where: { Id },
    });
  }

  /**
   * Encontra todos os tickets de um usuário.
   * @param UserId - ID do usuário.
   * @returns Uma lista de tickets do usuário.
   */
  async findByUser(UserId: string): Promise<Ticket[]> {
    return await prisma.ticket.findMany({
      where: { userId: UserId },
    });
  }

  /**
   * Encontra todos os tickets validados
   * @returns Uma lista de tickets validados
   */
  async findByValidation(): Promise<Ticket[]> {
    return await prisma.ticket.findMany({
      where: { Validated_at: { not: null } },
    });
  }
    /**
   * Encontra todos os tickets completados
   * @returns Uma lista de tickets completados
   */
  async findByCompleted(): Promise<Ticket[]> {
    return await prisma.ticket.findMany({
      where: { Completed_at: { not: null} },
    });
  }
  /**
   * Atualiza as informações de um ticket.
   * @param Id - ID do ticket a ser atualizado.
   * @param data - Dados para atualizar.
   * @returns O ticket atualizado ou `null` se não existir.
   */
  async update(Id: string, data: Partial<Ticket>): Promise<Ticket | null> {
    return await prisma.ticket.update({
      where: { Id },
      data,
    });
  }

  /**
   * Exclui um ticket pelo ID.
   * @param Id - ID do ticket a ser excluído.
   * @returns O ticket excluído ou `null` se não existir.
   */
  async delete(Id: string): Promise<Ticket | null> {
    return await prisma.ticket.delete({
      where: {  Id },
    });
  }
}
