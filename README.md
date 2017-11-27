# Projeto LuizaLabs - Magalu-Finder

- Para executar o Magalu-Finder é necessario ter instalado as seguintes ferramentas: __

Banco de Dados: [PostgreSQL] 9.6 ou superior. Clique para realizar o [download do PostgreSQL]. __
Servidor: [Node Js] 8 ou superior. __

Ferramenta para gerenciar o banco de dados, sugiro o [pgAdmin 4], mas fique a vontade para utilizar o de sua preferencia. Clique para realizar o [download do pgAdmin]. __

Ferramenta de desenvolvimento, sugiro o [Visual Studio], mas fique a vontade para utilizar o de sua preferencia. Clique para realizar o [download do VS Code]. __

1. Após instalar e configurar as ferramentas, é necessário configurar o banco de dados, abra o pgAdmin 4. __
...Execute os códigos que estão no arquivo **CriarBanco.sql** __
...Caminho: /backend/src/config/database/CriarBanco.sql __

...Execute os códigos que estão no arquivo **kryptosGraphein.sql** __
...Caminho: /backend/src/config/database/kryptosGraphein.sql __

...Execute os códigos que estão no arquivo **colaborador.sql** __
...Caminho: /backend/src/gestorLoja/colaborador.sql __

...Execute os códigos que estão no arquivo **produto.sql** __
...Caminho: /backend/src/gestorProdutro/produto.sql __

...Execute os códigos que estão no arquivo **login.sql** __
...Caminho: /backend/src/login/login.sql __

...Execute os códigos que estão no arquivo **login.sql** __
...Caminho: /backend/src/loja/loja.sql __

2. **Após executar todos os comandos SQL:** __
Acessar a pasta **FRONTEND** e com o prompt de comando executar: __
...**npm install** _aguardar o download ser concluído_ __
...**npm rum dev** _para executar o servidor em ambiende de desenvolvimento_ __
...**pm2 start app** _para executar o servidor em ambiende de produção_ __


3. **Após executar o servidor Node JS, entre na pasta FRONTEND e executar:**
...**npm install** _aguardar o download ser concluído_ __
...**npm rum dev** _para executar o servidor em ambiende de desenvolvimento_ __
...**npm rum production** _para executar o servidor em ambiende de produção_ __

### License
Copyright (c) 2017 Cleber R. Spirlandeli (contato.cleberrezende@gmail.com)

[PostgreSQL]: https://www.postgresql.org/
[download do PostgreSQL]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows

[Node Js]: https://nodejs.org/en/

[pgAdmin 4]: https://www.pgadmin.org/
[download do pgAdmin]: https://www.pgadmin.org/download/

[Visual Studio]: https://code.visualstudio.com/
[download do VS Code]: https://code.visualstudio.com/Download
