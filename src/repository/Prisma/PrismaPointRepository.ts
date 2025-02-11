import { PrismaClient, Point, Prisma } from "@prisma/client";
import { PointRepository } from "../PointRepository";
import { prisma } from "../../lib/prisma";

export class PrismaPointRepository implements PointRepository {

  /**
   * Cria um novo ponto no banco de dados.
   * @param data - Dados do ponto a ser criado.
   * @returns O ponto criado.
   */
  async create(data: Prisma.PointUncheckedCreateInput): Promise<Point> {
    return await prisma.point.create({
      data,
    });
  }

  /**
   * Encontra um ponto pelo ID.
   * @param Id - ID do ponto.
   * @returns O ponto encontrado ou `null` se não existir.
   */
  async findById(Id: string): Promise<Point | null> {
    return await prisma.point.findUnique({
      where: { Id },
    });
  }

  /**
   * Exclui um ponto pelo ID.
   * @param Id - ID do ponto a ser excluído.
   * @returns O ponto excluído ou `null` se não existir.
   */
  async delete(Id: string): Promise<Point | null> {
    return await prisma.point.delete({
      where: { Id },
    });
  }

  /**
   * Atualiza as informações de um ponto.
   * @param Id - ID do ponto a ser atualizado.
   * @param data - Dados para atualizar.
   * @returns O ponto atualizado ou `null` se não existir.
   */
  async update(Id: string, data: Partial<Point>): Promise<Point | null> {
    return await prisma.point.update({
      where: { Id },
      data,
    });
  }

  async findByName(Name: string): Promise<Point | null> {
      const single = await prisma.point.findUnique({
        where:{
          Name
        }
      });

      return single
  }

  async queryByName(Name: string): Promise<Point[]> {
      return await prisma.point.findMany({
        where:{
          Name:{
            contains:Name,
            mode:"insensitive",
          }
        }
      })
  }
}

