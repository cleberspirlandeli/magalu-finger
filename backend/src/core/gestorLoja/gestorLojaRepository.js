/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    inserirColaborador,
    listarColaborador,
    excluirColaborador,
    alterarColaborador
};

async function inserirColaborador(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.INSERIRCOLABORADOR($1, $2, $3);",
        [
            params.nomeColaborador,
            params.senha,
            params.tipoColaborador
        ]
    );

    var result = res.rows[0].inserircolaborador;
    return result;
}

async function listarColaborador(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.LISTARCOLABORADOR($1, $2);",
        [
            params.idColaborador,
            params.pesquisar
        ]
    );

    var result = res.rows;
    return result;
}

async function excluirColaborador(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.EXCLUIRCOLABORADOR($1, $2);",
        [
            params.idAlteracao,
            params.idColaborador
        ]
    );
    var result = res.rows[0].excluircolaborador;
    return result;
}

async function alterarColaborador(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.ALTERARCOLABORADOR($1, $2, $3, $4, $5, $6);",
        [
            params.idAlteracao,
            params.idColaborador,
            params.nomeColaborador,
            params.tipoColaborador,
            params.ativo,
            params.senhaColaborador
        ]
    );

    var result = res.rows[0].alterarcolaborador;
    return result;
}