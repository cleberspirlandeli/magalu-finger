CREATE OR REPLACE FUNCTION PUBLIC.LOGIN(
    pUsuario 	VARCHAR,
    pSenha  	VARCHAR
)
  RETURNS TABLE(
    "id"    	VARCHAR(200),
    "nome"  	PUBLIC.COLABORADOR.NOME%TYPE,
    "tipo"   	PUBLIC.COLABORADOR.TIPO%TYPE,
    "ativo"  	PUBLIC.COLABORADOR.ATIVO%TYPE
  ) AS $$

/*
Documentação
Arquivo Fonte.....: login.sql
Objetivo..........: Listar os dados do usuário para gerar o token (login)
Autor.............: Cleber Spirlandeli
Data..............: 26/11/2017
Ex................:
                    SELECT * FROM PUBLIC.LOGIN('Cleber','12345678');
*/

BEGIN
	
    IF 	pUsuario IS NOT NULL 
    AND pSenha 	 IS NOT NULL
    THEN

      RETURN QUERY
        SELECT
            public.kryptosgraphein(c.id) 	AS id,
            c.nome 							AS nome,
            c.tipo 							AS tipo,
            c.ativo 						AS ativo
        FROM Colaborador c
        WHERE
            c.ativo = 'S'
        AND
            c.nome = pUsuario
        AND
            c.senha = MD5(pSenha)
        LIMIT 1;
	END IF;
        
END;
$$
LANGUAGE plpgsql;