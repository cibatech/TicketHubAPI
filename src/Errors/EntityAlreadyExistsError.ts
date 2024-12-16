export class EntityAlreadyExists extends Error{
    constructor(Entity:string, Reason:string){
        super(`Can't create ${Entity} because ${Reason}`)
    }
}