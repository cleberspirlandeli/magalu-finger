//const oracledb = require('oracledb');
//oracledb.outFormat = oracledb.OBJECT;
//const dbConfig = require('./../../database/dbConfig.js');

const connectionString = require('./../../config/database/coneccao.js')
const { Pool } = require('pg')
const pg = new Pool({ connectionString: connectionString });

module.exports = {
    gerarToken
}

function gerarToken(params, callback) {

    let row;
    pg.query("SELECT * FROM PUBLIC.LOGIN($1, $2);",
        [
            params.usuario,
            params.senha
        ], (err, res) => {
            if (err) {
                if (err) {
                    err = {
                        tipo: {
                            httpCode: 500,
                            errorRepository: `inserirHorario: ERROR (' ${err.message} ')`
                        }
                    };
                }
                else if (rows[0].login.lenght === 0) {
                    var err = {
                        tipo: {
                            httpCode: 403,
                            message: rows[0].inserirhorario.message,
                            errorRepository: `login: ${rows[0].inserirhorario}`
                        }
                    };
                }
            }
            if (!err) {
                row = rows[0].login;
            }
        })
    callback(err, (err ? err.tipo.httpCode : 200), row);
}