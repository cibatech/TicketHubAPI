/**
 * Representa um erro lançado quando uma entidade não é encontrado
 * 
 * @extends Error
 * 
 * @param Entity - O nome da entidade
 * 
 * @example
 * ```typescript
 * throw new EntityNotFoundError("User")
 * //The User was not found
 * ```
 */
export class EntityNotFoundError extends Error {
    constructor(Entity: string){
        super(`The ${Entity} was not found`)
    }
}