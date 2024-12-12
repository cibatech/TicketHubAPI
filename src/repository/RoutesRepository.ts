import { Prisma, Route, routeKind } from "@prisma/client";

export interface RoutesRepository{
    create(data:Prisma.RouteCreateInput):Promise<Route>
    findById(Id:string):Promise<Route | null>
    findAllRoutes(Id:String):Promise<Route[]>
    findByType(type:routeKind):Promise<Route[]>
    findByQuery(Query:string,Page:number):Promise<Route[]>
    delete(Id:string):Promise<Route | null>
    update(Id:string, data:Partial<Route>):Promise<Route | null>
}