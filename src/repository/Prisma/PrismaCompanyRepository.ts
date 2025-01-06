import { PrismaClient, Prisma, Company } from "@prisma/client";
import { CompanyRepository } from "../CompanyReporitory";
import { prisma } from "../../lib/prisma";

export class PrismaCompanyRepository implements CompanyRepository {
  /**
   * Cria uma nova empresa no banco de dados.
   * @param data - Dados da empresa a ser criada.
   * @returns A empresa criada.
   */
  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return await prisma.company.create({
      data,
    });
  }
  /**
   * Encontra uma empresa pelo ID.
   * @param Id - ID da empresa.
   * @returns A empresa encontrada ou `null` se não existir.
   */
  async findById(Id: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: {Id},
    });
  }
  /**
   * Encontra uma empresa pelo CNPJ.
   * @param CNPJ - CNPJ da empresa.
   * @returns A empresa encontrada ou `null` se não existir.
   */
  async findByCNPJ(CNPJ: string): Promise<Company | null> {
    const ls = await prisma.company.findMany({
        where:{ CNPJ },
      })
    return ls[0] ;
  }
  /**
   * Busca empresas que correspondem a uma consulta textual.
   * @param Query - String de busca para o nome da empresa.
   * @returns Uma lista de empresas que correspondem à consulta.
   */
  async findByQuery(Query: string): Promise<Company[]> {
    return await prisma.company.findMany({
      where: {
        Name: {
          contains: Query,
          mode: "insensitive",
        },
      },
    });
  }
  /**
   * Exclui uma empresa pelo ID.
   * @param id - ID da empresa a ser excluída.
   * @returns A empresa excluída ou `null` se não existir.
   */
  async delete(id: string): Promise<Company | null> {
    return await prisma.company.delete({
      where: { Id:id },
    });
  }

  /**
   * Atualiza as informações de uma empresa.
   * @param id - ID da empresa a ser atualizada.
   * @param data - Dados para atualizar.
   * @returns A empresa atualizada ou `null` se não existir.
   */
  async update(id: string, data: Partial<Company>): Promise<Company | null> {
    return await prisma.company.update({
      where: { Id:id },
      data,
    });
  }
}
