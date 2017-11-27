const ColaboradorCtrl = require('./../core/gestorLoja/gestorLojaController.js');

module.exports = function (app) {

    app.route('/api/colaborador/')
        .get(ColaboradorCtrl.listarColaborador)
        .post(ColaboradorCtrl.inserirColaborador);

    app.route('/api/colaborador/:id')
        .get(ColaboradorCtrl.listarColaborador);

    app.route('/api/colaborador/:idalteracao/:idcolaborador')
        .delete(ColaboradorCtrl.excluirColaborador)
        .put(ColaboradorCtrl.alterarColaborador);
};