/**
 * Representa um erro lançado quando ocorre uma falha ao validar uma entidade ou operação.
 *
 * @extends Error
 *
 * @param Reason - A razão específica pela qual a validação falhou.
 *
 * @example
 * ```typescript
 * throw new ValidationError("the provided password is incorrect");
 * // Lança: "Can't validate the user because the provided password is incorrect"
 * ```
 */
export class ValidationError extends Error{
    constructor(Reason:string){
        super(`Can't validate the user because ${Reason}`)
    }
}