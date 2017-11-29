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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With,Content-Type');
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});

app.all('/api/*', function (req, res, next) {
    if (req.method !== 'OPTIONS') {
        Login.validarToken(req, res, next);
    }else{
        res.end();
    }
});

require('./../route/login.js')(app);
require('./../route/colaborador.js')(app);
require('./../route/loja.js')(app);
require('./../route/produto.js')(app);

module.exports = app;