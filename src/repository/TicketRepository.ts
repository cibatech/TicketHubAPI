import { Prisma, Ticket } from "@prisma/client";

export interface TicketRepository{
    create(data:Prisma.TicketUncheckedCreateInput):Promise<Ticket>
    findById(Id:string):Promise<Ticket | null>
    findByUser(UserId:string):Promise<Ticket[]>
    findByValidation():Promise<Ticket[]>
    findByCompleted():Promise<Ticket[]>
    findByValidatedDate(ValidatedAt: Date):Promise<Ticket[]>
    findByCompletedDate(CompletedAt: Date):Promise<Ticket[]>
    update(Id:string,data:Partial<Ticket>):Promise<Ticket | null>
    delete(Id:string):Promise<Ticket | null>
}