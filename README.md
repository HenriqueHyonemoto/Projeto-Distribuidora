# DW3S6-2023-Trabalho2

# Comandos inicialização back
```
node app.js
```
### Caso "Error: Cannot find module 'express'"
```
npm i
```
# Comandos inicialização front

### usuario e senha
```
qwe
```
### Linux
```
DEBUG=dw3frontnode:* npm start
```
### Windows
```
set DEBUG=dw3frontNode:*
```
```
npm start
```

Trabalho para 22/11/2023

### O aluno deverá implementar um conjunto de APIs e interface gráfica para realizar o CRUD referente a duas tabelas que se relacionam do tipo 1:N

# Front End
    • Usar template (SBADMIN) de ADM para o FRONT no repositório do professor.
    • Front end Não pode fazer acesso direto com o SGBD.
    • Cada API do back-end precisa de uma função no front end que usa a API.
    • Front end deve ter controle de sessão de usuário logado.
    • Pode ser usado template front end das aulas.
    • Interface de CRUD (GetAll, GetById, Insert, Update, Delete) em uma tabela do modulo financeiro em sistema ERP.

# Back End
    • Pode ser feito em qualquer linguagem de programação.
    • Proteger Rotas das APIs com JWT ou outro mecanismo de token.
    • Realizar CRUD (GetAll, GetById, Insert, Update, Delete) em uma tabela do modulo financeiro em sistema ERP.

# Tabelas

## 1:1
## Distribuidora(
distribuidoraid bigserial,
numero_distribuidora varchar(50) UNIQUE,
nome_distribuidora varchar(40),
data_criacao date,
taxa_publicacao decimal,
removido boolean,
ativo boolean,
)

## 0:N
## Album(
albumid bigserial,
numero_album varchar(50) UNIQUE,
nome_album varchar(40),
data_publicacao date,
valor decimal,
removido boolean,
ativo boolean,
)
    
