import { ClientsTicket } from "@prisma/client";
import { InServiceClientsTickets } from "../types/dtos/InServiceClientTicket";

export function FormatToInServiceClientsTicket(data: ClientsTicket): InServiceClientsTickets {
    return {
        IsCompanion: data.IsCompanion,
        PersonName: data.PersonName,
        Age: data.Age,
        CPF: data.CPF,
        Id: data.Id
    }
}

export function FormatToInServiceClientsTickets(data: ClientsTicket[]): InServiceClientsTickets[] {
    return data.map((clientTicket) => {
        return {
            IsCompanion: clientTicket.IsCompanion,
            PersonName: clientTicket.PersonName,
            Age: clientTicket.Age,
            CPF: clientTicket.CPF,
            Id: clientTicket.Id
        }
    })
}