

module.exports = async (params) => {

    let d = new Date();
    let dia = d.getDate(); // Dia do mês

    // Segredo para se gerar o token, o token é alternado de acordo com o dia do mês
    if (params === 'token') {

        if (dia > 0 && dia < 11) {          // De 1 a 10
            var password = 'S00Bomb$%Men=fdd}de7';
        } else if (dia > 10 && dia < 21) {   // De 11 a 20
            var password = '7c]3cBeauty1e!9Miss66e9';
        } else if (dia > 20 && dia < 32) {   // De 21 a 31
            var password = '3#cAdvent1d1dEditorial92+f';
        } else {
            var password = '!!30Asset0@a0dValve9f';
        }

    }else if(params === 'crypto'){

        if (dia > 0 && dia < 11) {          // De 1 a 10
            var password = '+xMF#qX!';
        } else if (dia > 10 && dia < 21) {   // De 11 a 20
            var password = '126c!#Z6';
        } else if (dia > 20 && dia < 32) {   // De 21 a 31
            var password = '4d3#$Kk8';
        } else {
            var password = 'b5c*0b!8';
        }
    }

    return (password ? password : null);
}
