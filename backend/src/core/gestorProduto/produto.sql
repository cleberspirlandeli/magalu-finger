-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.LISTARPRODUTO(pIdProduto VARCHAR)
  RETURNS TABLE(
    "id"    	                VARCHAR(200),
    "descricao"  	            PUBLIC.PRODUTO.DESCRICAO%TYPE,
    "codigoProduto"   	        PUBLIC.PRODUTO.CODIGOPRODUTO%TYPE,
    "valorVenda"  	            PUBLIC.PRODUTO.VALORVENDA%TYPE,
    "quantidade"  	            PUBLIC.PRODUTO.QUANTIDADE%TYPE,
    "quantidadeDescricao"  	    VARCHAR(200),
    "datacadastro"              PUBLIC.PRODUTO.DATACADASTRO%TYPE
  ) AS $$

/*
Documentação
Arquivo Fonte.....: produto.sql
Objetivo..........: Listar todos os produtos ou um especifico
Autor.............: Cleber Spirlandeli
Data..............: 25/11/2017
Ex................:
                    SELECT * FROM PUBLIC.LISTARPRODUTO(null);
                    SELECT * FROM PUBLIC.LISTARPRODUTO('MjAxNy0xMS0yNSAwMF4qXzRfJCU=');
*/
DECLARE vIdProduto         INTEGER = public.dekryptosgraphein(pIdProduto);

BEGIN

  RETURN QUERY
  	SELECT 
        public.kryptosgraphein(p.id) 	AS id,
        p.descricao 					AS descricao,
        p.codigoproduto 				AS codigoproduto,
        p.valorvenda                    AS valorvenda,
        p.quantidade                    AS quantidade,
        (
            CASE 
                WHEN p.quantidade > 99 THEN
                    'EM ESTOQUE - ' || p.quantidade ::VARCHAR                              
                WHEN p.quantidade > 0 AND p.quantidade < 100  THEN
                    'BAIXO ESTOQUE - ' || p.quantidade ::VARCHAR
                ELSE
                    'SEM ESTOQUE' ::VARCHAR
            END
        )                               AS quantidadeDescricao,
        p.datacadastro                  AS datacadastro
    FROM Public.Produto p
	WHERE
    	p.ativo = 'S'
    AND
        CASE 
            WHEN pIdProduto IS NOT NULL THEN
                p.id = vIdProduto
            ELSE
                TRUE
            END;
END;
$$
LANGUAGE plpgsql;




