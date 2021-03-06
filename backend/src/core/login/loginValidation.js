/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ValidatiorParams = require('./../../util/validation/validator.js');

module.exports = {
    login
};

async function login(params, callback) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // Usuário
    valParams.isRequired(params.usuario, 'Usuário é obrigatório');
    valParams.isString(params.usuario, 'O usuário deve ser uma string');
    valParams.isMinLen(params.usuario, 2, 'O usuário deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.usuario, 50, 'O usuário deve ser menor que 50 (cinquenta)');

    // Senha
    valParams.isRequired(params.senha, 'A senha é obrigatório');
    valParams.isString(params.senha, 'A senha deve ser uma string');
    valParams.isMinLen(params.senha, 5, 'A senha deve ser maior que 5 (cinco)');
    valParams.isMaxLen(params.senha, 200, 'A senha deve ser menor que 200');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        callback(true, 400, valParams.errors());
    } else {
        callback(false, 200, valParams.errors());
    }
}