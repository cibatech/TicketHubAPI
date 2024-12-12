import { Company, Prisma } from "@prisma/client";
import { CompanyRepository } from "../CompanyReporitory";


export class InMemoryCompanyRepository implements CompanyRepository {
    private companies: Company[] = [];

    async create(data: Prisma.CompanyCreateInput): Promise<Company> {
        const newCompany: Company = {
            Id: (this.companies.length + 1).toString(),
            Name: data.Name,
            CNPJ: data.CNPJ
        };

        this.companies.push(newCompany);
        return newCompany;
    }

    async findById(Id: string): Promise<Company | null> {
        const p = this.companies.find(item => item.Id == Id);
        return p?p:null
    }

    async findByCNPJ(CNPJ: string): Promise<Company | null> {
        return this.companies.find(company => company.CNPJ === CNPJ) || null;
    }

    async findByQuery(query: string): Promise<Company[]> {
        return this.companies.filter(company =>
            company.Name.toLowerCase().includes(query.toLowerCase()) ||
            company.CNPJ.includes(query)
        );
    }

    async delete(id: string): Promise<Company | null> {
        const index = this.companies.findIndex(company => company.Id === id);
        if (index === -1) return null;

        const [deletedCompany] = this.companies.splice(index, 1);
        return deletedCompany;
    }

    async update(id: string, data: Partial<Company>): Promise<Company | null> {
        const company = this.companies.find(company => company.Id === id);
        if (!company) return null;

        const updatedCompany: Company = {
            ...company,
            ...data,
        };

        this.companies = this.companies.map(c => (c.Id === id ? updatedCompany : c));
        return updatedCompany;
    }
}