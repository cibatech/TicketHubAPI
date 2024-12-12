import { Prisma, Transport } from "@prisma/client";

export interface TransportRepository{
    create(data:Prisma.TransportUncheckedCreateInput):Promise<Transport>
    findById(Id:string):Promise<Transport | null>
    findByCompany(CompanyId:string):Promise<Transport[]>
    findByRoute(RouteId:string):Promise<Transport | null>
    delete(Id:string):Promise<Transport | null>
    update(Id:string,data:Partial<Transport>):Promise<Transport | null>
}