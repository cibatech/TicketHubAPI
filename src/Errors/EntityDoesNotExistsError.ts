export class EntityDoesNotExistsErro extends Error{
    constructor(Entity:string){
        super(`There's already a ${Entity} with this unique key key`);
    }
}