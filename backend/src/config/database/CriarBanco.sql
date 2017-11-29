-- ---------------------------------------------------------------------------------------------------------
CREATE DATABASE magalu;
SET search_path TO public;

CREATE TABLE PUBLIC.COLABORADOR(
    ID				SERIAL PRIMARY KEY NOT NULL,
    NOME			VARCHAR(100) CONSTRAINT colaborador_nome NOT NULL,
    SENHA           VARCHAR(200) CONSTRAINT colaborador_senha NOT NULL,
    TIPO			VARCHAR(50) CONSTRAINT colaborador_tipo CHECK(TIPO IN('Gestor','Vendedor')),
    ATIVO			CHAR(1) CONSTRAINT colaborador_ativo DEFAULT 'S',
    DATACADASTRO	DATE DEFAULT CURRENT_TIMESTAMP,
    IDALTERACAO     INT,
    DATAALTERACAO   DATE
);

CREATE TABLE PUBLIC.LOJA(
    ID				SERIAL PRIMARY KEY NOT NULL,
    IDCOLABORADOR	INT REFERENCES COLABORADOR(ID) CONSTRAINT loja_idcolaborador NOT NULL,
    DESCRICAO		VARCHAR(100) CONSTRAINT loja_descricao NOT NULL,
    CODIGOFILIAL	BIGINT CONSTRAINT loja_codigofilial NOT NULL,
    CEP				VARCHAR(50) CONSTRAINT loja_cep NOT NULL,
    CIDADE			VARCHAR(150) CONSTRAINT loja_cidade NOT NULL,
    ESTADO			VARCHAR(150) CONSTRAINT loja_estado NOT NULL,
    ATIVO			CHAR(1) CONSTRAINT loja_ativo DEFAULT 'S',
    DATACADASTRO	DATE DEFAULT CURRENT_TIMESTAMP,
    IDALTERACAO		INT,
    DATAALTERACAO	DATE
);

CREATE TABLE PUBLIC.PRODUTO(
    ID				SERIAL PRIMARY KEY NOT NULL,
	IDCOLABORADOR	INT REFERENCES COLABORADOR(ID) CONSTRAINT produto_idcolaborador NOT NULL,
    DESCRICAO		VARCHAR(100) CONSTRAINT produto_descricao NOT NULL,
    CODIGOPRODUTO	BIGINT CONSTRAINT produto_codigoproduto NOT NULL,
	VALORVENDA		MONEY CONSTRAINT produto_valorvenda NOT NULL,
    QUANTIDADE		BIGINT CONSTRAINT produto_quantidade NOT NULL,
    ATIVO			CHAR(1) CONSTRAINT produto_ativo DEFAULT 'S',
    DATACADASTRO	DATE DEFAULT CURRENT_TIMESTAMP,
    IDALTERACAO		INT,
    DATAALTERACAO	DATE
);

CREATE TABLE PUBLIC.COLABORADOR_LOG(
    ID				SERIAL PRIMARY KEY NOT NULL,
    IDCOLABORADOR   INT,
    NOME			VARCHAR(100),
    SENHA           VARCHAR(200),
    TIPO			VARCHAR(50),
    ATIVO			CHAR(1),
    DATACADASTRO	DATE,
    IDALTERACAO     INT,
    DATAALTERACAO   DATE
);

-- ---------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION FU_TRIGGER_UPDATE_COLABORADOR_LOG()
RETURNS TRIGGER 
AS $$
BEGIN 
    INSERT INTO PUBLIC.COLABORADOR_LOG
    (IDCOLABORADOR, NOME, SENHA, TIPO, ATIVO, DATACADASTRO, IDALTERACAO, DATAALTERACAO)
    VALUES 
    (OLD.ID, OLD.NOME, OLD.SENHA, OLD.TIPO, OLD.ATIVO, OLD.DATACADASTRO, OLD.IDALTERACAO, OLD.DATAALTERACAO);

    RETURN NULL;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER TRIGGER_UPDATE_COLABORADOR_LOG 
AFTER UPDATE ON PUBLIC.COLABORADOR
FOR EACH ROW
EXECUTE PROCEDURE FU_TRIGGER_UPDATE_COLABORADOR_LOG();

-- ---------------------------------------------------------------------------------------------------------
INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('admin',MD5('123456'),'Gestor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Evelyn Ribeiro Sousa',MD5('12345678'),'Gestor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Danilo Pereira Goncalves',MD5('12345678'),'Gestor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Eduardo Alves Castro',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Leonor Carvalho Souza',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Isabelle Souza Fernandes',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Aline Carvalho Alves',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Gabriel Cardoso Cavalcanti',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);

INSERT INTO Public.Colaborador (nome,senha,tipo,ativo,dataCadastro)
VALUES ('Sarah Araujo Ferreira',MD5('12345678'),'Vendedor','S',CURRENT_TIMESTAMP);