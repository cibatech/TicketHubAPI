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
            "/app/user/register":{
                
                description:"Rota de registro de um usuário recebendo um email e senha como parametros",
                post:{
                    tags:["user","app"],
                    description:"recebe um email e senha que utiliza como parametros para criar um usuário",
                    requestBody:{
                        content:{
                            "application/json":{
                                examples:{
                                    example1:{
                                        value:JSON.parse(`
                                                
                                            {
                                                "Email":"caroldias@gmail.com",
                                                "Password":"admin123",
                                                "Nome":"admin"
                                            }
                                            `)
                                    }
                                }
                            }
                        }
                    },
                    responses:{
                        201:{
                            description:"Sucessfully created the user",
                            content:{
                                "application/json":{
                                    examples:{
                                        example1:{
                                            value:JSON.parse(`
                                                {
  "Description": "Successfully registered the user",
  "response": {
    "UserName": "admin"
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
            "app/user/profile":{
                description:"Rota utilizada para retornar um perfil de usuário através de um bearer token no formato JWT",
                get:{
                    description:"Recebe um bearer token JWT que será utilizado para identificar o perfil a ser retornado",
                    tags:["auth","app","user"],
                    responses:{
                        200:{
                            description:"Informação retornada com sucesso",
                            content:{
                                "application/json":{
                                    examples:{
                                        padrao:{
                                            value:JSON.parse(`
                                                    {
                                                    "Description": "Successfully returned user profile",
                                                    "response": {
                                                        "Email": "admin@gmail.com",
                                                        "Nome": "admin"
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