import { Prisma, Ticket } from "@prisma/client";

export interface TickerRepository{
    create(data:Prisma.TicketCreateInput):Promise<Ticket>
    findById(uId:string):Promise<Ticket>
    findByUser(UserId:string):Promise<Ticket[]>
    findByBegginingPoint(PointId:string):Promise<Ticket[]>
    BegginingPoint(PointId:string):Promise<Ticket[]>
    update(Id:string,data:Partial<Ticket>):Promise<Ticket>
    delete(Id:string):Promise<Ticket>
}