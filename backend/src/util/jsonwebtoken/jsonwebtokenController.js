const Repository = require('./jsonwebtokenRepository.js');
const jwt = require('jsonwebtoken');


/*  cont data = new Date();
    const dia = data.getDate(); -- Dia do mês
*/

// Segredo para se gerar o token
const chaveSecreta = 'S00Bomb$%Men=fdd}de7';
const tempoDeSessao = 60 * 45; // 60 Segundos * a quantidade de minutos que deseja

// Segredo para gerar cryptografia
// DOCUMENTAÇÂO - http://lollyrock.com/articles/nodejs-encryption/
const crypto = require('crypto'); 
const algorithm = 'aes-256-ctr';
const password = '+xMF#qX!';

module.exports = {
    gerarToken,
    validarToken,
    refreshToken
}

function gerarToken(params, callback) {
    // Fazer o select no banco para verificar se encontra o usuário e senha
    Repository.gerarToken(params, (err, httpCode, dados) => {

        if (err) {
            callback(err, httpCode, { sucesso: false, message: err.tipo.message });
        } else {
            let code = {
                login: dados.USUARIO,        // Parametros para se gerar o token
                email: dados.USUARIO_EMAIL,  // Parametros para se gerar o token
                id: dados.USUARIO_ID,        // Parametros para se gerar o token
                tipo: dados.USUARIO_TIPO,    // Parametros para se gerar o token
                userDb: dados.USUARIO_USER,  // Parametros para se gerar o token
                data: new Date()             // Parametros para se gerar o token
            }

            let _token = jwt.sign(           // Gerar o token
                code,                        // Parametros que serão gravados na criptografia
                chaveSecreta,                // Segredo para se gerar o token - gRuPOaMazOnaS
                { expiresIn: tempoDeSessao } // Tempo de válidade do token - 60 min
            );

            let cipher = crypto.createCipher(algorithm,password); // Criptografar Token
            let crypted = cipher.update(_token,'utf8','hex');     // Texto, formato que esta, formato que deve ficar
            crypted += cipher.final('hex');                       // Texto final criptografado  

            callback(null, httpCode, { sucesso: true, token: crypted });
        }
    });
}

function validarToken(req, callback) {
    if (req.authorization && req.authorization.split(':')[0] === 'token') {

        // Descriptografar o Token
        let decipher = crypto.createDecipher(algorithm,password);
        let dec = decipher.update(req.authorization.split(':')[1],'hex','utf8');
        dec += decipher.final('utf8');
        let tokenDecriptografado = dec;

        jwt.verify(tokenDecriptografado, chaveSecreta, (err, decode) => {

            if (err) {
                if (err.message === 'invalid token') {
                    callback(true, { sucesso: false, message: "Permissão de acesso inválido. Por favor, efetue login novamente." });
                } else if (err.message === 'jwt expired') {
                    callback(true, { sucesso: false, message: "Sua sessão expirou por inatividade. Por favor, efetue login novamente." });
                } else {
                    callback(true, { sucesso: false, message: "Sessão inválida. Por favor, efetue login novamente." });
                }
            } else {
                let mensagem = {
                    sucesso: true,
                    conteudo: {
                        login: decode.login,
                        email: decode.email,
                        id: decode.id,
                        tipo: decode.tipo,
                        userDb: decode.userDb,
                        iat: decode.iat,
                        exp: decode.exp,
                        data: decode.data 
                    }
                }
                callback(false, mensagem);
            }

        });

    } else {
        callback(true, 401, { sucesso: false, message: "Permissão de acesso inválido. Por favor, efetue login novamente." });
    }
}

function refreshToken(decode, callback) {

    if (!decode.sucesso) {
        callback(true, { sucesso: false, message: "Sessão inválida. Por favor, efetue login novamente."});
    }else{

        let code = {
            login: decode.conteudo.login,       // Parametros para se gerar o token
            email: decode.conteudo.email,       // Parametros para se gerar o token
            id: decode.conteudo.id,             // Parametros para se gerar o token
            tipo: decode.conteudo.tipo,         // Parametros para se gerar o token
            userDb: decode.conteudo.userDb,     // Parametros para se gerar o token
            data: decode.conteudo.data          // Parametros para se gerar o token
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

        callback(null, { sucesso: true, token: crypted });
    }
    
}