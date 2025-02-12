import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui"
import cors from "@fastify/cors";
import fastify from "fastify";
import { docs } from "./docs/swagger";
import { Router } from "../http/router";
import fastifyCookie from "@fastify/cookie";
import { HOST, PORT } from "./env";

export const app = fastify()

//Just redirects to /docs
app.get("/",async(req,res)=>{
    res.redirect(`/docs`)
})

//Registra a rota
app.register(Router,{
    prefix:"/app"
})

app.register(fastifyJwt,{
    secret:"supersecret"
})

app.register(cors,{ 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});

app.register(fastifyCookie,{
    
})

app.register(fastifySwagger,docs)

app.register(fastifySwaggerUi,{
    routePrefix:"/docs"
})