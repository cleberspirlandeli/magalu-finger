const LoginCtrl = require('./../core/login/loginController.js');

module.exports = function (app) {

    app.route('/login/')
        .post(LoginCtrl.login);
};