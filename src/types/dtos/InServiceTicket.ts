export interface TicketInService {
    ValidatedAt: Date | null,
    CompletedAt: Date | null,
    TravelId: string,
    Id: string,
    TotalTicketPrice:number
}