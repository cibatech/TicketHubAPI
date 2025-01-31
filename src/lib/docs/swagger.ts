import { SwaggerOptions } from "@fastify/swagger";
import { json } from "stream/consumers";

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
                               }
                           }
                       },
                       "examples": {
                           "default": {
                               "value": {
                                   "Email": "caroldias@gmail.com",
                                   "Password": "Admin123!",
                                   "Nome": "Carol Dias"
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
                                example:{
                                    TravelId:"Id de uma viagem"
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
            }
        }
                
    }
}