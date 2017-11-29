![alt text][logo]

# Projeto LuizaLabs - Magalu-Finder

Tecnologias utilizadas: <br />
Node Js 8.9.0 <br />
React Js 15.4.2 <br />
NPM 5.5.1 <br /> 
PostgreSQL 9.6.6 <br /> <br />
___

- Para executar o Magalu-Finder é necessario ter instalado as seguintes ferramentas: <br />

Banco de Dados: [PostgreSQL] 9.6 ou superior. Clique para realizar o [download do PostgreSQL]. <br />
Servidor: [Node Js] 8 ou superior. <br />

Ferramenta para gerenciar o banco de dados, sugiro o [pgAdmin 4], mas fique a vontade para utilizar o de sua preferencia. Clique para realizar o [download do pgAdmin]. <br />

Ferramenta de desenvolvimento, sugiro o [Visual Studio], mas fique a vontade para utilizar o de sua preferencia. Clique para realizar o [download do VS Code]. <br />

1. Após instalar e configurar as ferramentas, é necessário configurar o banco de dados, abra o pgAdmin 4. <br />
+ Execute os códigos que estão no arquivo **CriarBanco.sql** <br />
 _Caminho: /backend/src/config/database/CriarBanco.sql_ <br /> <br />
+ Execute os códigos que estão no arquivo **kryptosGraphein.sql** <br />
 _Caminho: /backend/src/config/database/kryptosGraphein.sql_ <br /> <br />
+ Execute os códigos que estão no arquivo **colaborador.sql** <br />
 _Caminho: /backend/src/gestorLoja/colaborador.sql_ <br /> <br />
+ Execute os códigos que estão no arquivo **produto.sql** <br /> 
 _Caminho: /backend/src/gestorProdutro/produto.sql_ <br /> <br />
+ Execute os códigos que estão no arquivo **login.sql** <br />
 _Caminho: /backend/src/login/login.sql_ <br /> <br />
+ Execute os códigos que estão no arquivo **login.sql** <br />
 _Caminho: /backend/src/loja/loja.sql_ <br /> <br />


2. **Após executar todos os comandos SQL:** <br />
Acessar a pasta **BACKEND** e com o prompt de comando executar: <br />
**npm install** _aguardar o download ser concluído_ <br />
**npm rum dev** _para executar o servidor em ambiende de desenvolvimento_ <br />
**pm2 start app** _para executar o servidor em ambiende de produção_ <br />


3. **Após executar o servidor Node JS, entre na pasta FRONTEND e executar:** <br />
**npm install** _aguardar o download ser concluído_ <br />
**npm run dev** _para executar o servidor em ambiende de desenvolvimento_ <br />
**npm run production** _para executar o servidor em ambiende de produção_ <br />

---
### License
Copyright (c) 2017 Cleber R. Spirlandeli (contato.cleberrezende@gmail.com)

[logo]: https://github.com/cleberspirlandeli/magalu-finger/blob/master/ml.png "Magalu-Finger"

[PostgreSQL]: https://www.postgresql.org/
[download do PostgreSQL]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows

[Node Js]: https://nodejs.org/en/

[pgAdmin 4]: https://www.pgadmin.org/
[download do pgAdmin]: https://www.pgadmin.org/download/

[Visual Studio]: https://code.visualstudio.com/
[download do VS Code]: https://code.visualstudio.com/Download
