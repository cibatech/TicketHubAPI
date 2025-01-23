import { Company, Prisma } from "@prisma/client";

export interface CompanyRepository{
    create(data:Prisma.CompanyCreateInput):Promise<Company>
    findById(Id:string):Promise<Company | null>
    findByCNPJ(CNPJ:string):Promise<Company | null>
    findByQuery(Query:String):Promise<Company[]>
    delete(id:string):Promise<Company | null>
    update(id:string,data:Partial<Company>):Promise<Company | null>
}