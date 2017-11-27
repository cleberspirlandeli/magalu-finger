/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    login
};

function login(params, callback) {
    let row;
    pg.query("SELECT * FROM PUBLIC.LOGIN($1, $2);",
        [
            params.usuario,
            params.senha
        ], (err, data) => {
            if (err) {
                err = {
                    httpCode: 500,
                    message: `Erro ao listar usuário: ERROR (' ${err.message} ')`
                };
            }
            else if (data.rows.length == 0) {
                var err = {
                    httpCode: 403,
                    message: `Usuário ou senha inválido`,
                };
            }
            if (!err) {
                row = data.rows;
            }
            callback(err, (err ? err.httpCode : 200), row);
        }
    )
}