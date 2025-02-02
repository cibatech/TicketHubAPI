
/**
 * Erro que representa uma ação proibida, tipo um usuário tentar apagar ticket de outro
 * 
 * @extends Error
 * 
 * @param message - Mensagem de erro a ser exibida
 * 
 * @example
 * ```typescript
 * throw new ForbiddenActionError("UserId does not match ticket's owner Id")
 * //UserId does not match ticket's owner Id"
 * ```
 */
export class ForbiddenActionError extends Error {
    constructor(message: string){
        super(message)
    }
}