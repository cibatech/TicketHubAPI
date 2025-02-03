import { Prisma, Travel } from "@prisma/client";
import { TravelRepository } from "../TravelRepository";
import { prisma } from "../../lib/prisma";

/**
 * Classe de Repositório de Travels
 * @author Pedro Henryk
 */
export class PrismaTravelRepository implements TravelRepository {

    /**
     * Criar uma nova Travel no banco de dados
     * @param data - Dados da Travel a ser criada
     * @returns A entidade Travel criada
     */
    async create(data: Prisma.TravelUncheckedCreateInput) {
        return await prisma.travel.create({
            data,
        })
    }

    /**
     * Procurar uma Travel pelo seu Id
     * @param Id - A Id da entidade a ser procurada
     * @returns A Travel caso ela seja encontrada ou `null` no caso oposto
     */
    async findById(Id: string) {
        return await prisma.travel.findUnique({
            where:{
                Id,
            }
        })
    }

    /**
     * Procurar várias Travels pelo seu ponto inicial
     * @param PointId - O Id do ponto inicial das Travels que serão procuradas
     * @returns Uma lista com as Travels encontradas
     */
    async findByBeginningPointId(PointId: string, Page: number) {
        const take = 10
        const skip = (Page-1)*take
        return await prisma.travel.findMany({
            where:{
                BeginningPointId: PointId,
            },
            skip,
            take,
        })
    }

    /**
     * Procurar várias Travels pelo seu ponto final
     * @param PointId - O Id do ponto final das Travels que serão procuradas
     * @returns Uma lista com as Travels encontradas
     */
    async findByFinishingPointId(PointId: string, Page: number) {
        const take = 10
        const skip = (Page-1)*take
        return await prisma.travel.findMany({
            where:{
                FinnishPointId: PointId,
            },
            skip,
            take,
        })
    }

    /**
     * Procurar várias Travels pelo seu `Travel_Day`
     * @param Day - O data que será utilizada de parâmetro para a busca
     * @returns Uma lista com as Travels encotradas
     */
    async findByTravelDay(Day: Date, Page: number) {
        const take = 10
        const skip = (Page-1)*take
        return await prisma.travel.findMany({
            where:{
                Travel_Day: Day,
            },
            skip,
            take,
        })
    }

    /**
     * Procurar várias Travels que tenham o TravelBasePrice entre um cerrto intervalo de valores
     * @param min - Valor minimo
     * @param max - Valor máximo
     * @param Page - Pagina de consulta (para paginação), must not be zero, atleast 1
     * @returns Uma lista de Travels
     */
    async findByRangePrice(min: number, max: number, Page: number): Promise<Travel[] | null> {
        const take = 10
        const skip = (Page-1)*take
        return await prisma.travel.findMany({
            where:{
                TravelBasePrice: {
                    gte: min,
                    lte: max,
                }
            },
            skip,
            take,
        })
    }

    /**
     * Encontrar uma Travel por um intervalo de datas
     * @param afterDay - Dia que a Travel deve ocorrer depois de
     * @param beforeDay - Dia que a Travel deve ocorrer antes de
     * @param Page - Pagina de consulta (para paginação), must not be zero, atleast 1
     * @returns Uma lista de Travels
     */
    async findByRangeDate(afterDay: Date, beforeDay: Date, Page: number): Promise<Travel[] | null> {
        const take = 10
        const skip = (Page-1)*take
        return await prisma.travel.findMany({
            where:{
                Travel_Day:{
                    gte:afterDay,
                    lte:beforeDay,
                }
            },
            skip,
            take,
        })
    }

    /**
     * Procurar Travels por meio de filtragem
     * @param where - Prisma.WhereTravelInput
     * @returns Lista de Travels
     */
    async findByFilter(where: Prisma.TravelWhereInput): Promise<Travel[]> {
        return prisma.travel.findMany({
            where,
        })
    }

    /**
     * Atualizar uma Travel
     * @param Id - O Id da Travel a ser atualizada
     * @param data - Os dados que serão atualizados
     * @returns A Travel atualizada ou `null` caso ela não seja encontrada
     */
    async update(Id: string, data: Partial<Travel>) {
        return await prisma.travel.update({
            where:{
                Id,
            },
            data,  
        })
    }

    /**
     * Deletar uma Travel
     * @param Id - O Id da Travel a ser deletada
     * @returns A Travel deletada ou `null` caso ela não seja encontrada
     */
    async delete(Id: string) {
        return await prisma.travel.delete({
            where:{
                Id,
            }
        })
    }
}