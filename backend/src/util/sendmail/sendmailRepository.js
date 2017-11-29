/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict';

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    sendmail
};

async function sendmail(params) {

    const resAlteracao = await pg.query("SELECT C.NOME, C.TIPO FROM COLABORADOR C WHERE C.ID = (SELECT * FROM PUBLIC.DEKRYPTOSGRAPHEIN($1));",
        [
            params.idAlteracao
        ]
    );

    const resColaborador = await pg.query("SELECT C.NOME, C.TIPO FROM COLABORADOR C WHERE C.ID = (SELECT * FROM PUBLIC.DEKRYPTOSGRAPHEIN($1));",
        [
            params.idColaborador
        ]
    );

    var result = {alterar: resAlteracao.rows, colaborador: resColaborador.rows};
    return {alterar: resAlteracao.rows, colaborador: resColaborador.rows};
}