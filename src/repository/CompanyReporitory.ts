import { Company, Prisma } from "@prisma/client";

export interface CompanyRepository{
    create(data:Prisma.CompanyCreateInput):Promise<Company>
    findById(Id:Company):Promise<Company>
    findByCNPJ(CNPJ:string):Promise<Company>
    findByQuery(Query:String):Promise<Company[]>
    delete(id:string):Promise<Company>
    update(id:string,data:Partial<Company>):Promise<Company>
}