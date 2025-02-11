import { SwaggerOptions } from "@fastify/swagger";
import { json } from "stream/consumers";

export const docs:SwaggerOptions = {
    openapi:{
        info:{
            title:"TicketHub API documentation",
            version:"1.0.1.0",
            description:"Uma API que permite o desenvolvimento de um serviço de compra e venda de passagens em diferentes meios de transporte",
            contact:{
                email:"ciringamen@gmail.com",
                name:"Thierrir Alencar",
                url:""
            },
        },
        tags:[
            {name:"user",description:"Rotas relacionadas ao usuário (CRUD de usuário e autenticação com Login)"},
            {name:"client",description:"Rotas de clientes dentro de uma passagem"},
            {name:"tickets",description:"Rotas de passagens"},
            {name:"travel",description:"Rotas de viagens, normalmente para pesquisa"},
            {name:"auth",description:"Rotas de authenticação de usuário que envolvem o uso de emails."}
        ],
        paths:{
            "app/user/register": {
       "description": "Rota para registro de novos usuários no sistema",
       "post": {
           "tags": ["user"],
           "summary": "Registra um novo usuário",
           "description": "Endpoint responsável pelo registro de novos usuários na plataforma, realizando validações de dados e verificação de duplicidade",
           "operationId": "registerUser",
           "requestBody": {
               "required": true,
               "content": {
                   "application/json": {
                       "schema": {
                           "type": "object",
                           "required": ["Email", "Password", "Nome"],
                           "properties": {
                               "Email": {
                                   "type": "string",
                                   "format": "email",
                                   "description": "Email válido para registro do usuário",
                                   "example": "caroldias@gmail.com",
                                   "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                               },
                               "Password": {
                                   "type": "string",
                                   "description": "Senha do usuário (mínimo 8 caracteres, 1 número, 1 letra maiúscula)",
                                   "minLength": 8,
                                   "example": "Admin123!",
                                   "pattern": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"
                               },
                               "Nome": {
                                   "type": "string",
                                   "description": "Nome do usuário",
                                   "minLength": 3,
                                   "maxLength": 100,
                                   "example": "Carol Dias"
                               },
                               "CPF":{
                                    "type":"string",
                                    "description":"CPF do usuário",
                                    "maxLength":11,
                                    "minLength":11,
                                    "example":"098.900.879-98"
                               },
                               "Age":{
                                    "type":"number",
                                    "description":"Idade do usuário",
                                    "required":["false"],
                                    "example":14
                               }
                           }
                       },
                       "examples": {
                           "default": {
                               "value": {
                                    "Email": "thierriralencar@gmail.com",
                                    "Password": "Admin123!",
                                    "Nome": "Thierrir Alencar",
                                    "CPF":"097-899-567-98"
                              }
                           }
                       }
                   }
               }
           },
           "responses": {
               "201": {
                   "description": "Usuário registrado com sucesso",
                   "content": {
                       "application/json": {
                           "schema": {
                               "type": "object",
                               "properties": {
                                   "Description": {
                                       "type": "string",
                                       "description": "Mensagem de sucesso"
                                   },
                                   "response": {
                                       "type": "object",
                                       "properties": {
                                           "UserName": {
                                               "type": "string",
                                               "description": "Nome do usuário registrado"
                                           }
                                       }
                                   }
                               }
                           },
                           "example": {
                               "Description": "Successfully registered the user",
                               "response": {
                                   "UserName": "Carol Dias",
                                   "userId": "123e4567-e89b-12d3-a456-426614174000"
                               }
                           }
                       }
                   }
               },
               "409": {
                   "description": "UserAlreadyExists - Usuário já cadastrado",
               },
               "500": {
                   "description": "Erro interno do servidor",
               }
           }
       }
            },
            "app/user/profile": {
       "description": "Rota utilizada para retornar o perfil autenticado do usuário usando um token JWT",
       "get": {
           "tags": ["user"],
           "summary": "Obtém perfil do usuário autenticado",
           "description": "Retorna as informações do perfil do usuário baseado no token JWT fornecido no header Authorization",
           "operationId": "getAuthenticatedUserProfile",
           "security": [
               {
                   "bearerAuth": []
               }
           ],
           "parameters": [
               {
                   "in": "header",
                   "name": "Authorization",
                   "required": true,
                   "description": "Token JWT no formato Bearer {token}",
                   "schema": {
                       "type": "string",
                       "pattern": "^Bearer [A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
                   }
               }
           ],
           "responses": {
               "200": {
                   "description": "Perfil do usuário retornado com sucesso",
                   "content": {
                       "application/json": {
                           "schema": {
                               "type": "object",
                               "properties": {
                                   "Description": {
                                       "type": "string",
                                       "description": "Mensagem descritiva do sucesso da operação"
                                   },
                                   "response": {
                                       "type": "object",
                                       "properties": {
                                           "Email": {
                                               "type": "string",
                                               "format": "email",
                                               "description": "Email do usuário"
                                           },
                                           "Nome": {
                                               "type": "string",
                                               "description": "Nome completo do usuário"
                                           }
                                       }
                                   }
                               }
                           },
                           "examples": {
                               "default": {
                                   "value": {
                                       "Description": "Successfully returned user profile",
                                       "response": {
                                           "Email": "admin@gmail.com",
                                           "Nome": "admin",
                                           "createdAt": "2024-01-15T10:30:00Z",
                                           "lastLogin": "2024-01-27T15:45:20Z"
                                       }
                                   }
                               }
                           }
                       }
                   }
               },
               "404": {
                   "description": "Perfil não encontrado",
               },
               "500": {
                   "description": "Erro interno do servidor",
               }
           }
       }
            },
            "app/user/auth/login": {
    "description": "Rota utilizada para autenticação de usuário. Retorna um token JWT que deve ser utilizado para validar o usuário em outras requisições.",
    "patch": {
        "summary": "Autenticar usuário e gerar token JWT.",
        "operationId": "loginUser",
        "tags": ["user"],
        "requestBody": {
            "description": "Corpo da requisição contendo o e-mail e a senha do usuário para autenticação.",
            "required": true,
            "content": {
                "application/json": {
                    "examples": {
                        "example1": {
                            "summary": "Exemplo de autenticação",
                            "value": {
                                "Email": "admin@gmail.com",
                                "Password": "admin123"
                            }
                        }
                    }
                }
            }
        },
        "responses": {
            "200": {
                "description": "Usuário autenticado com sucesso. Retorna o token JWT.",
                "content": {
                    "application/json": {
                        "examples": {
                            "successResponse": {
                                "summary": "Resposta de sucesso",
                                "value": {
                                    "Description": "Successfully logged user-in",
                                    "UserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTU4NmMzMS1mOTc5LTQ5YTUtYTE5Mi0wZDZkMzhkYzhkMzEiLCJpYXQiOjE3Mzc2MzczMTl9.bTvhkjiKndYpeH1-BRqXHm0bkD5oMdDeG8yC1Uwardw"
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                "description": "Requisição inválida. E-mail ou senha ausentes ou em formato incorreto."
            },
            "401": {
                "description": "Não autorizado. Credenciais inválidas (e-mail ou senha incorretos)."
            },
            "500": {
                "description": "Erro interno do servidor. Algo deu errado ao processar a solicitação."
            }
        }
    }
}            ,
            "app/user/delete": {
    "description": "Rota para deletar usuários.",
    "delete": {
        "summary": "Deleta um usuário.",
        "operationId": "deleteUser",
        "parameters": [
            {
                "in": "header",
                "name": "Authorization",
                "required": true,
                "description": "Token JWT no formato Bearer {token}. Necessário para autenticação.",
                "schema": {
                    "type": "string",
                    "pattern": "^Bearer [A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
                }
            }
        ],
        "tags": ["user"],
        "responses": {
            "200": {
                "description": "Usuário deletado com sucesso."
            },
            "400": {
                "description": "Requisição inválida. O token pode estar ausente ou no formato errado."
            },
            "401": {
                "description": "Não autorizado. O token de autenticação é inválido ou expirou."
            },
            "404": {
                "description": "Usuário não encontrado. O ID fornecido não corresponde a nenhum usuário."
            },
            "500": {
                "description": "Erro interno do servidor. Algo deu errado ao tentar processar a solicitação."
            }
        }
    }
            },
            "app/user/update": {
    "description": "Rota utilizada para atualizar informações de perfil de um usuário.",
    "put": {
        "summary": "Atualiza informações do perfil de um usuário.",
        "operationId": "updateUser",
        "tags": ["user"],
        "requestBody": {
            "description": "Objeto JSON contendo os dados que serão atualizados no perfil do usuário.",
            "required": true,
            "content": {
                "application/json": {
                    "examples": {
                        "example1": {
                            "summary": "Atualizar nome do usuário",
                            "value": {
                                "Nome": "Alexander"
                            }
                        },
                        "example2": {
                            "summary": "Atualizar e-mail do usuário",
                            "value": {
                                "Email": "Alexander@gmail.com"
                            }
                        }
                    }
                }
            }
        },
        "parameters": [
            {
                "in": "header",
                "name": "Authorization",
                "required": true,
                "description": "Token JWT no formato Bearer {token}. Necessário para autenticação.",
                "schema": {
                    "type": "string",
                    "pattern": "^Bearer [A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$"
                }
            }
        ],
        "responses": {
            "200": {
                "description": "Usuário atualizado com sucesso.",
                "content": {
                    "application/json": {
                        "examples": {
                            "successResponse": {
                                "summary": "Resposta de sucesso",
                                "value": {
                                    "Description": "Successfully updated user",
                                    "response": {
                                        "Email": "admin@gmail.com",
                                        "Nome": "Alexander",
                                        "Password": "$2a$09$r64NcgqHv2XDvh/gzW8ALuPCK3cSfpIztLzNuj61M0m4PkAxb8iLC"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                "description": "Requisição inválida. O corpo da requisição pode estar ausente ou incorreto."
            },
            "401": {
                "description": "Não autorizado. O token de autenticação é inválido ou expirou."
            },
            "404": {
                "description": "Usuário não encontrado. O ID fornecido não corresponde a nenhum usuário."
            },
            "500": {
                "description": "Erro interno do servidor. Algo deu errado ao processar a solicitação."
            }
        }
    }
            },
            "app/ticket/create":{
                post:{
                    tags:["tickets"],
                    summary:"Rota utilizada para registrar um ticket",
                    description:"Rota utilizada para registrar um ticket recebendo como parametros um tokenJWT de usuário e um registro de viagem",
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            summary:"Bearer com token JWT"
                        }
                    ],
                    requestBody:{
                        content:{
                            "application/json":{
                                example:
                                    {
                                        "TravelId":"1a0881e4-dbde-478c-8c62-76c86600c15b",
                                        "CompanionsList":[
                                            {
                                                "Age":22,
                                                "CPF":"909,-809-789-90",
                                                "Name":"Jonnathan Doe"
                                            }
                                        ]
                                    }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Ticket registrado para o usuário com sucesso. Aguardando validação do ticket",
                            summary:"Representa um sucesso no processo de registro do Ticket",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            description:"exemplo de resposta para a criação de um ticket",
                                            value:JSON.parse(`
                                                    {
    "Description": "Created Ticket for user",
    "Ticket": {
        "Id": "4bfa3738-3c48-4c24-a9e8-01e063f8c3de",
        "ValidatedAt": null,
        "CompletedAt": null,
        "TravelId": "1a0881e4-dbde-478c-8c62-76c86600c15b"
    }
}
                                                `)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "app/ticket/list":{
                get:{
                    summary:"Retorna a lista de tickets de um usuário",
                    externalDocs:{
                        url:"https://github.com/cibatech/TicketHubAPI/blob/dev/docs/documentation.md",
                        description:"Documentação sobre os tickets pode ser encontradas a seguir"
                    },
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            summary:"Bearer com token JWT"
                        }
                    ],
                    tags:["tickets"],
                    responses:{
                        200:{
                            description:"Sucesso no chamado da rota ",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            description:"Retorno normal da rota",
                                            value:JSON.parse(`
                                                    {
                                                    "Description": "Returned Ticket List",
                                                    "Ticket": [
                                                        {
                                                            "ValidatedAt": null,
                                                            "CompletedAt": null,
                                                            "TravelId": "1a0881e4-dbde-478c-8c62-76c86600c15b",
                                                            "Id": "4bfa3738-3c48-4c24-a9e8-01e063f8c3de"
                                                        }
                                                    ]
                                                }
                                                `)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "app/ticket/cancel":{
                get:{
                    summary:"Cancela um Ticket",
                    externalDocs:{
                        url:"https://github.com/cibatech/TicketHubAPI/blob/dev/docs/documentation.md",
                        description:"Documentação sobre os tickets pode ser encontradas a seguir"
                    },
                    parameters:[
                        {
                            name:"deletedTicket",
                            in:"query",
                            description:"Id do bilhete que se deseja deletar",
                            required:true,
                            summary:"ID do bilhete"
                        }
                    ],
                    tags:["tickets"],
                    responses:{
                        200:{
                            description:"Sucesso no chamado da rota ",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            description:"Retorno normal da rota",
                                            value:""
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"Não existe nenhum bilhete com esse ID"
                        }
                    }
                }
            },
            "app/client/create":{
                description:"Rota utilizada para registrar um cliente dentro de um ticket",
                post:{
                    description:"Rota utilizada para registrar um cliente dentro de um ticket",
                    summary:"Registro de Cliente em um ticket",
                    tags:["client"],
                    requestBody:{
                        content:{
                            "application/json":{
                                example:JSON.parse(`
                                    {
                                        "TicketId":"4bfa3738-3c48-4c24-a9e8-01e063f8c3de",
                                        "Age":27,
                                        "CPF":"096-399-879-09",
                                        "IsCompanion":true
                                    }
                                        `)
                            }
                        }
                    },
                    responses:{
                        201:{
                                description:"Registrado com sucesso",
                                content:{
                                "application/json":{
                                    example:JSON.parse(`
                                            {
    "Description": "Cliente adicionado ao ticket",
    "Client": {
        "IsCompanion": true,
        "PersonName": "Carol Dias",
        "Age": 27,
        "CPF": "096-399-879-09",
        "Id": "f33e75fb-8d2f-4c86-a17c-fb3ca546cf16"
    }
}
                                        `)
                                }
                                }
                        },
                        404:{
                            description:"Entidade não encontrada"
                        },
                        500:{
                            description:"Erro desconhecido. Reportar ao dev"
                        }
                    },
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            summary:"Bearer com token JWT"
                        }
                    ]
                }
            },
            "app/client/ticket/:TicketId":{
                description:"Rota utilizada para retornar a lista de clientes dentro de um ticket",
                get:{
                    description:"Rota utilizada para retornar a lista de clientes dentro de um ticket",
                    summary:"Lista de Clientes em um ticket",
                    tags:["client"],
                    parameters:[
                        {
                            name:"TicketId",
                            in:"query",
                            description:"O Id do ticket que se deseja retornar",
                            summary:"Id do Ticket",
                            required:true,
                        }
                    ],
                    responses:{
                        200:{
                                description:"Registrado com sucesso",
                                content:{
                                "application/json":{
                                    example:JSON.parse(`
{
    "Description": "Lista de clientes retornada com sucesso",
    "Client": [
        {
            "IsCompanion": true,
            "PersonName": "Carol Dias",
            "Age": 27,
            "CPF": "096-399-879-09",
            "Id": "f33e75fb-8d2f-4c86-a17c-fb3ca546cf16"
        }
    ]
}
                                        `)
                                }
                                }
                        },
                        404:{
                            description:"Entidade não encontrada"
                        },
                        500:{
                            description:"Erro desconhecido. Reportar ao dev"
                        }
                    }
                }
            },
            "app/client/delete/:Id":{
                description:"Rota utilizada para deletar um cliente de dentro de um ticket",
                delete:{
                    description:"Rota utilizada para deletar um cliente de dentro de um ticket",
                    summary:"remover um cliente de um ticket",
                    tags:["client"],
                    responses:{
                        200:{
                                description:"removido com sucesso",
                                content:{
                                "application/json":{
                                    example:JSON.parse(`
{
    "Description": "Cliente removido do ticket",
    "Client": {
        "IsCompanion": true,
        "PersonName": "Carol Dias",
        "Age": 27,
        "CPF": "096-399-879-09",
        "Id": "f33e75fb-8d2f-4c86-a17c-fb3ca546cf16"
    }
}
                                        `)
                                }
                                }
                        },
                        404:{
                            description:"Entidade não encontrada"
                        },
                        500:{
                            description:"Erro desconhecido. Reportar ao dev"
                        },
                        401:{
                            description:"O usuário nao está autorizado a remover este cliente",
                            summary:"Erro de credenciais"
                        }
                    },
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            schema:{
                                type:"string"
                            },
                            summary:"Bearer com token JWT"
                        },
                        {
                            name:"Id",
                            in:"query",
                            required:true,
                            description:"Id do cliente que se deseja remover",
                            summary:"Id do cliente",
                            schema:{
                                type:"string"
                            }
                        }
                    ]
                }
            },
            "app/cliente/update/:Id":{
                description:"Rota utilizada para atualizar um cliente dentro de um ticket",
                put:{
                    description:"Rota utilizada para atualizar um cliente dentro de um ticket",
                    summary:"atualizar um Cliente em um ticket",
                    tags:["client"],
                    requestBody:{
                        content:{
                            "application/json":{
                                examples:{
                                    Idade:{
                                        description:"Atualizar idade",
                                        value:JSON.parse(`
                                                                                        {
                                                "Age":28
                                            }
                                            `)
                                    },
                                    CPF:{
                                        description:"Atualizar CPF",
                                        value:JSON.parse(`
                                                {
    "CPF":"339-126-123-98"
}
                                            `)
                                    },
                                    Nome:{
                                        description:"Atualizar o nome",
                                        value:JSON.parse(`
                                                {
    "PersonName":"Carol Dias Bueno"
}
                                            `)
                                    }
                                    
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                                description:"atualizado com sucesso",
                                content:{
                                "application/json":{
                                    example:JSON.parse(`
{
    "Description": "Cliente atualizado com sucesso",
    "Client": {
        "IsCompanion": true,
        "PersonName": "Carol Dias",
        "Age": 28,
        "CPF": "096-399-879-09",
        "Id": "eaa79328-aba4-40a0-9b8c-9c5fb8d8c536"
    }
}
                                        `)
                                }
                                }
                        },
                        404:{
                            description:"Entidade não encontrada"
                        },
                        500:{
                            description:"Erro desconhecido. Reportar ao dev"
                        },
                        401:{
                            description:"O usuário nao está autorizado a remover este cliente",
                            summary:"Erro de credenciais"
                        }
                    },
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            summary:"Bearer com token JWT"
                        },
                        {
                            name:"Id",
                            in:"query",
                            required:true,
                            description:"Id do cliente que se deseja remover",
                            summary:"Id do cliente",
                            schema:{
                                type:"string"
                            }
                        }
                    ]
                }
            },
            "app/ticket/info/:Id":{
                get:{
                    summary:"Retorna as Informações de um ticket incluindo a lista de passageiros",
                    externalDocs:{
                        url:"https://github.com/cibatech/TicketHubAPI/blob/dev/docs/documentation.md",
                        description:"Documentação sobre os tickets pode ser encontradas a seguir"
                    },
                    parameters:[
                        {
                            name:"UserID",
                            in:"bearer",
                            description:"Token JWT contendo o ID do usuário",
                            required:true,
                            summary:"Bearer com token JWT"
                        },
                        {
                            name:"Id",
                            in:"query",
                            description:"Id do ticket",
                            required:true,
                            summary:"Id do ticket"
                        }
                    ],
                    tags:["tickets"],
                    responses:{
                        200:{
                            description:"Sucesso no chamado da rota ",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            description:"Retorno normal da rota",
                                            value:JSON.parse(`
                                                    {
    "Description": "Informações do ticket retornadas com sucesso",
    "response": {
        "ticket": {
            "ValidatedAt": null,
            "CompletedAt": null,
            "TravelId": "6143e284-cce8-47d0-9ab8-8d5d5d3fdc3c",
            "Id": "0edfe017-1825-4f0c-aa37-ecab39a9eb2e",
            "TotalTicketPrice": 0
        },
        "ClientList": [
            {
                "Id": "1e22ed10-0d3c-4c47-a4a8-b24fd0e46325",
                "OwnerId": "8d32c275-acba-4d66-825b-dc9ad6858d01",
                "PersonName": "Carol Dias",
                "CPF": "097-899-567-98",
                "Age": 18,
                "IsCompanion": false,
                "TicketId": "0edfe017-1825-4f0c-aa37-ecab39a9eb2e"
            }
        ]
    }
}
                                                `)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "app/travel/filter":{
                description:"Retorna a lista de viagens a partir de filtros",
                patch:{
                    description:"Retorna a lista de viagens a partir de filtros",
                    summary:"Lista de viagens filtrada",
                    requestBody:{
                        description:"Corpo da requisição, utilizado no patch para retornar a lista de viagens",
                        content:{
                            "application/json":{
                                examples:{
                                    example1:{
                                        description:"Pesquisa Com diversos parametros",
                                        value:JSON.parse(`
                                                        {
                                                            "RouteKind":"Air",
                                                            "afterDay":"Data",
                                                            "beforeDay":"data",
                                                            "BeginningPointId":"Id",
                                                            "FinishingPointId":"Id",
                                                            "Page":"number",
                                                            "minPrice":0,
                                                            "maxPrice":9
                                                        }
                                            `),
                                    }
                                }
                            }
                        },
                        required:true,
                        summary:"Corpo com parametros de pesquisa"
                    },
                    tags:["travel"],  
                    responses:{
                        200:{
                            description:"Lista retornada com sucesso",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            value:JSON.parse(`
{
    "Description": "Lista de Viagens retornada e filtrada com sucesso",
    "response": {
        "response": [
            {
                "CompanyName": "Lang LLC",
                "TravelBasePrice": 8773,
                "TravelDay": "2025-04-04T20:20:39.638Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "d030ff41-0328-4501-bcbd-9d876e131345",
                    "Name": "New Nathanaelton",
                    "UF": "Maine",
                    "Description": "Conatus conor vulgivagus sodalitas undique stipes sortitus concedo. Causa cubicularis theca molestiae arbustum caterva beatus candidus theatrum clamo. Alter ventus nostrum cetera sono.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "5392e37a-0b55-4dd8-a8d3-d3e8fbb74a50",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "c0749a20-d8ee-4258-8ee0-8296a5421130",
                    "Name": "East Nestor",
                    "UF": "Nebraska",
                    "Description": "Virgo delectus repellendus beatus depraedor acquiro. Ulciscor corrumpo antea verecundia sublime voco sit sumptus assumenda. Bardus cibo attollo.",
                    "Ports": false,
                    "Railroads": true,
                    "Airports": true,
                    "route_id": "aa6ccf18-9c82-47c3-8801-fff3517af771",
                    "order": 0
                },
                "Id": "018da33d-c6fa-4755-ab67-bce265120bc0"
            },
            {
                "CompanyName": "Hilpert, Rolfson and VonRueden",
                "TravelBasePrice": 6080,
                "TravelDay": "2025-08-09T09:40:51.834Z",
                "Transport": "Rail",
                "BeginningPoint": {
                    "Id": "ddd0007d-17fc-44c7-8b56-717c12d908ac",
                    "Name": "Adamston",
                    "UF": "Delaware",
                    "Description": "Contabesco virtus vivo. Virga cunabula vulgivagus compono turbo adversus cunabula catena. Ulciscor callide terminatio patior.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "1e75d5a3-0232-408d-aafb-69618b99e802",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "f003bfd6-7b86-49ac-93e9-7230053ac1f7",
                    "Name": "Pittsburgh",
                    "UF": "Arkansas",
                    "Description": "Vulnero terga adinventitias cohaero vitium celo praesentium atrocitas. Coniuratio alter utroque bonus. Usus creber vito.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": false,
                    "route_id": "494a568a-a1fc-4e52-bb4f-39b52a4ab869",
                    "order": 0
                },
                "Id": "05cc2b1d-1365-4a83-907a-3249e52e228e"
            },
            {
                "CompanyName": "Schneider, Bashirian and Herman",
                "TravelBasePrice": 5087,
                "TravelDay": "2025-02-09T23:18:17.502Z",
                "Transport": "Naval",
                "BeginningPoint": {
                    "Id": "59804ceb-8a70-44d6-a32c-230857b4e596",
                    "Name": "Beaumont",
                    "UF": "Wyoming",
                    "Description": "Cerno vox illo tertius arx aegrus. Perferendis averto acsi adinventitias absens sum vulgo cariosus. Speculum stultus laborum cogito demum amo vilitas ab.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": true,
                    "route_id": "96575d8e-3cbb-4fad-8d27-39af64031a0f",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "d0057de7-2e01-4b06-827c-58b72ac0ae67",
                    "Name": "Huelberg",
                    "UF": "Pennsylvania",
                    "Description": "Corrumpo statua videlicet nobis careo. Vespillo cruentus ver aranea amplus admoveo concido ullus cogito. Ancilla bis adversus vel sperno utilis tenax uredo.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": false,
                    "route_id": "adef8a00-c75e-4fe9-9162-56b5e306c889",
                    "order": 0
                },
                "Id": "0ae03bc4-87d8-4330-ba70-4662e8cdda3f"
            },
            {
                "CompanyName": "Bins Group",
                "TravelBasePrice": 1834,
                "TravelDay": "2025-09-22T12:26:10.332Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "21fbbbc2-640e-4485-b59a-2b66c9f70a68",
                    "Name": "Clifton",
                    "UF": "Missouri",
                    "Description": "Curis ademptio necessitatibus concedo sumo bellum. Velum soleo aqua tremo coerceo eum aufero cultura crur. Comis ancilla demergo sperno beatae contabesco ventosus perspiciatis degusto.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": true,
                    "route_id": "73417278-82fc-4752-a53d-d89ac0d68828",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "b2a11530-1d85-4a99-ac82-b92449d13fff",
                    "Name": "Fort Dimitri",
                    "UF": "Minnesota",
                    "Description": "Truculenter deserunt unde caritas sordeo enim acies ancilla incidunt desolo. Vulgivagus adstringo altus strenuus ceno substantia mollitia. Xiphias decor tergum cum deleo cur verumtamen urbanus.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": false,
                    "route_id": "9f46d217-74a9-49fc-94a2-0adaad61547a",
                    "order": 0
                },
                "Id": "2f58e5d3-28af-43ce-a5c5-24ccd2a2b0bf"
            },
            {
                "CompanyName": "Wunsch - D'Amore",
                "TravelBasePrice": 949,
                "TravelDay": "2026-01-14T12:34:04.465Z",
                "Transport": "Air",
                "BeginningPoint": {
                    "Id": "882e3688-a116-4980-ba52-f8c2b4c59024",
                    "Name": "Lake Sophiechester",
                    "UF": "Arizona",
                    "Description": "Soleo subiungo causa aut spoliatio vos talio collum. Inflammatio quisquam communis. Amitto tondeo unus adipisci agnosco aspicio.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": true,
                    "route_id": "f70034c1-52b1-404b-bcef-541e903cb1df",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "3b29336e-9f44-44b8-b7ba-985f73882791",
                    "Name": "North Pearl",
                    "UF": "Washington",
                    "Description": "Quasi adsum validus. Videlicet combibo tabella angelus aro maiores peior. Approbo velit textus vito conatus natus ullam amoveo quos surculus.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "14adcab8-caa8-4e4e-ace9-97847d5a4203",
                    "order": 0
                },
                "Id": "37442266-6ea3-484d-86ea-0d192f99eddc"
            },
            {
                "CompanyName": "Sipes, Sawayn and Littel",
                "TravelBasePrice": 3185,
                "TravelDay": "2025-09-28T20:15:29.976Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "682ae436-e216-41c7-b24f-4964ef95b38d",
                    "Name": "South Candace",
                    "UF": "Arkansas",
                    "Description": "Cura arguo autus degero. Succedo atque agnitio angustus adduco condico valens. Decor conscendo explicabo ter modi color aveho pecus vinum.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": true,
                    "route_id": "09425c9c-c400-4d14-bda1-419de12509e3",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "cbb5a0a1-2685-40ad-a5a3-490c2b2d02b4",
                    "Name": "North Deon",
                    "UF": "Nebraska",
                    "Description": "Deficio subito nihil crur concido. Amo arca tunc a error arma adflicto creptio blanditiis cur. Trepide censura coruscus alius.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "e88d864b-c639-466c-89a2-e5099cc0a18b",
                    "order": 0
                },
                "Id": "731f21cb-1eb6-471e-ad7d-7564a250ac52"
            },
            {
                "CompanyName": "Cremin Group",
                "TravelBasePrice": 283,
                "TravelDay": "2025-10-30T12:27:57.421Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "7094b605-8ce2-4191-9823-6762a7b3cd3a",
                    "Name": "Schusterfurt",
                    "UF": "Michigan",
                    "Description": "Cupiditate tametsi amet adficio comminor vulnus. Solitudo clibanus bellum spectaculum. Magni ait arca illum suffoco hic soluta deporto victoria.",
                    "Ports": false,
                    "Railroads": true,
                    "Airports": true,
                    "route_id": "809df634-0f0c-4c1a-b8c3-ed25995bc564",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "ddd0007d-17fc-44c7-8b56-717c12d908ac",
                    "Name": "Adamston",
                    "UF": "Delaware",
                    "Description": "Contabesco virtus vivo. Virga cunabula vulgivagus compono turbo adversus cunabula catena. Ulciscor callide terminatio patior.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "1e75d5a3-0232-408d-aafb-69618b99e802",
                    "order": 0
                },
                "Id": "73d5003a-b985-4d48-8943-6d86627822c0"
            },
            {
                "CompanyName": "Krajcik - Stamm",
                "TravelBasePrice": 962,
                "TravelDay": "2025-12-29T13:51:53.262Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "c0749a20-d8ee-4258-8ee0-8296a5421130",
                    "Name": "East Nestor",
                    "UF": "Nebraska",
                    "Description": "Virgo delectus repellendus beatus depraedor acquiro. Ulciscor corrumpo antea verecundia sublime voco sit sumptus assumenda. Bardus cibo attollo.",
                    "Ports": false,
                    "Railroads": true,
                    "Airports": true,
                    "route_id": "aa6ccf18-9c82-47c3-8801-fff3517af771",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "4976fdd1-671b-416d-a28f-89f0b63fcb16",
                    "Name": "West Lauryborough",
                    "UF": "Texas",
                    "Description": "Anser tempus statim arbor tyrannus demonstro capto vitium. Abeo adversus ullam tumultus quod admoveo vinitor valeo cavus. Cometes acervus nisi arx sublime.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "7f746c4c-24b0-4a64-bb0e-1dcbc5dd233a",
                    "order": 0
                },
                "Id": "81edf4ef-be12-4429-ab21-8ed4aef15526"
            },
            {
                "CompanyName": "Davis - Reinger",
                "TravelBasePrice": 2709,
                "TravelDay": "2025-06-27T04:26:09.287Z",
                "Transport": "Land",
                "BeginningPoint": {
                    "Id": "4976fdd1-671b-416d-a28f-89f0b63fcb16",
                    "Name": "West Lauryborough",
                    "UF": "Texas",
                    "Description": "Anser tempus statim arbor tyrannus demonstro capto vitium. Abeo adversus ullam tumultus quod admoveo vinitor valeo cavus. Cometes acervus nisi arx sublime.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "7f746c4c-24b0-4a64-bb0e-1dcbc5dd233a",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "aaa53808-ceff-40a7-bb38-f7a02dc6e2a9",
                    "Name": "New Jaqueline",
                    "UF": "Nevada",
                    "Description": "Ventito defleo vigilo deduco coerceo cuppedia bellum voluptates utpote. Libero tyrannus tristis verecundia vilis aggredior decor solio aptus deorsum. Vulgus coaegresco quidem.",
                    "Ports": true,
                    "Railroads": true,
                    "Airports": false,
                    "route_id": "1a050987-d35a-4c10-a540-6e17a9fbff38",
                    "order": 0
                },
                "Id": "b8070c62-30df-4d02-8f6e-284010629057"
            },
            {
                "CompanyName": "Schulist - Marks",
                "TravelBasePrice": 8252,
                "TravelDay": "2025-06-10T11:04:28.901Z",
                "Transport": "Air",
                "BeginningPoint": {
                    "Id": "3b29336e-9f44-44b8-b7ba-985f73882791",
                    "Name": "North Pearl",
                    "UF": "Washington",
                    "Description": "Quasi adsum validus. Videlicet combibo tabella angelus aro maiores peior. Approbo velit textus vito conatus natus ullam amoveo quos surculus.",
                    "Ports": false,
                    "Railroads": false,
                    "Airports": false,
                    "route_id": "14adcab8-caa8-4e4e-ace9-97847d5a4203",
                    "order": 0
                },
                "FinishingPoint": {
                    "Id": "74d26c81-92ad-43c3-94a9-7d9c9023cafc",
                    "Name": "Thielville",
                    "UF": "Delaware",
                    "Description": "Decet aranea adiuvo delectus tabula curiositas vapulus occaecati tot vis. Terror magni arbustum adsuesco degenero tutamen argentum voluptas balbus volo. Qui celebrer tollo.",
                    "Ports": false,
                    "Railroads": true,
                    "Airports": false,
                    "route_id": "92732108-7924-4c12-bb2f-5eab3d08437b",
                    "order": 0
                },
                "Id": "bc3bb85b-99b8-43ae-93f7-539e897c7ef5"
            }
        ],
        "totalTravels": 10,
        "totalPages": 2
    },
    "config": {}
}
                                                `)
                                        }
                                    }
                                }
                            }
                        },
                        404:{
                            description:"Entidade nao encontrada (possivelmente um ponto da rota)"
                        },
                        500:{
                            description:"Erro desconhecido"
                        }
                    }
                }
            },
            "app/auth/password": {
                "get": {
                    "description": "Rota utilizada para enviar um código de email para o usuário",
                    "tags": ["auth"],
                    "parameters": [
                    {
                        "in": "query",
                        "name": "email",
                        "description": "Email do usuário que receberá o código",
                        "schema": {
                        "type": "string",
                        "format": "email",
                        "example": "johix89951@prorsd.com"
                        },
                        "required": true
                    }
                    ],
                    "responses": {
                    "200": {
                        "description": "Código enviado com sucesso",
                        "content": {
                        "application/json": {
                            "examples": {
                            "example1": {
                                "value": {
                                "description": "Email enviado, incluindo código de recuperação",
                                "response": "106-698-308"
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                },
                "put": {
                    "tags": ["auth"],
                    "summary": "Rota que atualiza a senha após email de validação",
                    "description": "Rota utilizada para atualizar a senha de um usuário fornecendo o código enviado por e-mail",
                    "requestBody": {
                    "description": "Corpo necessário para atualizar a senha",
                    "required": true,
                    "content": {
                        "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                            "refCode": {
                                "type": "string",
                                "description": "Código enviado por email para validar a alteração de senha",
                                "example": "106-698-308"
                            },
                            "newPassword": {
                                "type": "string",
                                "description": "Nova senha definida pelo usuário",
                                "example": "Th123"
                            }
                            },
                            "required": ["refCode", "newPassword"]
                        }
                        }
                    }
                    },
                    "responses": {
                    "200": {
                        "description": "Senha alterada com sucesso",
                        "content": {
                        "application/json": {
                            "examples": {
                            "success": {
                                "value": {
                                "message": "Senha atualizada com sucesso"
                                }
                            }
                            }
                        }
                        }
                    },
                    "400": {
                        "description": "Erro ao atualizar senha (código inválido ou expirado)",
                        "content": {
                        "application/json": {
                            "examples": {
                            "invalidCode": {
                                "value": {
                                "error": "Código de recuperação inválido ou expirado"
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
        }
                
    }
}