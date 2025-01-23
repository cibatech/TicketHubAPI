import { Prisma, Ticket } from "@prisma/client";

export interface TicketRepository{
    create(data:Prisma.TicketUncheckedCreateInput):Promise<Ticket>
    findById(Id:string):Promise<Ticket | null>
    findByUser(UserId:string):Promise<Ticket[]>
    findByValidated():Promise<Ticket[]>
    findByCompleted():Promise<Ticket[]>
    findByValidatedAndUserId(UserId: string): Promise<Ticket[]>
    findByCompletedAndUserId(UserId: string): Promise<Ticket[]>
    update(Id:string,data:Partial<Ticket>):Promise<Ticket | null>
    delete(Id:string):Promise<Ticket | null>
}