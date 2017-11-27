/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ValidatiorParams = require('./../../util/validation/validator.js');

module.exports = {
    inserirColaborador,
    listarColaborador,
    excluirColaborador,
    alterarColaborador
};

async function inserirColaborador(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // Nome Colaborador
    valParams.isRequired(params.nomeColaborador, 'Nome do colaborador é obrigatório');
    valParams.isString(params.nomeColaborador, 'O nome do colaborador deve ser uma string');
    valParams.isMinLen(params.nomeColaborador, 2, 'O nome do colaborador deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.nomeColaborador, 100, 'O nome do colaborador deve ser menor que 100 (cem)');

    // Tipo Colaborador
    valParams.isRequired(params.tipoColaborador, 'O tipo do colaborador é obrigatório');
    valParams.isString(params.tipoColaborador, 'O tipo do colaborador deve ser uma string');
    valParams.isMinLen(params.tipoColaborador, 2, 'O tipo do colaborador deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.tipoColaborador, 10, 'O tipo do colaborador deve ser menor que 10 (dez)');

    // Tipo Colaborador
    valParams.isRequired(params.senha, 'A senha do colaborador é obrigatório');
    valParams.isString(params.senha, 'A senha do colaborador deve ser uma string');
    valParams.isMinLen(params.senha, 6, 'A senha do colaborador deve ser maior que 6 (seis)');
    valParams.isMaxLen(params.senha, 100, 'A senha do colaborador deve ser menor que 50 (cem)');


    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function listarColaborador(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isString(params.idColaborador, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idColaborador, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idColaborador, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Pesquisar Colaborador
    valParams.isString(params.pesquisar, 'O tipo de pesquisa do colaborador deve ser uma string');
    

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        
        
        let q = params.pesquisar.split(" ");
        
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function excluirColaborador(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idColaborador, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idColaborador, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idColaborador, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idColaborador, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Alteração
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}

async function alterarColaborador(params) {

    let valParams = new ValidatiorParams();
    valParams.clear();

    // ID Colaborador
    valParams.isRequired(params.idColaborador, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idColaborador, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idColaborador, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idColaborador, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // ID Alteração
    valParams.isRequired(params.idAlteracao, 'Identificado do colaborador é obrigatório');
    valParams.isString(params.idAlteracao, 'O identificado do colaborador deve ser uma string');
    valParams.isMinLen(params.idAlteracao, 10, 'O identificado do colaborador deve ser maior que 10 (dez)');
    valParams.isMaxLen(params.idAlteracao, 100, 'O identificado do colaborador deve ser menor que 100 (cem)');

    // Nome Colaborador
    valParams.isRequired(params.nomeColaborador, 'Nome do colaborador é obrigatório');
    valParams.isString(params.nomeColaborador, 'O nome do colaborador deve ser uma string');
    valParams.isMinLen(params.nomeColaborador, 2, 'O nome do colaborador deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.nomeColaborador, 100, 'O nome do colaborador deve ser menor que 100 (cem)');

    // Tipo Colaborador
    valParams.isRequired(params.tipoColaborador, 'O tipo do colaborador é obrigatório');
    valParams.isString(params.tipoColaborador, 'O tipo do colaborador deve ser uma string');
    valParams.isMinLen(params.tipoColaborador, 2, 'O tipo do colaborador deve ser maior que 2 (dois)');
    valParams.isMaxLen(params.tipoColaborador, 10, 'O tipo do colaborador deve ser menor que 10 (dez)');


    // Senha Colaborador
    valParams.isRequired(params.senhaColaborador, 'A senha do colaborador é obrigatório');
    valParams.isString(params.senhaColaborador, 'A senha do colaborador deve ser uma string');
    valParams.isMinLen(params.senhaColaborador, 6, 'A senha do colaborador deve ser maior que 6 (seis)');
    valParams.isMaxLen(params.senhaColaborador, 100, 'A senha do colaborador deve ser menor que 100 (cem)');


    // Ativo Colaborador
    valParams.isRequired(params.ativo, 'O Status do colaborador é obrigatório');
    valParams.isString(params.ativo, 'O Status do colaborador deve ser uma string');
    valParams.isFixedLen(params.ativo, 1, 'O Status do colaborador deve ter 1 (um) caracter');
    valParams.isYesOrNo(params.ativo, 'O Status do produto esta incorreto');
    

    // Se os dados forem inválidos
    if (!valParams.isValid()) {
        return { success: false, httpCode: 400, message: valParams.errors() }
    } else {
        return { success: true, httpCode: 200, message: null }
    }
}
