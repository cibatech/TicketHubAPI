import { Prisma, User } from "@prisma/client";

export interface UserRepository{
    create(data:Prisma.UserCreateInput):Promise<User>
    findById(uId:string):Promise<User | null>
    findByEmail(Email:string):Promise<User | null>
    delete(Id:string):Promise<User | null>
    update(Id:string,data:Partial<User>):Promise<User | null>
}