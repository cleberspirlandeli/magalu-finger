/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'
const jwt = require('jsonwebtoken');

// Segredo para gerar cryptografia
// DOCUMENTAÇÂO - http://lollyrock.com/articles/nodejs-encryption/
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

// 60 Segundos * a quantidade de minutos que deseja
const tempoDeSessao = 60 * 60;

const SecretKey = require('./../../config/secretKey/secretKey.js')


module.exports = {
    login,
    validarToken,
    refreshToken
};

async function login(params, callback) {
    if (!params) {
        callback(err, 403, { success: false, message: 'Usuário ou senha inválido' });
    } else {

        // Segredo para se gerar o token
        var chaveSecreta = await SecretKey('token');
        var password = await SecretKey('crypto');

        let code = {
            login: params[0].nome,      // Parametros para gerar o token
            id: params[0].id,           // Parametros para gerar o token
            tipo: params[0].tipo,       // Parametros para gerar o token
            dataSessao: new Date()      // Parametros para gerar o token
        }

        let _token = jwt.sign(           // Gerar o token
            code,                        // Parametros que serão gravados na criptografia
            chaveSecreta,                // Segredo para se gerar o token - gRuPOaMazOnaS
            { expiresIn: tempoDeSessao } // Tempo de válidade do token - 60 min
        );

        let cipher = crypto.createCipher(algorithm, password); // Criptografar Token
        let crypted = cipher.update(_token, 'utf8', 'hex');    // Texto, formato que esta, formato que deve ficar
        crypted += cipher.final('hex');                        // Texto final criptografado  

        callback(null, 200, { token: crypted, id: code.id });
    }
}

async function validarToken(params, callback) {

    // Segredo para se gerar o token
    var chaveSecreta = await SecretKey('token');
    var password = await SecretKey('crypto');

    try {
        if (params.authorization && params.authorization.split(':')[0] === 'token') {
            // Descriptografar o Token
            let decipher = crypto.createDecipher(algorithm, password);
            let dec = decipher.update(params.authorization.split(':')[1], 'hex', 'utf8');
            dec += decipher.final('utf8');
            let tokenDecriptografado = dec;

            jwt.verify(tokenDecriptografado, chaveSecreta, (err, decode) => {
                if (err) {
                    if (err.message === 'invalid token') {
                        callback(true, { success: false, message: "Permissão de acesso inválido. Por favor, efetue login novamente." });
                    } else if (err.message === 'jwt expired') {
                        callback(true, { success: false, message: "Sua sessão expirou por inatividade. Por favor, efetue login novamente." });
                    } else {
                        callback(true, { success: false, message: "Sessão inválida. Por favor, efetue login novamente." });
                    }
                } else {
                    let message = {
                        success: true,
                        conteudo: {
                            login: decode.login,
                            id: decode.id,
                            tipo: decode.tipo,
                            iat: decode.iat,
                            exp: decode.exp,
                            dataSessao: decode.dataSessao
                        }
                    }
                    callback(false, message);
                }

            });

        } else {
            callback(true, { success: false, message: "Permissão de acesso inválido. Por favor, efetue login novamente." });
        }
    } catch (e) {
        callback(true, { success: false, message: "Permissão de acesso inválido. Por favor, efetue login novamente." });
    }
}

async function refreshToken(decode, callback) {

    if (!decode.success) {
        callback(true, { success: false, message: "Sessão inválida. Por favor, efetue login novamente." });
    } else {

        // Segredo para se gerar o token
        var chaveSecreta = await SecretKey('token');
        var password = await SecretKey('crypto');

        let code = {
            login: decode.conteudo.login,               // Parametros para se gerar o token
            id: decode.conteudo.id,                     // Parametros para se gerar o token
            tipo: decode.conteudo.tipo,                 // Parametros para se gerar o token
            dataSessao: decode.conteudo.dataSessao      // Parametros para se gerar o token
        }

        let _token = jwt.sign(                  // Gerar o token
            code,                               // Parametros que serão gravados na criptografia
            chaveSecreta,                       // Segredo para se gerar o token - gRuPOaMazOnaS
            { expiresIn: tempoDeSessao }        // Tempo de válidade do token - 60 min
        );

        // Criptografar Token
        let cipher = crypto.createCipher(algorithm, password); // Criptografar Token
        let crypted = cipher.update(_token, 'utf8', 'hex');     // Texto, formato que esta, formato que deve ficar
        crypted += cipher.final('hex');                       // Texto final criptografado 

        callback(null, { success: true, data: { token: crypted } });
    }

}