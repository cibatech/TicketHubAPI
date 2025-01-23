/**
 * Representa um erro lançado quando há uma tentativa de criar uma entidade
 * que já existe no sistema.
 *
 * @extends Error
 *
 * @param Entity - O nome da entidade que já existe.
 * @param Reason - A razão pela qual a entidade não pode ser criada.
 *
 * @example
 * ```typescript
 * throw new EntityAlreadyExists("User", "the email is already in use");
 * // Lança: "Can't create User because the email is already in use"
 * ```
 */
export class EntityAlreadyExists extends Error{
    constructor(Entity:string, Reason:string){
        super(`Can't create ${Entity} because ${Reason}`)
    }
}