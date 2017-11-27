/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ValidatiorParams = require('./../../util/validation/validator.js');

module.exports = {
    inserirProduto,
    listarProduto,
    excluirProduto,
    alterarProduto
};

async function inserirProduto(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idInsercao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idInsercao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idInsercao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idInsercao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Descricao Produto
    valParams.isRequired(params.descricao, 'A descrição é obrigatório');
    valParams.isString(params.descricao, 'A descrição deve ser uma string');
    valParams.isMinLen(params.descricao, 2, 'A descrição deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.descricao, 100, 'A descrição deve ser menor que 100 (cem)');

    // Codigo Produto
    valParams.isRequired(params.codigoProduto, 'O código do produto é obrigatório');
    valParams.isNumber(params.codigoProduto, 'O código do produto deve ser um número');
    valParams.isMinLen(params.codigoProduto, 2, 'O código do produto deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.codigoProduto, 999999, 'O código do produto deve ser menor que 10 (dez)');

    // Valor Venda Produto
    valParams.isRequired(params.valorVenda, 'O preço de venda do produto é obrigatório');
    valParams.isNumber(params.valorVenda, 'O preço de venda do produto deve ser um número');
    valParams.isMinLen(params.valorVenda, 2, 'O preço de venda do produto deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.valorVenda, 10, 'O preço de venda do produto deve ser menor que 10 (dez)');

    // Quantidade Produto
    valParams.isRequired(params.quantidade, 'A quantidade do produto é obrigatório');
    valParams.isNumber(params.quantidade, 'A quantidade do produto deve ser um número');
    valParams.isMinLen(params.quantidade, 2, 'A quantidade do produto deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.quantidade, 10, 'A quantidade do produto deve ser menor que 10 (dez)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        params.valorVenda = params.valorVenda.replace('.', ',');
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function listarProduto(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Produto
    valParams.isString(params.idProduto, 'O identificado do produto deve ser uma string');
    valParams.isMinLen(params.idProduto, 10, 'O identificado do produto deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idProduto, 100, 'O identificado do produto deve ser menor que 100 (cem)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function excluirProduto(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Produto
    valParams.isRequired(params.idProduto, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idProduto, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idProduto, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idProduto, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function alterarProduto(params) {
    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Produto
    valParams.isRequired(params.idProduto, 'Identificado do produto é obrigatório');
    valParams.isString(params.idProduto, 'O identificado do produto deve ser uma string');
    valParams.isMinLen(params.idProduto, 10, 'O identificado do produto deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idProduto, 100, 'O identificado do produto deve ser menor que 100 (cem)');

    // Descrição Produto
    valParams.isRequired(params.descricao, 'A descrição do produto é obrigatório');
    valParams.isString(params.descricao, 'A descrição do produto deve ser uma string');
    valParams.isMinLen(params.descricao, 2, 'A descrição do produto deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.descricao, 100, 'A descrição do produto deve ser menor que 100 (cem)');

    // Codigo Produto
    valParams.isRequired(params.codigoProduto, 'O código do produto é obrigatório');
    valParams.isNumber(params.codigoProduto, 'O código do produto deve ser um número');
    valParams.isMinLen(params.codigoProduto, 2, 'O código do produto deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.codigoProduto, 10, 'O código do produto deve ser menor que 10 (dez)');


    // Valor Venda Produto
    valParams.isRequired(params.valorVenda, 'O preço de venda é obrigatório');
    valParams.isNumber(params.valorVenda, 'O preço de venda deve ser um número');
    valParams.isMinLen(params.valorVenda, 10, 'O preço de venda deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.valorVenda, 100000, 'O preço de venda deve ser menor que 100000');

    // Quantidade Produto
    valParams.isRequired(params.quantidade, 'A quantidade do produto é obrigatório');
    valParams.isNumber(params.quantidade, 'A quantidade do produto deve ser um número');
    valParams.isMinLen(params.quantidade, 10, 'A quantidade do produto deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.quantidade, 100000, 'A quantidade do produto deve ser menor que 100000');

    // Ativo Colaborador
    valParams.isRequired(params.ativo, 'O Status do produto é obrigatório');
    valParams.isString(params.ativo, 'O Status do produto deve ser uma string');
    valParams.isFixedLen(params.ativo, 1, 'O Status do produto deve ter 1 (um) caracter');
    valParams.isYesOrNo(params.ativo, 'O Status do produto esta incorreto');
    

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}
