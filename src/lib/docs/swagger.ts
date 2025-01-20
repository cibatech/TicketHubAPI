import { SwaggerOptions } from "@fastify/swagger";

export const docs:SwaggerOptions = {
    openapi:{
        info:{
            title:"TicketHub API documentation",
            version:"1.0.0.0",
            description:"Uma API que permite o desenvolvimento de um serviço de compra e venda de passagens em diferentes meio de transporte",
            contact:{
                email:"ciringamen@gmail.com",
                name:"Thierrir Alencar",
                url:""
            },
        },
        tags:[
            {name:"app",description:"All the app routes"},
            {name:"user",description:"Rotas relacionadas ao usuário (CRUD de usuário e autenticação com Login)"}
        ],
        

    }
}