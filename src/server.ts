import { app } from "./lib/fastify";

 


 app.listen({
    port:3647,
    host:"127.0.0.1"
 },(err,path)=>{
    console.log(err||path)
 })