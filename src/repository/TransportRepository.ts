import { Prisma, Transport } from "@prisma/client";

export interface TransportRepository{
    create(data:Prisma.TransportCreateInput):Promise<Transport>
    findById(Id:string):Promise<Transport>
    findByCompany(CompanyId:string):Promise<Transport[]>
    findByRoute(RouteId:string):Promise<Transport>
    delete(Id:string):Promise<Transport>
    update(Id:string,data:Partial<Transport>):Promise<Transport>
}