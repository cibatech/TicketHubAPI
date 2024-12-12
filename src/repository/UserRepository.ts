import { Prisma, User } from "@prisma/client";

export interface UserRepository{
    create(data:Prisma.UserCreateInput):Promise<User>
    findById(uId:string):Promise<User>
    findByEmail(Email:string):Promise<User>
    delete(Id:string):Promise<User>
    update(Id:string):Promise<User>
}