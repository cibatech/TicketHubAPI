import { Prisma, Route, routeKind } from "@prisma/client";

import { randomUUID } from "crypto";
import { RoutesRepository } from "../RoutesRepository";

export class InMemoryRoutesRepository implements RoutesRepository {
    private routes: Route[] = [];

    async create(data: Prisma.RouteCreateInput): Promise<Route> {
        const newRoute: Route = {
            Id:randomUUID(),
            Description:data.Description?String(data.Description):null,
            RouteType:data.RouteType as routeKind,
            Title:String(data.Title)
        };

        this.routes.push(newRoute);
        return newRoute;
    }

    async findById(Id: string): Promise<Route | null> {
        const p = this.routes.find(route => route.Id === Id);
        return p?p:null;
    }

    async findAllRoutes(Page:number): Promise<Route[]> {
        return this.routes.slice((Page-1)*20,Page*20);
    }

    async findByType(type: routeKind): Promise<Route[]> {
        return this.routes.filter(route => route.RouteType === type);
    }

    async findByQuery(Query: string,Page:number): Promise<Route[]> {
        return this.routes.filter(route =>
            route.Title.toLowerCase().includes(Query.toLowerCase())
        ).slice((Page-1)*20,Page*20);
    }

    async delete(Id: string): Promise<Route | null> {
        const index = this.routes.findIndex(route => route.Id === Id);
        if (index === -1) return null;

        const [deletedRoute] = this.routes.splice(index, 1);
        return deletedRoute;
    }

    async update(Id: string, data: Partial<Route>): Promise<Route | null> {
        const route = this.routes.find(route => route.Id === Id);
        if (!route) return null;

        const updatedRoute: Route = {
            ...route,
            ...data,
        };

        this.routes = this.routes.map(r => (r.Id === Id ? updatedRoute : r));
        return updatedRoute;
    }
}