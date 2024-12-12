import { Prisma, Route, routeKind } from "@prisma/client";

export interface RoutesRepository{
    create(data:Prisma.RouteCreateInput):Promise<Route>
    findById(Id:string):Promise<Route>
    findAllRoutes(Id:String):Promise<Route>
    findByType(type:routeKind):Promise<Route>
    findByQuery(Query:string):Promise<Route[]>
    delete(Id:string):Promise<Route>
    update(Id:string, data:Partial<Route>):Promise<Route>
}