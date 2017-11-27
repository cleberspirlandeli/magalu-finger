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
const tempoDeSessao = 60 * 45;



module.exports = {
    login,
    validarToken,
    refreshToken
};

function login(params, callback) {
    if (!params) {
        callback(err, 403, { success: false, message: 'Usuário ou senha inválido' });
    } else {

        // Segredo para se gerar o token
        var d = new Date();
        var dia = d.getDate(); // Dia do mês
        if (dia > 0 && dia < 11) {          // De 1 a 10
            var chaveSecreta = 'S00Bomb$%Men=fdd}de7';
            var password = '+xMF#qX!';
        }else if (dia > 10 && dia < 21) {   // De 11 a 20
            var chaveSecreta = '7c]3cBeauty1e!9Miss66e9';
            var password = '126c!#Z6';
        }else if (dia > 20 && dia < 32) {   // De 21 a 31
            var chaveSecreta = '3#cAdvent1d1dEditorial92+f';
            var password = '4d3#$Kk8';
        } else {
            var chaveSecreta = '!!30Asset0@a0dValve9f';
            var password = 'b5c*0b!8';
        }

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

        callback(null, 200, { token: crypted });
    }
}

function validarToken(params, callback) {
    if (params.authorization && params.authorization.split(':')[0] === 'token') {

        // Segredo para se gerar o token
        var d = new Date();
        var dia = d.getDate(); // Dia do mês
        if (dia > 0 && dia < 11) {          // De 1 a 10
            var chaveSecreta = 'S00Bomb$%Men=fdd}de7';
            var password = '+xMF#qX!';
        }else if (dia > 10 && dia < 21) {   // De 11 a 20
            var chaveSecreta = '7c]3cBeauty1e!9Miss66e9';
            var password = '126c!#Z6';
        }else if (dia > 20 && dia < 32) {   // De 21 a 31
            var chaveSecreta = '3#cAdvent1d1dEditorial92+f';
            var password = '4d3#$Kk8';
        } else {
            var chaveSecreta = '!!30Asset0@a0dValve9f';
            var password = 'b5c*0b!8';
        }

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
}

function refreshToken(decode, callback) {
    
        if (!decode.success) {
            callback(true, { success: false, message: "Sessão inválida. Por favor, efetue login novamente."});
        }else{
            
            // Segredo para se gerar o token
            var d = new Date();
            var dia = d.getDate(); // Dia do mês
            if (dia > 0 && dia < 11) {          // De 1 a 10
                var chaveSecreta = 'S00Bomb$%Men=fdd}de7';
                var password = '+xMF#qX!';
            }else if (dia > 10 && dia < 21) {   // De 11 a 20
                var chaveSecreta = '7c]3cBeauty1e!9Miss66e9';
                var password = '126c!#Z6';
            }else if (dia > 20 && dia < 32) {   // De 21 a 31
                var chaveSecreta = '3#cAdvent1d1dEditorial92+f';
                var password = '4d3#$Kk8';
            } else {
                var chaveSecreta = '!!30Asset0@a0dValve9f';
                var password = 'b5c*0b!8';
            }

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
            let cipher = crypto.createCipher(algorithm,password); // Criptografar Token
            let crypted = cipher.update(_token,'utf8','hex');     // Texto, formato que esta, formato que deve ficar
            crypted += cipher.final('hex');                       // Texto final criptografado 
    
            callback(null, { success: true, data:{token: crypted }});
        }
        
    }