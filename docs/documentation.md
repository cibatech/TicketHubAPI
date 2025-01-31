# Documentação do Banco de Dados

## Visão Geral
Este documento descreve as classes do banco de dados, modelado utilizando Prisma ORM para PostgreSQL. O banco suporta a gestão de pontos de transporte, rotas, empresas, usuários, bilhetes e viagens. Abaixo estão os modelos, seus atributos e seus relacionamentos.

## Enumerações

### `routeKind`
Define os tipos de rotas possíveis:
- `Air`: Transporte aéreo
- `Naval`: Transporte naval
- `Land`: Transporte terrestre
- `Rail`: Transporte ferroviário

---

## Modelos

### `Point`
Representa um ponto de transporte dentro de uma rota. Pontos geralmente são cidades

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `Name` (String, Único): Nome do ponto
- `UF` (String): Estado onde o ponto está localizado
- `Description` (String, Opcional): Descrição detalhada do ponto
- `Ports` (Boolean, Default: `false`): Indica se o ponto possui porto
- `Railroads` (Boolean, Default: `false`): Indica se o ponto possui ferrovia
- `Airports` (Boolean, Default: `false`): Indica se o ponto possui aeroporto
- `route_ref` (Relação com `Route`): Referência à rota da qual o ponto faz parte
- `route_id` (String): Chave estrangeira referenciando a `Route`
- `order` (Int, Default: `0`): Ordem do ponto dentro da rota
- `start_ticket` (Relação com `Travel`, Nome: `Beginning`): Relaciona o ponto como início de uma viagem
- `end_ticket` (Relação com `Travel`, Nome: `Ending`): Relaciona o ponto como fim de uma viagem

---

### `Route`
Representa um trajeto composto por vários pontos. 

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `Title` (String): Nome da rota
- `Description` (String, Opcional): Descrição da rota
- `RouteType` (`routeKind`): Tipo da rota
- `PointsList` (Relação com `Point[]`): Lista de pontos que compõem a rota
- `AssignedBus` (Relação opcional com `Transport`): Veículo designado para a rota

---

### `Company`
Representa uma empresa de transporte.

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `Name` (String): Nome da empresa
- `CNPJ` (String, Único): CNPJ da empresa
- `Transport_List` (Relação com `Transport[]`): Veículos pertencentes à empresa

---

### `Transport`
Representa um veículo utilizado no transporte de passageiros.

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `Model` (String): Modelo do veículo
- `Year` (DateTime, Opcional): Ano de fabricação
- `Color` (String, Opcional): Cor do veículo
- `Capacity` (Int, Default: `20`): Capacidade de passageiros
- `cRef` (Relação com `Company`): Empresa proprietária do veículo
- `Company` (String): Chave estrangeira referenciando a `Company`
- `aRef` (Relação com `Route`): Rota atribuída ao veículo
- `AssignedRoute` (String, Único): Chave estrangeira referenciando a `Route`

---

### `ClientsTicket`
Registro de um cliente dentro de um bilhete. Um bilhete pode possuir multiplos clientes r

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `OwnerId` (String): Identificação do dono do bilhete
- `PersonName` (String): Nome do passageiro
- `CPF` (String): CPF do passageiro
- `Age` (Int, Default: `18`): Idade do passageiro
- `IsCompanion` (Boolean, Default: `false`): Indica se é acompanhante
- `TicketRef` (Relação com `Ticket`): Bilhete ao qual o passageiro está vinculado
- `TicketId` (String): Chave estrangeira referenciando `Ticket`

---

### `Ticket`
Representa um bilhete de viagem.

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `TotalTicketPrice` (Float, Default: `0`): Preço total do bilhete
- `Validated_at` (DateTime, Opcional): Data de validação do bilhete
- `Completed_at` (DateTime, Opcional): Data de conclusão da viagem
- `uRef` (Relação com `User`): Usuário dono do bilhete
- `userId` (String): Chave estrangeira referenciando `User`
- `ClientsList` (Relação com `ClientsTicket[]`): Passageiros associados ao bilhete
- `travelRef` (Relação com `Travel`): Viagem associada ao bilhete
- `TravelId` (String): Chave estrangeira referenciando `Travel`

---

### `Travel`
Representa uma viagem registrada no sistema.

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `TravelBasePrice` (Float): Preço base da viagem
- `BeginningPointId` (String): ID do ponto de partida
- `FinnishPointId` (String): ID do ponto de chegada
- `Travel_Day` (DateTime): Data da viagem
- `BegginingPoint` (Relação com `Point`, Nome: `Beginning`): Ponto inicial da viagem
- `FinishPoint` (Relação com `Point`, Nome: `Ending`): Ponto final da viagem
- `TicketList` (Relação com `Ticket[]`): Bilhetes emitidos para a viagem

---

### `User`
Representa um usuário do sistema.

#### Campos:
- `Id` (String, Chave Primária, UUID)
- `Nome` (String): Nome do usuário
- `Email` (String, Único): Email do usuário
- `Password` (String): Senha do usuário
- `Tickets` (Relação com `Ticket[]`): Bilhetes comprados pelo usuário
- `Verified` (Boolean, Default: `false`): Indica se o usuário está verificado
