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
admin
```
### Linux
```
DEBUG=distribuidora_albumfrontnode:* npm start
```
### Windows
```
set DEBUG=distribuidora_albumfrontNode:*
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


## 1:1 - Distribuidora( <br>
distribuidoraid bigserial,<--------------- agenciaid bigserial, //id <br>
numero_distribuidora varchar(50) UNIQUE,<- numero_agencia varchar(50) UNIQUE,  //numero <br>
sede_distribuidora,<---------------------- banco varchar(40), // país/cidade da sede <br>
nome_distribuidora varchar(40),<---------- descricao varchar(40), //nome <br>
fundacao date,<--------------------------- data_criacao date, //data de criação <br> 
taxa_vendas decimal,<--------------------- taxa_publicacao decimal, //taxa das vendas do album<br>
removido boolean,<------------------------ removido boolean, <br>
ativo boolean,<--------------------------- ativo boolean,<br>
) <br>
 <br>

 
## 0:N - Album( <br>
albumid bigserial, <br>
numero_album varchar(50) UNIQUE, <br>
nome_album varchar(40), <br>
data_publicacao date, <br>
valor decimal, <br> 
removido boolean, <br>
ativo boolean,<br>
) <br>
    