-- -----------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION PUBLIC.INSERIRPRODUTO(
    pIdInsercao 	      VARCHAR,
    pDescricao            PUBLIC.PRODUTO.DESCRICAO%TYPE,  
    pCodigoProduto        PUBLIC.PRODUTO.CODIGOPRODUTO%TYPE,
    pValorVenda 		  PUBLIC.PRODUTO.VALORVENDA%TYPE,
    pQuantidade           PUBLIC.PRODUTO.QUANTIDADE%TYPE
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: loja.sql
Objetivo..........: Inserir um novo produto
Autor.............: Cleber Spirlandeli
Data..............: 24/11/2017
Ex................:
                    SELECT * FROM PUBLIC.INSERIRPRODUTO(
                                                'MjAxNy0xMS0yNCAxOF4qXzdfJCU=',
                                                'Nome Produto Proc-Banco',
                                                123123,
                                                '199.90',
                                                50
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

        IF pQuantidade > 10     -- Regra implementada somente para exemplo de várias validações
        THEN                -- 25/11/2017 - Cleber Rezende

            INSERT INTO Public.Produto (
                idProduto,
                descricao,
                codigoProduto,
                valorVenda,
                quantidade,
                ativo,
                dataCadastro
            )
            VALUES (
                vIdInsercao,
                pDescricao,
                pCodigoProduto,
                pValorVenda,
                pQuantidade,
                'S',
                CURRENT_TIMESTAMP
            )
            RETURNING id
            INTO vReturningId;

            RETURN
            json_build_object(
                'success', true,
                'message', 'Produto cadastrado com sucesso.',
                'idProduto', public.kryptosGraphein(vReturningId)
            );

        ELSE
            RETURN
                json_build_object(
                    'success', false,
                    'message', 'A quantidade do produto deve ser maior que 10 (dez).',
                    'idProduto', '0'
                );
        END IF;
        
    ELSE
        RETURN
            json_build_object(
                'success', false,
                'message', 'Somente Gestores podem realizar novos cadastros.',
                'idProduto', '0'
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
CREATE OR REPLACE FUNCTION PUBLIC.EXCLUIRPRODUTO(
    pIdAlteracao        VARCHAR,
    pIdProduto          VARCHAR
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: produto.sql
Objetivo..........: Excluir um produto
Autor.............: Cleber Spirlandeli
Data..............: 25/11/2017
Ex................:
                    SELECT * FROM PUBLIC.EXCLUIRPRODUTO(
                                                        'MjAxNy0xMS0yNCAxN14qXzIwXyQl',
                                                        'MjAxNy0xMS0yNCAxN14qXzM1XyQl'
                                                        );
                                        
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdProduto                  INTEGER = public.dekryptosgraphein(pIdProduto);
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

        UPDATE Public.Produto
        SET
            ATIVO = 'N',
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdProduto;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Produto excluído com sucesso.',
            'idProduto', pIdProduto
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar a exclusão.',
            'idProduto', pIdProduto
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
CREATE OR REPLACE FUNCTION PUBLIC.ALTERARPRODUTO(
    pIdAlteracao        VARCHAR,
    pIdProduto          VARCHAR,
    pDescricao          PUBLIC.PRODUTO.DESCRICAO%TYPE,
    pCodigoProduto      PUBLIC.PRODUTO.CODIGOPRODUTO%TYPE,
    pValorVenda         PUBLIC.PRODUTO.VALORVENDA%TYPE, 
    pQuantidade         PUBLIC.PRODUTO.QUANTIDADE%TYPE,     
    pAtivo              PUBLIC.PRODUTO.ATIVO%TYPE
)
  RETURNS JSON AS $$

/*
Documentação
Arquivo Fonte.....: produto.sql
Objetivo..........: Excluir um produto
Autor.............: Cleber Spirlandeli
Data..............: 25/11/2017
Ex................:
                    SELECT * FROM PUBLIC.ALTERARPRODUTO(
                                                        'MjAxNy0xMS0yNSAxMF4qXzQzXyQl',
                                                        'MjAxNy0xMS0yNSAwOV4qXzVfJCU=',
                                                        'Descrição Produto Alterado',
                                                        8899,
                                                        '123,45',
                                                        20,
                                                        'S'
                                                        );
*/

DECLARE vErrorProcedure             TEXT;
        vErrorMessage               TEXT;
        vIdAlteracao                INTEGER = public.dekryptosgraphein(pIdAlteracao);
        vIdProduto                  INTEGER = public.dekryptosgraphein(pIdProduto);
        vTipoColaboradorAlteracao   VARCHAR;
        vQuantidade                 INTEGER;

BEGIN
  
    SELECT 
         c.tipo,
         p.quantidade
    INTO 
        vTipoColaboradorAlteracao,
        vQuantidade
    FROM 
        PUBLIC.Colaborador c,
        PUBLIC.Produto p
    WHERE 
            c.id = vIdAlteracao
        AND c.ativo = 'S'
        AND p.id = vIdProduto;

    IF  vTipoColaboradorAlteracao = 'Gestor' 
        AND vTipoColaboradorAlteracao IS NOT NULL
        AND vQuantidade IS NOT NULL
    THEN

        IF (vQuantidade - pQuantidade) < 0 THEN         -- Regra somente para exemplo de uma possível validação
            RETURN
            json_build_object(
                'success', false,
                'message', 'Quantidade em estoque do produto é menor do que a quantidade que se deseja comprar.',
                'idProduto', pIdProduto
            );
        ELSEIF (vQuantidade - pQuantidade) = 0 THEN     -- Regra somente para exemplo de uma possível validação
            pAtivo = 'N';
        END IF;

        UPDATE Public.Produto
        SET
            DESCRICAO = pDescricao,
            CODIGOPRODUTO = pCodigoProduto,
            VALORVENDA = pValorVenda,
            QUANTIDADE = pQuantidade,
            ATIVO = pAtivo,
            IDALTERACAO = vIdAlteracao, 
            DATAALTERACAO = CURRENT_TIMESTAMP 
        WHERE  
            id = vIdProduto;
        
        RETURN
        json_build_object(
            'success', true,
            'message', 'Produto alterado com sucesso.',
            'idProduto', pIdProduto
        );

    ELSE
        RETURN
        json_build_object(
            'success', false,
            'message', 'Somente Gestores podem realizar alteração.',
            'idProduto', pIdProduto
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