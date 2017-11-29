CREATE OR REPLACE FUNCTION public.kryptosGraphein(texto INTEGER)
  RETURNS VARCHAR AS $$

/*
Documentação
Arquivo Fonte.....: kryptosGraphein.sql
Objetivo..........: Criptografar um texto ou numero
Autor.............: Cleber Spirlandeli
Data..............: 22/11/2017
Ex................:
  SELECT * FROM Public.KryptosGraphein(99999999);
*/

DECLARE ddmmaa            VARCHAR = CURRENT_TIMESTAMP;
        dma               VARCHAR = substring(ddmmaa FROM 1 FOR 13);
        incrementarInicio VARCHAR = '^*_';
        incrementarFim    VARCHAR = '_$%';
        concatenar        VARCHAR;

BEGIN

  -- Montando a string com outros elementos
  concatenar = (dma || incrementarInicio || texto || incrementarFim) :: VARCHAR;

  --RAISE NOTICE 'var %', concatenar;

  -- Criptografando
  concatenar = encode(concatenar :: BYTEA, 'base64') :: VARCHAR;

  RETURN concatenar :: VARCHAR;
END;
$$ LANGUAGE plpgsql;






CREATE OR REPLACE FUNCTION public.deKryptosGraphein(texto VARCHAR)
  RETURNS INTEGER AS $$

/*
Documentação
Arquivo Fonte.....: kryptosGraphein.sql
Objetivo..........: Descriptografar um texto ou número
Autor.............: Cleber Spirlandeli
Data..............: 22/11/2017
Ex................:
    SELECT * FROM Public.DeKryptosGraphein('MjAxNy0xMS0yMiAxOF4qXzk5OTk5OTk5XyQl');
*/

DECLARE ddmmaa            VARCHAR = CURRENT_TIMESTAMP;
        dma               VARCHAR = substring(ddmmaa FROM 1 FOR 13);
        incrementarInicio VARCHAR = '^*_';
        incrementarFim    VARCHAR = '_$%';
        descriptografar   TEXT;
        dmaDescripto      TEXT;

BEGIN

  descriptografar = CONVERT_FROM(DECODE(texto, 'base64'), 'UTF-8');

	--RAISE NOTICE 'var %', descriptografar;

  dmaDescripto = substring(descriptografar FROM 1 FOR 13);

  IF dmaDescripto = dma
  THEN
    -- Removendo adicionais na string
    descriptografar = SUBSTR(descriptografar, 15, char_length(descriptografar)); -- Removendo a data
    descriptografar = TRIM(descriptografar, incrementarInicio); -- Removendo caracter x.
    descriptografar = TRIM(descriptografar, incrementarFim); -- Removendo caracter x.

    RETURN descriptografar :: INTEGER;

  ELSE
    RETURN 0 :: INTEGER;
  END IF;

--   EXCEPTION WHEN OTHERS
--   THEN
--     RETURN 0 :: INTEGER;

END;
$$ LANGUAGE plpgsql;