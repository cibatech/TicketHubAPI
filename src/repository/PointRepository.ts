import { Point, Prisma } from "@prisma/client";

export interface PointRepository{
    create(data:Prisma.PointCreateInput):Promise<Point>
    findById(Id:string):Promise<Point>
    findByBus(BusId:string):Promise<Point>
    delete(Id:string):Promise<Point>
    update(Id:string):Promise<Point>
}