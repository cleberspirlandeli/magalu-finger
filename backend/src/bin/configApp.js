/**
 * Created by Cleber Rezende 10/11/2017.
 */
'use strict';

let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const Login = require('./../core/login/loginController.js')

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.all('/api/*', function (req, res, next) {
    // console.error(' ===== TODAS AS ROTAS ===== ');
    if (req.method !== 'GET' && !req._body) {
        res.clearCookie('token');
        res.status(401).json({ success: false, data: { menssage: 'Sessão inválida. Por favor, efetue login novamente.' } }).end(); // renderizar para a tela de login
    } else {
        Login.validarToken(req, res, next);
    }
});

require('./../route/login.js')(app);
require('./../route/colaborador.js')(app);
require('./../route/loja.js')(app);
require('./../route/produto.js')(app);

module.exports = app;