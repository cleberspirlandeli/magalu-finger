/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ValidatiorParams = require('./../../util/validation/validator.js');

module.exports = {
    inserirLoja,
    listarLoja,
    excluirLoja,
    alterarLoja
};

async function inserirLoja(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Insercao
    valParams.isRequired(params.idInsercao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idInsercao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idInsercao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idInsercao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Descrição Loja
    valParams.isRequired(params.descricao, 'A descrição da loja é obrigatório');
    valParams.isString(params.descricao, 'O nome da loja deve ser uma string');
    valParams.isMinLen(params.descricao, 2, 'O nome da loja deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.descricao, 100, 'O nome da loja deve ser menor que 100 (cem)');

    // Codigo Filial Loja
    valParams.isRequired(params.codigoFilial, 'O código da loja é obrigatório');
    valParams.isNumber(params.codigoFilial, 'O código da loja deve ser um número');
    valParams.isMinLen(params.codigoFilial, 2, 'O código da loja deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.codigoFilial, 10, 'O código da loja deve ser menor que 10 (dez)');

    // CEP Loja
    valParams.isRequired(params.cep, 'O cep da loja é obrigatório');
    valParams.isString(params.cep, 'O cep da loja deve ser uma string');
    valParams.isMinLen(params.cep, 7, 'O cep da loja deve ser maior que 7 (sete)');
    valParams.isMaxLen(params.cep, 12, 'O cep da loja deve ser menor que 100 (doze)');

    // Cidade Loja
    valParams.isRequired(params.cidade, 'A cidade da loja é obrigatório');
    valParams.isString(params.cidade, 'A cidade da loja deve ser uma string');
    valParams.isMinLen(params.cidade, 3, 'A cidade da loja deve ser maior que 3 (três)');
    valParams.isMaxLen(params.cidade, 50, 'A cidade da loja deve ser menor que 50 (cinquenta)');

    // Estado Loja
    valParams.isRequired(params.estado, 'O estado da loja é obrigatório');
    valParams.isString(params.estado, 'O estado da loja deve ser uma string');
    valParams.isFixedLen(params.estado, 2, 'O estado da loja deve ter 2 (três) caracteres');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function listarLoja(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Loja
    valParams.isString(params.idColaborador, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idColaborador, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idColaborador, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function excluirLoja(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Loja
    valParams.isRequired(params.idLoja, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idLoja, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idLoja, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idLoja, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function alterarLoja(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Alteração
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Loja
    valParams.isRequired(params.idLoja, 'Identificado da loja é obrigatório');
    valParams.isString(params.idLoja, 'O identificado da loja deve ser uma string');
    valParams.isMinLen(params.idLoja, 10, 'O identificado da loja deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idLoja, 100, 'O identificado da loja deve ser menor que 100 (cem)');

    // Descricao Loja
    valParams.isRequired(params.descricao, 'A descrição da loja é obrigatório');
    valParams.isString(params.descricao, 'A descrição da loja deve ser uma string');
    valParams.isMinLen(params.descricao, 2, 'A descrição da loja deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.descricao, 100, 'A descrição da loja deve ser menor que 100 (cem)');

    // Código Filial Loja
    valParams.isRequired(params.codigoFilial, 'O código da loja é obrigatório');
    valParams.isNumber(params.codigoFilial, 'O código da loja deve ser um número');
    valParams.isMinLen(params.codigoFilial, 3, 'O código da loja deve ser maior que 3 (três)');
    valParams.isMaxLen(params.codigoFilial, 20, 'O código da loja deve ser menor que 20 (vinte)');

    // CEP Loja
    valParams.isRequired(params.cep, 'O CEP da loja é obrigatório');
    valParams.isString(params.cep, 'O CEP da loja deve ser uma string');
    valParams.isMinLen(params.cep, 7, 'O CEP da loja deve ser maior que 7 (sete)');
    valParams.isMaxLen(params.cep, 12, 'O CEP da loja deve ser menor que 100 (doze)');

    // Cidade Loja
    valParams.isRequired(params.cidade, 'A cidade da loja é obrigatório');
    valParams.isString(params.cidade, 'A cidade da loja deve ser uma string');
    valParams.isMinLen(params.cidade, 2, 'A cidade da loja deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.cidade, 100, 'A cidade da loja deve ser menor que 100 (cem)');

    // Estado Loja
    valParams.isRequired(params.estado, 'O estado da loja é obrigatório');
    valParams.isString(params.estado, 'O estado da loja deve ser uma string');
    valParams.isMinLen(params.estado, 2, 'O estado da loja deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.estado, 100, 'O estado da loja deve ser menor que 100 (cem)');

    // Ativo Loja
    valParams.isRequired(params.ativo, 'O Status da loja é obrigatório');
    valParams.isString(params.ativo, 'O Status da loja deve ser uma string');
    valParams.isFixedLen(params.ativo, 1, 'O Status da loja deve ter 1 (um) caracter');
    valParams.isYesOrNo(params.ativo, 'O Status do produto esta incorreto');
    
    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}
