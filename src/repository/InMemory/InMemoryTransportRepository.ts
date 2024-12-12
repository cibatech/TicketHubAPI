import { Prisma, Transport } from "@prisma/client";
import { TransportRepository } from "../TransportRepository";
import { randomUUID } from "crypto";

export class InMemoryTransportRepository implements TransportRepository {
    private transports: Transport[] = [];

    async create(data: Prisma.TransportUncheckedCreateInput): Promise<Transport> {
        const newTransport: Transport = {
            Id:randomUUID(),
            Color:data.Color?String(data.Color):null,
            Year:data.Year?new Date(data.Year):null,
            AssignedRoute:String(data.AssignedRoute),
            Company:String(data.Company),
            Model:String(data.Model)
        };

        this.transports.push(newTransport);
        return newTransport;
    }

    async findById(id: string): Promise<Transport | null> {
        return this.transports.find(transport => transport.Id === id) || null;
    }

    async findByCompany(companyId: string): Promise<Transport[]> {
        return this.transports.filter(transport => transport.Company === companyId);
    }

    async findByRoute(routeId: string): Promise<Transport | null> {
        return this.transports.find(transport => transport.AssignedRoute === routeId) || null;
    }

    async delete(id: string): Promise<Transport | null> {
        const index = this.transports.findIndex(transport => transport.Id === id);
        if (index === -1) return null;

        const [deletedTransport] = this.transports.splice(index, 1);
        return deletedTransport;
    }

    async update(id: string, data: Partial<Transport>): Promise<Transport | null> {
        const transport = this.transports.find(transport => transport.Id === id);
        if (!transport) return null;

        const updatedTransport: Transport = {
            ...transport,
            ...data,
        };

        this.transports = this.transports.map(t => (t.Id === id ? updatedTransport : t));
        return updatedTransport;
    }
}
