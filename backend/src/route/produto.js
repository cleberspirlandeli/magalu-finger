const ProdutoCtrl = require('./../core/gestorProduto/produtoController.js');

module.exports = function (app) {

    app.route('/api/produto/:idinsercao')
        .post(ProdutoCtrl.inserirProduto);

    app.route('/api/produto')
        .get(ProdutoCtrl.listarProduto);

    app.route('/api/produto/:idproduto')
        .get(ProdutoCtrl.listarProduto);
    
    app.route('/api/produto/:idalteracao/:idproduto')
        .put(ProdutoCtrl.alterarProduto)
        .delete(ProdutoCtrl.excluirProduto);
};