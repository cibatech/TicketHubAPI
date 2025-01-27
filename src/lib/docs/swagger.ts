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
        paths:{
        "app/user/register": {
       "description": "Rota para registro de novos usuários no sistema",
       "post": {
           "tags": ["user","app"],
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
                                           },
                                           "userId": {
                                               "type": "string",
                                               "description": "ID único gerado para o usuário"
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
                   "content": {
                       "application/json": {
                           "schema": {
                               "type": "object",
                               "properties": {
                                   "description":{
                                        "type":"string",
                                   }
                               }
                           },
                           "example": {
                               "error": "Usuário já existe no sistema",
                               "code": "UserAlreadyExists",
                               "details": {
                                   "conflictField": "Email"
                               }
                           }
                       }
                   }
               },
               "500": {
                   "description": "Erro interno do servidor",
                   "content": {
                       "application/json": {
                           "schema": {
                               "type": "object",
                               "properties": {
                                   "error": {
                                       "type": "string",
                                       "description": "Mensagem de erro interno"
                                   }
                               }
                           },
                           "example": {
                               "error": "Erro interno ao processar a requisição"
                           }
                       }
                   }
               }
           }
       }
   }    ,
        "app/user/profile": {
       "description": "Rota utilizada para retornar o perfil autenticado do usuário usando um token JWT",
       "get": {
           "tags": ["user",],
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
            "app/user/auth/login":{
                description:"Rota utilizada para autenticação de usuário, retorna um token JWT que deve ser utilizado para validar o usuário",
                patch:{
                    tags:["auth","user","app"],
                    requestBody:{
                        description:"Corpo da requisição",
                        content:{
                            "application/json":{
                                examples:{
                                    example1:{
                                        value:JSON.parse(`{
                                                    "Email":"admin@gmail.com",
    "Password":"admin123"}
                                            `)
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        200:{
                            description:"Retornou com sucesso as informações do usuário",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            value:JSON.parse(`
                                                    {
  "Description": "Successfully logged user-in",
  "UserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTU4NmMzMS1mOTc5LTQ5YTUtYTE5Mi0wZDZkMzhkYzhkMzEiLCJpYXQiOjE3Mzc2MzczMTl9.bTvhkjiKndYpeH1-BRqXHm0bkD5oMdDeG8yC1Uwardw"
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
            "app/user/delete":{
                description:"Rota que deleta usuários",
                delete:{
                    parameters:[
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
                    tags:["user","app"],
                    responses:{
                        200:{
                            description:"usuário deletado com sucesso"
                        }
                    }
                }
            },
            "app/user/update":{
                description:"Rota utilizada para atualizar informações de perfil de um usuário",
                put:{
                    tags:["user","app"],
                    requestBody:{
                        content:{
                            "application/json":{
                                examples:{
                                    example1:{
                                        value:JSON.parse(`
                                            {"Nome":"Alexander"}
                                        `)
                                    },
                                    example2:JSON.parse(`{"Email":"Alexander@gmail.com"}`)
                                }
                            }
                        }
                    },
                    parameters:[
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
                    responses:{
                        200:{
                            description:"usuário atualizado com sucesso",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            value:JSON.parse(`
                                                    {
  "Description": "Successfully updated user",
  "response": {
    "Email": "admin@gmail.com",
    "Nome": "Alexander",
    "Password": "$2a$09$r64NcgqHv2XDvh/gzW8ALuPCK3cSfpIztLzNuj61M0m4PkAxb8iLC"
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
            }
        }
        

    }
}