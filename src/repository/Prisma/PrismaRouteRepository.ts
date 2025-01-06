import { PrismaClient, Route, Prisma, routeKind } from "@prisma/client";
import { RoutesRepository } from "../RoutesRepository";
import { prisma } from "../../lib/prisma";

export class PrismaRoutesRepository implements RoutesRepository {

  /**
   * Cria uma nova rota no banco de dados.
   * @param data - Dados da rota a ser criada.
   * @returns A rota criada.
   */
  async create(data: Prisma.RouteCreateInput): Promise<Route> {
    return await prisma.route.create({
      data,
    });
  }

  /**
   * Encontra uma rota pelo ID.
   * @param Id - ID da rota.
   * @returns A rota encontrada ou `null` se não existir.
   */
  async findById(Id: string): Promise<Route | null> {
    return await prisma.route.findUnique({
      where: { Id },
    });
  }

  /**
   * Encontra todas as rotas associadas a um ID específico.
   * @param Page - Pagina de retorno (20 itens por página)
   * @returns Uma lista de rotas.
   */
  async findAllRoutes(Page:number): Promise<Route[]> {
    return await prisma.route.findMany({
      skip:(Page-1)*20, take:Page*20
    });
  }

  /**
   * Encontra rotas pelo tipo (ex: tipo de transporte, etc).
   * @param type - Tipo da rota.
   * @returns Uma lista de rotas do tipo especificado.
   */
  async findByType(type: routeKind): Promise<Route[]> {
    return await prisma.route.findMany({
      where: { RouteType:type },
    });
  }

  /**
   * Busca rotas com base em uma consulta textual e paginação.
   * @param Query - String de consulta.
   * @param Page - Página da consulta (para paginação).
   * @returns Uma lista de rotas que correspondem à consulta.
   */
  async findByQuery(Query: string, Page: number): Promise<Route[]> {
    const take = 10; // Defina o número de itens por página, aqui é 10 por exemplo.
    const skip = (Page - 1) * take; // Calcula o deslocamento de acordo com a página.

    return await prisma.route.findMany({
      where: {
        Title: {
          contains: Query,
          mode: "insensitive",
        },
      },
      skip,
      take,
    });
  }

  /**
   * Exclui uma rota pelo ID.
   * @param Id - ID da rota a ser excluída.
   * @returns A rota excluída ou `null` se não existir.
   */
  async delete(Id: string): Promise<Route | null> {
    return await prisma.route.delete({
      where: { Id },
    });
  }

  /**
   * Atualiza as informações de uma rota.
   * @param Id - ID da rota a ser atualizada.
   * @param data - Dados para atualizar.
   * @returns A rota atualizada ou `null` se não existir.
   */
  async update(Id: string, data: Partial<Route>): Promise<Route | null> {
    return await prisma.route.update({
      where: { Id },
      data,
    });
  }
}
