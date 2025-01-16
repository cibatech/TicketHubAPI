import { HOST, PORT } from "./lib/env";
import { app } from "./lib/fastify";
import {Router} from "./http/router"
 
//Registra a rota
app.register(Router)

 app.listen({
    port:Number(PORT),
    host:HOST
 },(err,path)=>{
    console.log(err||path)
 })