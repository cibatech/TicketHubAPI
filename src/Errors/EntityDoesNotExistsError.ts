/**
 * Representa um erro lançado quando uma entidade necessária não é encontrada no sistema.
 *
 * @extends Error
 *
 * @param Entity - O nome da entidade que não foi encontrada.
 *
 * @example
 * ```typescript
 * throw new EntityDoesNotExistsErro("User");
 * // Lança: "The User does not exists"
 * ```
 */
export class EntityDoesNotExistsError extends Error{
    constructor(Entity:string){
        super(`The ${Entity} does not exists`);
    }
}