/**
 * Created by Cleber Spirlandeli on 22/11/2017.
 */
'use strict'

const ColaboradorValidation = require('./gestorLojaValidation.js');
const ColaboradorRepository = require('./gestorLojaRepository.js');

const SendMail = require('./../../util/sendmail/sendmail.js')

module.exports = {
    inserirColaborador,
    listarColaborador,
    excluirColaborador,
    alterarColaborador
};

async function inserirColaborador(req, res) {
    
    // Setar os parametros recebidos pelo params, body, query
    const params = {
        nomeColaborador: req.body.nomeColaborador ? req.body.nomeColaborador : null,
        tipoColaborador: req.body.tipoColaborador ? req.body.tipoColaborador : null,
        senha: req.body.senha ? req.body.senha : null
    };

    try {
        // Primeiro é feito uma verificação se as variáveis recebidas são válidas.
        const resValidation = await ColaboradorValidation.inserirColaborador(params);
        if (resValidation.success) { // se as variáveis forem válidas
            // Chama o banco para inserir o usuário
            const resRepository = await ColaboradorRepository.inserirColaborador(params);

            if (resRepository.success) // Se o retorno do banco for true
                res.status(201).json({ httpCode: 201, data: resRepository });
            else
                res.status(500).json({ httpCode: 500, data: resRepository });

        } else {
            res.status(resValidation.httpCode) // httpCode é recebido da válidação
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
        // Feito alguma verificação de exemplo para uma possível tratativa de erros.
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

async function listarColaborador(req, res) {
    // Pode ser listador 
    const params = {
        idColaborador: req.params.id ? req.params.id : null,
        pesquisar: req.query.q ?req.query.q : null
    };

    try {
        const resValidation = await ColaboradorValidation.listarColaborador(params);
        if (resValidation.success) {
            const resRepository = await ColaboradorRepository.listarColaborador(params);

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
        if (e.message === 'invalid base64 end sequence') 
            e = 'Sua sessão expirou por inatividade. Por favor, efetue login novamente.';
        
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

async function excluirColaborador(req, res) {

    const params = {
        idAlteracao: req.params.idalteracao ? String(req.params.idalteracao) : null,
        idColaborador: req.params.idcolaborador ? String(req.params.idcolaborador) : null
    };

    try {
        const resValidation = await ColaboradorValidation.excluirColaborador(params);
        if (resValidation.success) {
            const resRepository = await ColaboradorRepository.excluirColaborador(params);

            if (resRepository.success){
                res.status(200).json({ httpCode: 200, data: resRepository }).end();
            }
            else{
                res.status(403).json({ httpCode: 403, data: resRepository }).end();
            }
            
            // Enviar email para o responsável informando a exclusão e os dados de quem
            // excluiu e quem foi o excluido
            await SendMail.sendmail(params);
            
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
            e = 'Sua sessão expirou por inatividade. Por favor, efetue login novamente.';
        
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

async function alterarColaborador(req, res) {
    
        const params = {
            idAlteracao: req.params.idalteracao ? req.params.idalteracao : null,
            idColaborador: req.params.idcolaborador ? req.params.idcolaborador : null,
            nomeColaborador: req.body.nomeColaborador ? req.body.nomeColaborador : null,
            tipoColaborador: req.body.tipoColaborador ? req.body.tipoColaborador : null,
            senhaColaborador: req.body.senhaColaborador ? req.body.senhaColaborador : null,
            ativo: req.body.ativo ? req.body.ativo : null
        };
    
        try {
            const resValidation = await ColaboradorValidation.alterarColaborador(params);
            if (resValidation.success) {
                const resRepository = await ColaboradorRepository.alterarColaborador(params);
    
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
                e = 'Sua sessão expirou por inatividade. Por favor, efetue login novamente.';
            
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
    
