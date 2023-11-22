--drop table distribuidora
create table IF NOT EXISTS distribuidora (
       distribuidoraid bigserial constraint pk_distribuidora PRIMARY KEY,
    numero_distribuidora varchar(5) UNIQUE,
    nome_distribuidora VARCHAR(60),
    sede_distribuidora varchar(40),
    fundacao date,
    taxa_vendas numeric(4,2),
    ativo boolean,
    removido boolean DEFAULT false
);

insert into distribuidora values 
    (default, '001', 'Spotify','São Paulo','20/08/2000',1.5, true),
    (default, '007', 'MusicPro','Brasilia','04/09/1985',0.5, true),
    (default, '238', 'EmuBands','São Paulo','16/03/1974',1.2, true),
    (default, '102', 'ONErpm','Rio de Janeiro','25/06/1988',0.8, false)
    ON CONFLICT DO NOTHING;

--drop table album
create table IF NOT EXISTS album (
    albumid bigserial constraint pk_album PRIMARY KEY,
    numero_album varchar(50) UNIQUE,
    nome_album varchar(40),
    data_publicacao date,
    valor numeric(6,2),
    distribuidoraid bigint constraint fk_album_distribuidora REFERENCES distribuidora,
    removido boolean DEFAULT false
);

insert into album values 
(default,'001','Lo-fi infinito','2000-01-31',6891.60, 
 (SELECT distribuidoraid from distribuidora where numero_distribuidora = '001')),
(default,'002','Summer EletroHits','2024-02-08',372.41, 
 (SELECT distribuidoraid from distribuidora where numero_distribuidora = '007'))
 ON CONFLICT DO NOTHING;

--Usuarios do sistema
create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    removido boolean DEFAULT false
);

SELECT * FROM DISTRIBUIDORA;
CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'admin', crypt('admin', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;
