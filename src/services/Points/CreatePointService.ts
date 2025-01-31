import { Prisma } from "@prisma/client";
import { PointRepository } from "../../repository/PointRepository";
import { EntityAlreadyExists } from "../../Errors/EntityAlreadyExistsError";
import { InServicePoints } from "../../types/dtos/InServicePoint";

export class CreatePointUseCase {
    constructor(private PointRepo:PointRepository){}
    async execute(data:Prisma.PointUncheckedCreateInput):Promise<InServicePoints>{
        const theresAnyPointWithTheSameName = await this.PointRepo.findByName(data.Name)
        if(theresAnyPointWithTheSameName){
            throw new EntityAlreadyExists("Point");
        }

        const create = await this.PointRepo.create(data);

        return{
            PointName:create.Name,
            Boolist:{
                Airports:create.Airports,
                Railroads:create.Railroads,
                SeaPorts:create.Ports
            },
            Geo:{
                Province:create.UF,
                Description:create.Description
            }
        }
    }
}