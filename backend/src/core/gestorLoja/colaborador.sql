-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.LISTARCOLABORADOR(
    pIdColaborador 	VARCHAR,
	pPesquisar		VARCHAR
)
  RETURNS TABLE(
    "id"    	VARCHAR(200),
    "nome"  	PUBLIC.COLABORADOR.NOME%TYPE,
    "tipo"   	PUBLIC.COLABORADOR.TIPO%TYPE,
    "ativo"  	PUBLIC.COLABORADOR.ATIVO%TYPE,
    "senha"  	PUBLIC.COLABORADOR.SENHA%TYPE
  ) AS $$

/*
Documentação
Arquivo Fonte.....: laboratorio.sql
Objetivo..........: Listar todos os colaboradores ou um especifico
Autor.............: Cleber Spirlandeli
Data..............: 22/11/2017
Ex................:
                    SELECT * FROM PUBLIC.LISTARCOLABORADOR(null, null);
                    SELECT * FROM PUBLIC.LISTARCOLABORADOR('MjAxNy0xMS0yOCAxN14qXzE1Ml8kJQ==', null);
                    SELECT * FROM PUBLIC.LISTARCOLABORADOR(null, 'TeSt');
*/

DECLARE     vIdColaborador                 INTEGER = public.dekryptosgraphein(pIdColaborador);

BEGIN

  RETURN QUERY
  	SELECT 
        public.kryptosgraphein(c.id) 	AS id,
        c.nome 							AS nome,
        c.tipo 							AS tipo,
        c.ativo 						AS ativo,
        c.senha                         AS senha
    FROM Colaborador c
	WHERE
    	c.ativo = 'S'
    AND
        CASE 
            WHEN pIdColaborador IS NOT NULL THEN
                c.id = vIdColaborador
            ELSE
                TRUE
            END
    AND
        CASE 
            WHEN pPesquisar IS NOT NULL THEN
                UPPER(c.nome) LIKE UPPER('%' || pPesquisar || '%')
                OR
                UPPER(c.tipo) LIKE UPPER('%' || pPesquisar || '%')
            ELSE
                TRUE
            END;
END;
$$
LANGUAGE plpgsql;




