import { Prisma, Ticket } from "@prisma/client";

export interface TickerRepository{
    create(data:Prisma.TicketUncheckedCreateInput):Promise<Ticket>
    findById(uId:string):Promise<Ticket | null>
    findByUser(UserId:string):Promise<Ticket[]>
    findByBegginingPoint(PointId:string):Promise<Ticket[]>
    update(Id:string,data:Partial<Ticket>):Promise<Ticket | null>
    delete(Id:string):Promise<Ticket | null>
}