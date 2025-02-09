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
            {name:"travel",description:"Rotas de viagens, normalmente para pesquisa"}
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
                                                            "Page":"number"
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
    "response": [
        {
            "CompanyName": "Pagac - Green",
            "TravelBasePrice": 7010,
            "TravelDay": "2025-07-03T23:54:46.132Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "b9428e14-077e-4c57-9426-281528cde730",
                "Name": "New Madison",
                "UF": "Idaho",
                "Description": "Thalassinus fugit adipiscor terra. Civitas certus tamen adstringo absum cursus voluptates subiungo odit. Aggredior testimonium depulso carbo ulciscor decumbo dedecor casus.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "14c8fbaf-b854-48dc-af73-235f848b3720",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "695035e3-b5d0-4dd1-a2cb-8b1bd16d24c8",
                "Name": "Lake Parker",
                "UF": "Arkansas",
                "Description": "Deporto maxime canis dedecor strues a. Saepe tabella dolorum aliqua tamquam provident ultio. Crastinus deripio tutamen.",
                "Ports": true,
                "Railroads": true,
                "Airports": false,
                "route_id": "b022d78c-ad62-4138-8bf4-ac58cdf5f98b",
                "order": 0
            },
            "Id": "002012fe-b9e8-402a-8607-d97f7d46fb3c"
        },
        {
            "CompanyName": "Kozey - Beer",
            "TravelBasePrice": 9287,
            "TravelDay": "2025-02-09T20:29:19.435Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "ccad8795-b7e3-459c-8335-4558e7a096ed",
                "Name": "Marianchester",
                "UF": "Alaska",
                "Description": "Utroque comes paulatim apto vestrum articulus fugit sol. Repellendus totidem venia ulterius amita nihil tamen earum laboriosam ascit. Tutamen abstergo inflammatio aeneus trado.",
                "Ports": false,
                "Railroads": false,
                "Airports": true,
                "route_id": "7312fe1c-cd9e-41d0-9b9f-27b4c9518eb3",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "da03c207-a7ed-4998-a615-a5aed5e3670b",
                "Name": "Beulahborough",
                "UF": "Mississippi",
                "Description": "Appositus caelestis uredo animus dolorem. Crepusculum aer solutio nihil nemo cogo iure voveo truculenter colligo. Video solutio tersus bonus avarus subito autem vicinus.",
                "Ports": true,
                "Railroads": true,
                "Airports": false,
                "route_id": "2d3405b8-247a-4c1a-bbf0-61251b458316",
                "order": 0
            },
            "Id": "1035f74f-a8d5-4c36-bb8d-794df760889e"
        },
        {
            "CompanyName": "Brekke Inc",
            "TravelBasePrice": 9511,
            "TravelDay": "2025-07-27T02:08:34.698Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "da03c207-a7ed-4998-a615-a5aed5e3670b",
                "Name": "Beulahborough",
                "UF": "Mississippi",
                "Description": "Appositus caelestis uredo animus dolorem. Crepusculum aer solutio nihil nemo cogo iure voveo truculenter colligo. Video solutio tersus bonus avarus subito autem vicinus.",
                "Ports": true,
                "Railroads": true,
                "Airports": false,
                "route_id": "2d3405b8-247a-4c1a-bbf0-61251b458316",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "d9aeae8d-91dc-40ad-82b8-8efc7b088659",
                "Name": "Wildermanstad",
                "UF": "Illinois",
                "Description": "Quae absum celo taedium paens sublime umerus somniculosus adeptio vester. Animadverto ipsam triduana perferendis tamisium temeritas. Non confero avaritia commemoro natus denego venio volo summa.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "d2859399-9de1-4f3c-a702-ce5b0cfc9794",
                "order": 0
            },
            "Id": "38272b1d-5a4d-4320-ab31-7e4d61b4a617"
        },
        {
            "CompanyName": "Cummerata LLC",
            "TravelBasePrice": 0,
            "TravelDay": "1970-01-01T00:00:00.000Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "82cbc461-6e10-4730-9f28-c9dfc23c9498",
                "Name": "Fortaleza",
                "UF": "CE",
                "Description": "CE",
                "Ports": true,
                "Railroads": true,
                "Airports": true,
                "route_id": "bc209b96-7704-4d9a-9c96-7b74fa4f2d01",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "2bd35d96-e1b6-492f-872d-bac184ac5972",
                "Name": "Cedro",
                "UF": "CE",
                "Description": "CE",
                "Ports": false,
                "Railroads": true,
                "Airports": false,
                "route_id": "bc209b96-7704-4d9a-9c96-7b74fa4f2d01",
                "order": 0
            },
            "Id": "6143e284-cce8-47d0-9ab8-8d5d5d3fdc3c"
        },
        {
            "CompanyName": "Altenwerth - Schmitt",
            "TravelBasePrice": 3582,
            "TravelDay": "2025-12-07T12:47:53.099Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "e643bf1c-f1f0-41c8-984f-042541248a56",
                "Name": "Atascocita",
                "UF": "Kansas",
                "Description": "Abutor hic vulticulus aestivus curso despecto ullus territo. Auxilium similique absens absorbeo derelinquo vorago. Sum aegre cogo vindico corpus vito incidunt voco sit.",
                "Ports": true,
                "Railroads": true,
                "Airports": true,
                "route_id": "b778d9fd-9a10-4913-b086-f234be10bc68",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "8dc0459f-a13a-4cf0-8c8c-8579a8de0c5e",
                "Name": "East Kristianberg",
                "UF": "Oregon",
                "Description": "Una aveho infit supra cimentarius supellex brevis custodia. Comedo adeptio aegre terra ratione. Toties cunabula veritatis carbo.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "8df79032-97c2-4cee-9bb5-f2a3599c1ba7",
                "order": 0
            },
            "Id": "91cfeba2-128a-403d-8cca-6a5a72135b4d"
        },
        {
            "CompanyName": "Rohan - Rodriguez",
            "TravelBasePrice": 9506,
            "TravelDay": "2025-07-13T21:09:50.104Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "d9aeae8d-91dc-40ad-82b8-8efc7b088659",
                "Name": "Wildermanstad",
                "UF": "Illinois",
                "Description": "Quae absum celo taedium paens sublime umerus somniculosus adeptio vester. Animadverto ipsam triduana perferendis tamisium temeritas. Non confero avaritia commemoro natus denego venio volo summa.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "d2859399-9de1-4f3c-a702-ce5b0cfc9794",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "9f852b0f-b9f3-44b7-a3b7-854385cc049e",
                "Name": "East Luluberg",
                "UF": "Connecticut",
                "Description": "Creator textus theologus possimus. Sonitus recusandae censura approbo alii volubilis accendo tracto. Ustilo spoliatio vociferor.",
                "Ports": false,
                "Railroads": true,
                "Airports": true,
                "route_id": "a24ac547-43b0-43fa-a2b6-0d339e4e0df7",
                "order": 0
            },
            "Id": "ad8fcf9a-7491-4c17-8253-565915ea9b4a"
        },
        {
            "CompanyName": "McCullough, Windler and Beatty",
            "TravelBasePrice": 4087,
            "TravelDay": "2025-06-09T18:52:16.484Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "2082776c-3224-4ce7-b9af-03fe8f4e9fae",
                "Name": "Moorecester",
                "UF": "Arkansas",
                "Description": "Paens eligendi centum comis. Curso asporto ubi casus colo creber. Dapifer tamdiu adeo quas suffoco voluptatem tamen cuius.",
                "Ports": false,
                "Railroads": true,
                "Airports": false,
                "route_id": "3227b3fb-a6f4-4c28-996a-ee45e6ceeb34",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "ccad8795-b7e3-459c-8335-4558e7a096ed",
                "Name": "Marianchester",
                "UF": "Alaska",
                "Description": "Utroque comes paulatim apto vestrum articulus fugit sol. Repellendus totidem venia ulterius amita nihil tamen earum laboriosam ascit. Tutamen abstergo inflammatio aeneus trado.",
                "Ports": false,
                "Railroads": false,
                "Airports": true,
                "route_id": "7312fe1c-cd9e-41d0-9b9f-27b4c9518eb3",
                "order": 0
            },
            "Id": "b0f4e92c-4fc1-4102-85a4-f4fdabae3196"
        },
        {
            "CompanyName": "Koss - Reichel",
            "TravelBasePrice": 400,
            "TravelDay": "1970-01-01T00:00:00.000Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "2bd35d96-e1b6-492f-872d-bac184ac5972",
                "Name": "Cedro",
                "UF": "CE",
                "Description": "CE",
                "Ports": false,
                "Railroads": true,
                "Airports": false,
                "route_id": "bc209b96-7704-4d9a-9c96-7b74fa4f2d01",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "82cbc461-6e10-4730-9f28-c9dfc23c9498",
                "Name": "Fortaleza",
                "UF": "CE",
                "Description": "CE",
                "Ports": true,
                "Railroads": true,
                "Airports": true,
                "route_id": "bc209b96-7704-4d9a-9c96-7b74fa4f2d01",
                "order": 0
            },
            "Id": "babc037f-587b-4493-baf0-4691b4c29b3d"
        },
        {
            "CompanyName": "Mohr LLC",
            "TravelBasePrice": 7238,
            "TravelDay": "2025-02-17T11:51:53.022Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "8dc0459f-a13a-4cf0-8c8c-8579a8de0c5e",
                "Name": "East Kristianberg",
                "UF": "Oregon",
                "Description": "Una aveho infit supra cimentarius supellex brevis custodia. Comedo adeptio aegre terra ratione. Toties cunabula veritatis carbo.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "8df79032-97c2-4cee-9bb5-f2a3599c1ba7",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "2082776c-3224-4ce7-b9af-03fe8f4e9fae",
                "Name": "Moorecester",
                "UF": "Arkansas",
                "Description": "Paens eligendi centum comis. Curso asporto ubi casus colo creber. Dapifer tamdiu adeo quas suffoco voluptatem tamen cuius.",
                "Ports": false,
                "Railroads": true,
                "Airports": false,
                "route_id": "3227b3fb-a6f4-4c28-996a-ee45e6ceeb34",
                "order": 0
            },
            "Id": "d667bf23-6aa7-417a-8698-964d82db2841"
        },
        {
            "CompanyName": "Kub - Kuhn",
            "TravelBasePrice": 4138,
            "TravelDay": "2025-03-09T13:34:39.520Z",
            "Transport": "Land",
            "BeginningPoint": {
                "Id": "9f852b0f-b9f3-44b7-a3b7-854385cc049e",
                "Name": "East Luluberg",
                "UF": "Connecticut",
                "Description": "Creator textus theologus possimus. Sonitus recusandae censura approbo alii volubilis accendo tracto. Ustilo spoliatio vociferor.",
                "Ports": false,
                "Railroads": true,
                "Airports": true,
                "route_id": "a24ac547-43b0-43fa-a2b6-0d339e4e0df7",
                "order": 0
            },
            "FinishingPoint": {
                "Id": "b9428e14-077e-4c57-9426-281528cde730",
                "Name": "New Madison",
                "UF": "Idaho",
                "Description": "Thalassinus fugit adipiscor terra. Civitas certus tamen adstringo absum cursus voluptates subiungo odit. Aggredior testimonium depulso carbo ulciscor decumbo dedecor casus.",
                "Ports": false,
                "Railroads": false,
                "Airports": false,
                "route_id": "14c8fbaf-b854-48dc-af73-235f848b3720",
                "order": 0
            },
            "Id": "df1dfeb6-1122-44e5-96d7-95840892cda3"
        }
    ],
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
            }
        }
                
    }
}