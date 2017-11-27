-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.LISTARLOJA(pIdLoja VARCHAR)
  RETURNS TABLE(
    "id"    	        VARCHAR(200),
    "descricao"	        PUBLIC.LOJA.DESCRICAO%TYPE,
    "codigofilial"   	PUBLIC.LOJA.CODIGOFILIAL%TYPE,
    "cep"  	            PUBLIC.LOJA.CEP%TYPE,
    "cidade"            PUBLIC.LOJA.CIDADE%TYPE,
    "estado"            PUBLIC.LOJA.ESTADO%TYPE
  ) AS $$

/*
Documentação
Arquivo Fonte.....: loja.sql
Objetivo..........: Listar todas as lojas ou uma loja em específico
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.LISTARLOJA(null);
                    SELECT * FROM PUBLIC.LISTARLOJA('MjAxNy0xMS0yMiAyM14qXzEwXyQl');
*/

BEGIN

  RETURN QUERY
  	SELECT 
        public.kryptosgraphein(l.id) 	AS id,
        l.descricao 					AS descricao,
        l.codigofilial 					AS codigofilial,
        l.cep 						    AS cep,
        l.cidade                        AS cidade,
        l.estado                        AS estado
    FROM 
        Public.Loja l
	WHERE
    	l.ativo = 'S'
    AND
        CASE 
            WHEN pIdLoja IS NOT NULL THEN
                l.id = public.dekryptosgraphein(pIdLoja) :: INTEGER
            ELSE
                TRUE
            END;
END;
$$
LANGUAGE plpgsql;




-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.INSERIRLOJA(
    pIdInsercao 	      VARCHAR,
    pDescricao            PUBLIC.LOJA.DESCRICAO%TYPE,
    pCodigoFilial 		  PUBLIC.LOJA.CODIGOFILIAL%TYPE,
    pCep                  PUBLIC.LOJA.CEP%TYPE,
    pCidade               PUBLIC.LOJA.CIDADE%TYPE,
    pEstado               PUBLIC.LOJA.ESTADO%TYPE
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: loja.sql
Objetivo..........: Inserir uma nova loja
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.INSERIRLOJA(
                                                'MjAxNy0xMS0yNCAxOF4qXzdfJCU=',
                                                'Loja Teste Proc-Banco',
                                                '123123',
                                                '14406012',
                                                'Franca',
                                                'SP'
                                                );

*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        vReturningId                INTEGER;
        vIdInsercao                 INTEGER = public.dekryptosgraphein(pIdInsercao);
        vTipoColaboradorAlteracao   VARCHAR;
BEGIN

    SELECT 
         c.tipo 
    INTO vTipoColaboradorAlteracao 
    FROM PUBLIC.Colaborador c 
    WHERE 
            c.id = vIdInsercao
        AND c.ativo = 'S';

    IF vTipoColaboradorAlteracao = 'Gestor' AND vTipoColaboradorAlteracao IS NOT NULL
    THEN
  
        INSERT INTO Public.Loja (
            idColaborador,
            descricao,
            codigoFilial,
            cep,
            cidade,
            estado,
            ativo,
            dataCadastro
        )
        VALUES (
            vIdInsercao,
            pDescricao,
            pCodigoFilial,
            pCep,
            pCidade,
            upper(pEstado),
            'S',
            CURRENT_TIMESTAMP
        )
        RETURNING id
        INTO vReturningId;

        RETURN
        json_build_object(
            'success', true,
            'message', 'Nova loja Magalu cadastrado com sucesso.',
            'idLoja', public.kryptosGraphein(vReturningId)
        );

    ELSE
        RETURN
            json_build_object(
                'success', false,
                'message', 'Somente Gestores podem realizar novos cadastros.',
                'idLoja', '0'
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
CREATE OR REPLACE FUNCTION PUBLIC.EXCLUIRLOJA(
    pIdAlteracao        VARCHAR,
    pIdLoja             VARCHAR
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: loja.sql
Objetivo..........: Excluir uma loja
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.EXCLUIRLOJA(
                                                    'MjAxNy0xMS0yNCAxOV4qXzdfJCU=',
                                                    'MjAxNy0xMS0yNCAxOV4qXzFfJCU='
                                                    );
                                        
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdLoja                     INTEGER = public.dekryptosgraphein(pIdLoja);
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

        UPDATE Public.Loja
        SET
            ATIVO = 'N',
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdLoja;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Loja Magalu excluído com sucesso.',
            'idLoja', pIdLoja
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar a exclusão.',
            'idLoja', pIdLoja
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
CREATE OR REPLACE FUNCTION PUBLIC.ALTERARLOJA(
    pIdAlteracao            VARCHAR,
    pIdLoja                 VARCHAR,
    pDescricao              PUBLIC.LOJA.DESCRICAO%TYPE,
    pCodigoFilial 		    PUBLIC.LOJA.CODIGOFILIAL%TYPE,
    pCep                    PUBLIC.LOJA.CEP%TYPE,
    pCidade                 PUBLIC.LOJA.CIDADE%TYPE,
    pEstado                 PUBLIC.LOJA.ESTADO%TYPE,
    pAtivo                  PUBLIC.LOJA.ATIVO%TYPE
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: loja.sql
Objetivo..........: Alterar uma loja
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.ALTERARLOJA(
                                                    'MjAxNy0xMS0yNCAxN14qXzIwXyQl',
                                                    'MjAxNy0xMS0yNCAxN14qXzM1XyQl',
                                                    'Magalu Alterado',
                                                    '101010',
                                                    '10000555',
                                                    'Restinga',
                                                    'Sp',
                                                    'S'
                                                    );
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdLoja              INTEGER = public.dekryptosgraphein(pIdLoja);
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

        UPDATE Public.Loja
        SET
            DESCRICAO = pDescricao,
            CODIGOFILIAL = pCodigoFilial,
            CEP = pCep,
            CIDADE = pCidade,
            ESTADO = upper(pEstado),
            ATIVO = pAtivo,
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdLoja;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Loja Magalu alterado com sucesso.',
            'idLoja', pIdLoja
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar alteração.',
            'idLoja', pIdLoja
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