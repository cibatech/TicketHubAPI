import { HOST, PORT } from "./lib/env";
import { app } from "./lib/fastify";

 app.listen({
    port:Number(PORT),
    host:HOST
 },(err,path)=>{
    console.log(err||path)
 })