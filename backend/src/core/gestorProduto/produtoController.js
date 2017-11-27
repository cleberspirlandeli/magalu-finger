/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ProdutoValidation = require('./produtoValidation.js');
const ProdutoRepository = require('./produtoRepository.js');

module.exports = {
    inserirProduto,
    listarProduto,
    excluirProduto,
    alterarProduto
};

async function inserirProduto(req, res) {

    const params = {
        idInsercao: req.params.idinsercao ? req.params.idinsercao : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        codigoProduto: req.body.codigoProduto ? req.body.codigoProduto : null,
        valorVenda: req.body.valorVenda ? parseInt(req.body.valorVenda) : null,
        quantidade: req.body.quantidade ? req.body.quantidade : null
    };

    try {
        const resValidation = await ProdutoValidation.inserirProduto(params);
        if (resValidation.success) {
            const resRepository = await ProdutoRepository.inserirProduto(params);

            if (resRepository.success)
                res.status(201).json({ httpCode: 201, data: resRepository });
            else if (resRepository.message.includes('Somente Gestores podem'))
                res.status(403).json({ httpCode: 403, data: resRepository });
            else if (resRepository.message.includes('produto deve ser maior que 10'))
                res.status(400).json({ httpCode: 400, data: resRepository });
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
        if (e.message.includes('colaborador" violates check constraint "colaborador_tipo'))
            e = 'O tipo de vendedor deve ser informado corretamente.'

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

async function listarProduto(req, res) {

    const params = {
        idProduto: req.params.idproduto ? req.params.idproduto : null
    };

    try {
        const resValidation = await ProdutoValidation.listarProduto(params);
        if (resValidation.success) {
            const resRepository = await ProdutoRepository.listarProduto(params);

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
        if (e.message === 'invalid base64 end sequence' ||
            e.message.includes('invalid input syntax for integer'))
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

async function excluirProduto(req, res) {

    const params = {
        idAlteracao: req.params.idalteracao ? req.params.idalteracao : null,
        idProduto: req.params.idproduto ? req.params.idproduto : null
    };

    try {
        const resValidation = await ProdutoValidation.excluirProduto(params);
        if (resValidation.success) {
            const resRepository = await ProdutoRepository.excluirProduto(params);

            if (resRepository.success)
                res.status(200).json({ httpCode: 200, data: resRepository });
            else if (resRepository.message.includes('Somente Gestores podem realizar a exclusão'))
                res.status(403).json({ httpCode: 403, data: resRepository });
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

async function alterarProduto(req, res) {

    const params = {
        idAlteracao: req.params.idalteracao ? req.params.idalteracao : null,
        idProduto: req.params.idproduto ? req.params.idproduto : null,
        descricao: req.body.descricao ? req.body.descricao : null,
        codigoProduto: req.body.codigoProduto ? req.body.codigoProduto : null,
        valorVenda: req.body.valorVenda ? req.body.valorVenda : null,
        quantidade: req.body.quantidade ? req.body.quantidade : null,
        ativo: req.body.ativo ? req.body.ativo : null
    };

    try {
        const resValidation = await ProdutoValidation.alterarProduto(params);
        if (resValidation.success) {
            const resRepository = await ProdutoRepository.alterarProduto(params);

            if (resRepository.success)
                res.status(200).json({ httpCode: 200, data: resRepository });
            else if (resRepository.message.includes('Somente Gestores podem realizar alteração'))
                res.status(403).json({ httpCode: 403, data: resRepository });
            else if (resRepository.message.includes('produto é menor do que a quantidade que se deseja'))
                res.status(400).json({ httpCode: 400, data: resRepository });

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

