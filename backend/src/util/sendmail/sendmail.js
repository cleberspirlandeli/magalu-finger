/*
* Criado para enviar email para um possível responsável inforando sobre alguma ação de um usuário
*/

const nodemailer = require('nodemailer');
const SendMailRepository = require('./sendmailRepository.js');

module.exports = {
    sendmail
};

async function sendmail(params) {
    // Criando o html que será o conteúdo do email.
    let res = await SendMailRepository.sendmail(params);
    if (res) {
        var strHtml = '<div style="display: block;margin: 0 auto;width: 620px;">';
        strHtml += '<div style="height:330px;background-color:#2196F3;border-radius:15px 100px;">';
        strHtml += '<div style="text-align:center;padding-top:10%;font-size:20px;color:white;">';
        strHtml += '<p>Tecnologia da Informação e Comunicação Magazine informa:</p>';
        strHtml += '<p>O usuário ${0} do tipo ${1} realizou uma ação importante.</p>';
        strHtml += '<p>Excluiu o usuário ${2} (${3}) no dia ${4}.</p>';
        strHtml += '<p>Clique no <a href="https://www.google.com.br/imgres?imgurl=https%3A%2F%2Fwww.ricardoresende.com.br%2Fmedia%2Fkunena%2Fattachments%2F517%2FcarimboConfirmado2.jpg&imgrefurl=https%3A%2F%2Fwww.ricardoresende.com.br%2Fforum%2Fcurso-integral-de-direito-do-trabalho-para-aft%2F123-curso-confirmado&docid=CBwMeml1FoJ6kM&tbnid=AeXm4fQWyNnayM%3A&vet=10ahUKEwjKy7-jwLrXAhUQPJAKHZVUDRMQMwgmKAAwAA..i&w=675&h=495&bih=769&biw=1440&q=confirmado&ved=0ahUKEwjKy7-jwLrXAhUQPJAKHZVUDRMQMwgmKAAwAA&iact=mrc&uact=8" target="_blank">Link</a> para confirmar a exclusão.</p>';
        strHtml += '<p style="font-size:12px;color:#000;bottom:0px;margin-top:170px">Desenvolvido por Cleber Rezende</p>'
        strHtml += '</div></div></div>';
    }
    
    // Gerando a data atual
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1;
    var year = dateObj.getUTCFullYear();
    var data = `${day}/${month}/${year}`;

    // Inserindo os dados do usuário no elemento html
    var html = strHtml.replace("${0}", res.alterar[0].nome)
        .replace("${1}", res.alterar[0].tipo)
        .replace("${2}", res.colaborador[0].nome)
        .replace("${3}", res.colaborador[0].tipo)
        .replace("${4}", data)

    // Informações do remetente do email 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testeemailmagalu@gmail.com',
            pass: '#55VxH6%x8+@'
        }
    });
    
    
    // Email de destinatário
    let mailOptions = {
        from: 'Magalu-Finder',
        to: 'contato.spirlandeli@gmail.com', //edmilson.dourado@luizalabs.com
        subject: 'Informativo Magalu Finder TI',
        text: 'Magalu-Finder',
        html: html
    };
    
    /* Válidar error ou sucess
    *  Nesse caso não fiz nenhuma validação, mas poderia ser incrementado para em caso de erro tentar reenviar o email
    */
    transporter.sendMail(mailOptions, function (error, info) {
        next();
    });
}
