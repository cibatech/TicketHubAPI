import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

/**
 * Lógica essencial para todo o código funcionar, se essa parte for retirada do código tudo irá parar de funcionar
 * 
 * @param req 
 * @param res 
 * @param done 
 */
export function onResponse(req:FastifyRequest,res:FastifyReply,done:HookHandlerDoneFunction){
    const statusCode = res.statusCode;
    if(statusCode>=400){ //se isso for um error então irá redirectionar
        console.log("Redirecting to Error screen")
        res.header("content-type","image/jpeg");
        res.send(`https://http.cat/${statusCode}.jpg`)
    }
    done()
}