-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.INSERIRCOLABORADOR(
  pNome		 	     	PUBLIC.COLABORADOR.NOME%TYPE,
  pSenha                PUBLIC.COLABORADOR.SENHA%TYPE,
  pTipo 		        PUBLIC.COLABORADOR.TIPO%TYPE
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: colaborador.sql
Objetivo..........: Inserir um novo colaborador
Autor.............: Cleber Spirlandeli
Data..............: 22/11/2017
Ex................:
                    SELECT * FROM PUBLIC.INSERIRCOLABORADOR(
                                                            'Rezende SENHA',
                                                            '1234567',
                                                            'Vendedor'
                                                            );
*/

DECLARE vErrorProcedure       TEXT;
        vErrorMessage         TEXT;
        vReturningId          INTEGER;
        

BEGIN
  
    INSERT INTO Public.Colaborador (
      nome,
      senha,
      tipo,
      ativo,
      dataCadastro
    )
    VALUES (
      pNome,
      MD5(pSenha),
      pTipo,
      'S',
      CURRENT_TIMESTAMP
    )
    RETURNING id
      INTO vReturningId;

    RETURN
    json_build_object(
        'success', true,
        'message', 'Colaborador cadastrado com sucesso.',
        'idColaborador', public.kryptosGraphein(vReturningId)
    );

  EXCEPTION WHEN OTHERS
  THEN
    GET STACKED DIAGNOSTICS vErrorProcedure = MESSAGE_TEXT;
    GET STACKED DIAGNOSTICS vErrorMessage = PG_EXCEPTION_CONTEXT;
    RAISE EXCEPTION 'Internal Error: (%) %', vErrorProcedure, vErrorMessage;
    
    RETURN
    json_build_object(
        'success', false,
        'message', 'Colaborador não cadastrado.',
        'idColaborador', '0'
    );
END;
$$
LANGUAGE plpgsql;










-- -----------------------------------------------------------------------------------------------------------                              
CREATE OR REPLACE FUNCTION PUBLIC.EXCLUIRCOLABORADOR(
    pIdAlteracao        VARCHAR,
    pIdColaborador      VARCHAR
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: colaborador.sql
Objetivo..........: Excluir um colaborador
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.EXCLUIRCOLABORADOR(
                                                            'MjAxNy0xMS0yNyAxOV4qXzY1XyQl',
                                                            'MjAxNy0xMS0yNyAxOV4qXzY1XyQl'
                                                            );
                                        
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdColaborador              INTEGER = public.dekryptosgraphein(pIdColaborador);
        vTipoColaboradorAlteracao   VARCHAR;

BEGIN
  
    SELECT 
         c.tipo 
    INTO vTipoColaboradorAlteracao 
    FROM PUBLIC.Colaborador c 
    WHERE 
            c.id = vIdAlteracao
        AND c.ativo = 'S';

    IF vTipoColaboradorAlteracao = 'Gestor' AND vTipoColaboradorAlteracao IS NOT NULL
    THEN

        UPDATE Public.Colaborador
        SET
            ATIVO = 'N',
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdColaborador;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Colaborador excluído com sucesso.',
            'idColaborador', pIdColaborador
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar a exclusão.',
            'idColaborador', pIdColaborador
        );
    END IF;
    
  EXCEPTION WHEN OTHERS
  THEN
    GET STACKED DIAGNOSTICS vErrorProcedure = MESSAGE_TEXT;
    GET STACKED DIAGNOSTICS vErrorMessage = PG_EXCEPTION_CONTEXT;
    RAISE EXCEPTION 'Internal Error: (%) %', vErrorProcedure, vErrorMessage;

END;
$$
LANGUAGE plpgsql;





-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.ALTERARCOLABORADOR(
    pIdAlteracao        VARCHAR,
    pIdColaborador      VARCHAR,
    pNome               VARCHAR,
    pTipo               VARCHAR,
    pAtivo              VARCHAR,
    pSenha              VARCHAR
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: colaborador.sql
Objetivo..........: Excluir um colaborador
Autor.............: Cleber Spirlandeli
Data..............: 22/11/2017
Ex................:
                    SELECT * FROM PUBLIC.ALTERARCOLABORADOR(
                                                            'e10adc3949ba59abbe56e057f20f883e',
                                                            'e10adc3949ba59abbe56e057f20f883e',
                                                            'Nome Alterado',
                                                            'Gestor',
                                                            'S',
                                                            '123456'
                                                            );
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdColaborador              INTEGER = public.dekryptosgraphein(pIdColaborador);
        vTipoColaboradorAlteracao   VARCHAR;

BEGIN
  
    SELECT 
         c.tipo 
    INTO vTipoColaboradorAlteracao 
    FROM PUBLIC.Colaborador c 
    WHERE 
            c.id = vIdAlteracao
        AND c.ativo = 'S';

    IF vTipoColaboradorAlteracao = 'Gestor' AND vTipoColaboradorAlteracao IS NOT NULL
    THEN

        UPDATE Public.Colaborador
        SET
            NOME = pNome,
            TIPO = pTipo,
            ATIVO = pAtivo,
            SENHA = MD5(pSenha),
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdColaborador;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Colaborador alterado com sucesso.',
            'idColaborador', pIdColaborador
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar alteração.',
            'idColaborador', pIdColaborador
        );
    END IF;
    
  EXCEPTION WHEN OTHERS
  THEN
    GET STACKED DIAGNOSTICS vErrorProcedure = MESSAGE_TEXT;
    GET STACKED DIAGNOSTICS vErrorMessage = PG_EXCEPTION_CONTEXT;
    RAISE EXCEPTION 'Internal Error: (%) %', vErrorProcedure, vErrorMessage;

END;
$$
LANGUAGE plpgsql;