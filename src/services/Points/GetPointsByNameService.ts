import { PointRepository } from "../../repository/PointRepository";

export class GetPointsByNameUseCase {
    constructor(private PointRepo: PointRepository){}
    async execute(Name: string){
        const points = await this.PointRepo.queryByName(Name)
        const response = Promise.all(
            points.map((point) => {
                return point
            })
        )
        return response
    }
}