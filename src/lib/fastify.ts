import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { docs } from "./docs/swagger";
import { Router } from "../http/router";

export const app = fastify()

//Registra a rota
app.register(Router,{
    prefix:"/app"
})

app.register(fastifyJwt,{
    secret:"supersecret"
})

app.register(fastifySwagger,docs)

app.register(fastifySwaggerUi,{
    routePrefix:"/docs"
})