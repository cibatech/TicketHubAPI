import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { randomUUID } from "crypto";


export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const newUser: User = {
            Id: randomUUID(),
            Email: data.Email,
            Nome: data.Nome,
            Password: data.Password,
        };

        this.users.push(newUser);
        return newUser;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.Id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.Email === email) || null;
    }

    async delete(id: string): Promise<User | null> {
        const index = this.users.findIndex(user => user.Id === id);
        if (index === -1) return null;

        const [deletedUser] = this.users.splice(index, 1);
        return deletedUser;
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        const user = this.users.find(user => user.Id === id);
        if (!user) return null;

        const updatedUser: User = {
            ...user,
            ...data,
        };

        this.users = this.users.map(u => (u.Id === id ? updatedUser : u));
        return updatedUser;
    }
}
