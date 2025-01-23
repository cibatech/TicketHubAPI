
/**
 * Representa um erro de argumento nulo inesperado
 * @extends Error
 * 
 * @param param - O nome do parametro que não deve ser null
 * 
 * @example
 * ```typescript
 * throw new NullArgumentError("id")
 * //Lança: "The param id must not be null or undefined"
 * ```
 * @author Pedro Henryk
 */
export class NullArgumentError extends Error {
    constructor(param: string){
        super(`The param ${param} must not be null or undefined`)
    }
}