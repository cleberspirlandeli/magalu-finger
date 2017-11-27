/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    inserirProduto,
    listarProduto,
    excluirProduto,
    alterarProduto
};

async function inserirProduto(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.INSERIRPRODUTO($1, $2, $3, $4, $5);",
        [
            params.idInsercao,
            params.descricao,
            params.codigoProduto,
            params.valorVenda,
            params.quantidade,
        ]
    );

    var result = res.rows[0].inserirproduto;
    return result;
}

async function listarProduto(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.LISTARPRODUTO($1);",
        [
            params.idProduto
        ]
    );

    var result = res.rows;
    return result;
}

async function excluirProduto(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.EXCLUIRPRODUTO($1, $2);",
        [
            params.idAlteracao,
            params.idProduto
        ]
    );
    var result = res.rows[0].excluirproduto;
    return result;
}

async function alterarProduto(params) {
    const res = await pg.query("SELECT * FROM PUBLIC.ALTERARPRODUTO($1, $2, $3, $4, $5, $6, $7);",
        [
            params.idAlteracao,
            params.idProduto,
            params.descricao,
            params.codigoProduto,
            params.valorVenda,
            params.quantidade,
            params.ativo
        ]
    );

    var result = res.rows[0].alterarproduto;
    return result;
}