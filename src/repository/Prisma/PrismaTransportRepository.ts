import { PrismaClient, Prisma, Transport } from "@prisma/client";
import { TransportRepository } from "../TransportRepository";
import { prisma } from "../../lib/prisma";


export class PrismaTransportRepository implements TransportRepository {
  /**
   * Cria um novo transporte no banco de dados.
   * @param data - Dados do transporte a ser criado.
   * @returns O transporte criado.
   */
  async create(data: Prisma.TransportUncheckedCreateInput): Promise<Transport> {
    return await prisma.transport.create({
      data,
    });
  }

  /**
   * Encontra um transporte pelo ID.
   * @param Id - ID do transporte.
   * @returns O transporte encontrado ou `null` se não existir.
   */
  async findById(Id: string): Promise<Transport | null> {
    return await prisma.transport.findUnique({
      where: { Id },
    });
  }

  /**
   * Encontra todos os transportes associados a uma empresa.
   * @param CompanyId - ID da empresa.
   * @returns Uma lista de transportes associados à empresa.
   */
  async findByCompany(CompanyId: string): Promise<Transport[]> {
    return await prisma.transport.findMany({
      where: { Company: CompanyId },
    });
  }

  /**
   * Encontra um transporte pela rota.
   * @param RouteId - ID da rota.
   * @returns O transporte associado à rota ou `null` se não existir.
   */
  async findByRoute(RouteId: string): Promise<Transport | null> {
    return await prisma.transport.findFirst({
      where: {AssignedRoute:RouteId},
    });
  }

  /**
   * Exclui um transporte pelo ID.
   * @param Id - ID do transporte a ser excluído.
   * @returns O transporte excluído ou `null` se não existir.
   */
  async delete(Id: string): Promise<Transport | null> {
    return await prisma.transport.delete({
      where: {Id},
    });
  }

  /**
   * Atualiza as informações de um transporte.
   * @param Id - ID do transporte a ser atualizado.
   * @param data - Dados para atualizar.
   * @returns O transporte atualizado ou `null` se não existir.
   */
  async update(Id: string, data: Partial<Transport>): Promise<Transport | null> {
    return await prisma.transport.update({
      where: {Id},
      data,
    });
  }
}
