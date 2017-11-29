/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    inserirLoja,
    listarLoja,
    excluirLoja,
    alterarLoja
};

async function inserirLoja(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.INSERIRLOJA($1, $2, $3, $4, $5, $6);",
        [
            params.idInsercao,
            params.descricao,
            params.codigoFilial,
            params.cep,
            params.cidade,
            params.estado
        ]
    );
    var result = res.rows[0].inserirloja;
    return result;
}

async function listarLoja(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.LISTARLOJA($1, $2);",
        [
            params.idLoja,
            params.pesquisar
        ]
    );
    var result = res.rows;
    return result;
}

async function excluirLoja(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.EXCLUIRLOJA($1, $2);",
        [
            params.idAlteracao,
            params.idLoja
        ]
    );
    var result = res.rows[0].excluirloja;
    return result;
}

async function alterarLoja(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.ALTERARLOJA($1, $2, $3, $4, $5, $6, $7, $8);",
        [
            params.idAlteracao,
            params.idLoja,
            params.descricao,
            params.codigoFilial,
            params.cep,
            params.cidade,
            params.estado,
            params.ativo
        ]
    );
    var result = res.rows[0].alterarloja;
    return result;
}