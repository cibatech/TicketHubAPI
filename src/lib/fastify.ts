import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { docs } from "./docs/swagger";

export const app = fastify()

app.register(fastifyJwt,{
    secret:"supersecret"
})

app.register(fastifySwagger,docs)
app.register(fastifySwaggerUi,{
    baseDir:"/docs"
})