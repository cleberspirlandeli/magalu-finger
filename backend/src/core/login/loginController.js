/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const async = require('async');

const LoginValidation = require('./loginValidation.js');
const LoginRepository = require('./loginRepository.js');
const LoginJwt = require('./loginJwt.js');


module.exports = {
    login,
    validarToken
};

function login(req, res) {
    // console.error(' ======= ROTA LOGIN ======= ');

    if (!req._body) {
        res.status(401).json({ mensagem: 'É necessário realizar o login' }).end(); // renderizar para a tela de login
    } else {

        let params = {
            usuario: req.body.usuario ? req.body.usuario : null,
            senha: req.body.senha ? req.body.senha : null
        }

        async.waterfall([
            (callback) => {
                LoginValidation.login(params, (err, httpCode, result) => {
                    if (err) {
                        callback(err, httpCode, result);
                    } else {
                        callback(null, httpCode, result);
                    }
                });
            },
            (httpCode, result, callback) => {
                LoginRepository.login(params, (err, httpCode, result) => {
                    if (err) {
                        callback(err, httpCode, result);
                    } else {
                        callback(null, httpCode, result);
                    }
                });
            },
            (httpCode, result, callback) => {
                LoginJwt.login(result, (err, httpCode, result) => {
                    if (err) {
                        callback(err, httpCode, result);
                    } else {
                        callback(null, httpCode, result);
                    }
                });
            }
        ], (err, httpCode, result) => {
            if (err) {
                res.clearCookie('token');
                res.status(httpCode).json({ mensagem: result }).end(); // renderizar para a tela de login
            } else {
                res.clearCookie('token');
                res.cookie('token', result.token, { maxAge: 60000, httpOnly: true });
                res.status(httpCode).json({ success: true, id: result.id, token: result.token });
            }
        });
    }
}


function validarToken(req, res, next) {
    async.waterfall([
        (callback) => {
            LoginJwt.validarToken(req.headers, (err, result) => { // Mensagem recebe o decode do Token ou mensagem de erro
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        },
        (decode, callback) => {
            // Chama o Refresh Token
            LoginJwt.refreshToken(decode, (err, result) => {
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        }
    ], (err, result) => {
        if (err) {
            res.status(401)
                .json(result);
        } else {
            res.clearCookie('token')
                .cookie('token', result.data.token, { maxAge: 60000, httpOnly: true });
            next();
        }
    });
}
