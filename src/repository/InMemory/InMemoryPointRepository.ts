import { Point, Prisma } from "@prisma/client";
import { PointRepository } from "../PointRepository";
import { randomUUID } from "crypto";


export class InMemoryPointRepository implements PointRepository {
    private points: Point[] = [];

    async create(data: Prisma.PointUncheckedCreateInput): Promise<Point> {
        const newPoint: Point = {
            Airports:Boolean(data.Airports),
            Description:String(data.Description),
            Id:randomUUID(),
            Name:String(data.Name),
            order:Number(data.order),
            Ports:Boolean(data.Ports),
            Railroads:Boolean(data.Railroads),
            route_id:String(data.route_id),
            UF:String(data.UF)
            
        };

        this.points.push(newPoint);
        return newPoint;
    }

    async findById(Id: string): Promise<Point | null> {
        return this.points.find(point => point.Id === Id) || null;
    }
    async delete(id: string): Promise<Point | null> {
        const index = this.points.findIndex(point => point.Id === id);
        if (index === -1) return null;

        const [deletedPoint] = this.points.splice(index, 1);
        return deletedPoint;
    }

    async update(Id: string, data: Partial<Point>): Promise<Point | null> {
        const point = this.points.find(point => point.Id === Id);
        if (!point) return null;

        const updatedPoint: Point = {
            ...point,
            ...data,
        };

        this.points = this.points.map(p => (p.Id === Id ? updatedPoint : p));
        return updatedPoint;
    }

    async findByName(Name: string): Promise<Point | null> {
        const single = this.points.find(item => item.Name == Name)
        return single?single:null
    }
}
