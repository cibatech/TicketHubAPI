import { Point, Prisma } from "@prisma/client";

export interface PointRepository{
    create(data:Prisma.PointUncheckedCreateInput):Promise<Point>
    findById(Id:string):Promise<Point | null>
    findByName(Name:string):Promise<Point | null>
    delete(Id:string):Promise<Point | null>
    update(Id:string,data:Partial<Point>):Promise<Point | null>
}