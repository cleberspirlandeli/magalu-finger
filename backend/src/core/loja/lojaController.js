/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const LojaValidation = require('./lojaValidation.js');
const LojaRepository = require('./lojaRepository.js');

module.exports = {
    inserirLoja,
    listarLoja,
    excluirLoja,
    alterarLoja
};

async function inserirLoja(req, res) {

    const params = {
        idInsercao: req.params.idinsercao ? req.params.idinsercao : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        codigoFilial: req.body.codigoFilial ? parseInt(req.body.codigoFilial) : null,
        cep: req.body.cep ? req.body.cep : null,
        cidade: req.body.cidade ? req.body.cidade : null,
        estado: req.body.estado ? req.body.estado : null
    };

    try {
        const resValidation = await LojaValidation.inserirLoja(params);
        if (resValidation.success) {
            const resRepository = await LojaRepository.inserirLoja(params);

            if (resRepository.success)
                res.status(201).json({ httpCode: 201, data: resRepository });
            else
                res.status(500).json({ httpCode: 500, data: resRepository });

        } else {
            res.status(resValidation.httpCode)
                .json({
                    httpCode: resValidation.httpCode,
                    data: {
                        success: resValidation.success,
                        message: resValidation.message[0].message
                    }
                }
                );
        }
    } catch (e) {
        if (e.message.includes(`Cannot read property 'length' of null`)) 
            e = 'Há campo em branco e/ou não preenchido.'
        
        res.status(500).json({
            httpCode: 500,
            data: {
                success: false,
                message: e
            }
        }
        );
    }
}

async function listarLoja(req, res) {

    const params = {
        idLoja: req.params.idloja ? req.params.idloja : null
    };

    try {
        const resValidation = await LojaValidation.listarLoja(params);
        if (resValidation.success) {
            const resRepository = await LojaRepository.listarLoja(params);

            if (resRepository.length == 0)
                res.status(204).json({ httpCode: 204, data: null });
            else if (resRepository.length > 0)
                res.status(200).json({ httpCode: 200, data: resRepository });
            else
                res.status(500).json({ httpCode: 500, data: resRepository });
            
        } else {
            res.status(resValidation.httpCode)
                .json({
                    httpCode: resValidation.httpCode,
                    data: {
                        success: resValidation.success,
                        message: resValidation.message[0].message
                    }
                }
                );
        }
    } catch (e) {
        if (    e.message === 'invalid base64 end sequence'             ||
                e.message.includes('invalid input syntax for integer')    ) 
            e = 'O identificado da loja é inválido ou expirou.';


        res.status(500).json({
            httpCode: 500,
            data: {
                success: false,
                message: e
            }
        }
        );
    }
}

async function excluirLoja(req, res) {

    const params = {
        idAlteracao: req.params.idalteracao ? req.params.idalteracao : null,
        idLoja: req.params.idloja ? req.params.idloja : null
    };

    try {
        const resValidation = await LojaValidation.excluirLoja(params);
        if (resValidation.success) {
            const resRepository = await LojaRepository.excluirLoja(params);

            if (resRepository.success)
                res.status(200).json({ httpCode: 200, data: resRepository });
            else
                res.status(403).json({ httpCode: 403, data: resRepository });

        } else {
            res.status(resValidation.httpCode)
                .json({
                    httpCode: resValidation.httpCode,
                    data: {
                        success: resValidation.success,
                        message: resValidation.message[0].message
                    }
                }
                );
        }
    } catch (e) {
        if (e.message === 'invalid base64 end sequence') 
            e = 'O identificado do colaborador é inválido ou expirou.';
        
        res.status(500).json({
            httpCode: 500,
            data: {
                success: false,
                message: e
            }
        }
        );
    }
}

async function alterarLoja(req, res) {
    
        const params = {
            idAlteracao: req.params.idalteracao ? req.params.idalteracao : null,
            idLoja: req.params.idloja ? req.params.idloja : null,
            descricao: req.body.descricao ? req.body.descricao : null,
            codigoFilial: req.body.codigoFilial ? req.body.codigoFilial : null,
            cep: req.body.cep ? req.body.cep : null,
            cidade: req.body.cidade ? req.body.cidade : null,
            estado: req.body.estado ? req.body.estado : null,
            ativo: req.body.ativo ? req.body.ativo : null
        };
    
        try {
            const resValidation = await LojaValidation.alterarLoja(params);
            if (resValidation.success) {
                const resRepository = await LojaRepository.alterarLoja(params);
    
                if (resRepository.success)
                    res.status(200).json({ httpCode: 200, data: resRepository });
                else
                    res.status(403).json({ httpCode: 403, data: resRepository });
    
            } else {
                res.status(resValidation.httpCode)
                    .json({
                        httpCode: resValidation.httpCode,
                        data: {
                            success: resValidation.success,
                            message: resValidation.message[0].message
                        }
                    }
                    );
            }
        } catch (e) {
            if (e.message === 'invalid base64 end sequence') 
                e = 'O identificado do colaborador é inválido ou expirou.';
            
            res.status(500).json({
                httpCode: 500,
                data: {
                    success: false,
                    message: e
                }
            }
            );
        }
    }
    
