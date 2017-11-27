const LojaCtrl = require('./../core/loja/lojaController.js');

module.exports = function (app) {

    app.route('/api/loja/:idinsercao')
        // .get(LojaCtrl.listarColaborador)
        .post(LojaCtrl.inserirLoja);

    app.route('/api/loja/')
        .get(LojaCtrl.listarLoja);

    app.route('/api/loja/:idloja')
        .get(LojaCtrl.listarLoja);

    app.route('/api/loja/:idalteracao/:idloja')
        .put(LojaCtrl.alterarLoja)
        .delete(LojaCtrl.excluirLoja);
};