export interface UserInService{
    Nome: string;
    Email: string;
    Password: string;
}

export interface TicketInService {
    ValidatedAt: Date | null,
    CompletedAt: Date | null,
    TravelId: string,
}