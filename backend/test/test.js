// MOCHA
var assert = require('assert');
var assert = require('chai').assert;

// CHAI
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
const server = require('./../src/bin/configApp');
chai.use(chaiHttp);

const URL = '/api/';
const TOKEN = 'token:7d107054c91c4b2dda6b30cfd40a90d15d1811d9707320b8e2a640866447d7e709af55ee8f910b2a41b1229728eb50e13223e09207c27bac948bbe8549492ac082130a524cee110a869fb2f90aecdd00057d61d24efc766a5867b491ac5ac89d27aea5a30270be6e773da2fc7bf2b7665bf69498d3376e0b6da99f0dbf58857dafc69339fb624ac04d3016de6cfd5890fdb77c21ee08c4f5b73c10dc54a6278fbca9ace902f6a993fe96ed32291964b1c97feacbecb1cc017cd6f97d3ee2ea905041bc907cd7e6a1426510fe84e83f93e070aec62d9d0f68810baf49cdbe06f3decb05497f0a253995349297cae32a6ca93a95b6545c81e0a723cdb22d00c7b4c48534d999475867348fbd0de508b5a800429d';

// ID's
let idColaborador = null;
let idLoja = null;
let idProduto = null;

describe('TESTAR: GET, POST, GET ID, PUT', function () {

  describe(' 1 - API COLABORADOR', function () {

    it(' 1.1 - GET: ', function (done) {
      chai.request(server)
        .get(`${URL}colaborador/`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('nome');
          res.body.data[0].should.have.property('tipo');
          res.body.data[0].should.have.property('ativo');
          res.body.data[0].should.have.property('senha');
          done();
        });
    });

    it(' 1.2 - POST: ', function (done) {
      let colaborador = {
        "nomeColaborador": "Test Unit",
        "tipoColaborador": "Gestor",
        "senha": "10203040"
      }

      chai.request(server)
        .post(`${URL}colaborador/`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .send(colaborador)
        .end(function (err, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idColaborador');

          idColaborador = res.body.data.idColaborador;
          done();
        });
    });

    it(' 1.3 - GET ID: ', function (done) {
      chai.request(server)
        .get(`${URL}colaborador/${idColaborador}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('nome');
          res.body.data[0].should.have.property('tipo');
          res.body.data[0].should.have.property('ativo');
          res.body.data[0].should.have.property('senha');
          done();
        });
    });

    it(' 1.4 - PUT: ', function (done) {
      let colaborador = {
        "nomeColaborador": "Test Unit Update",
        "tipoColaborador": "Gestor",
        "senhaColaborador": "112233",
        "ativo": "S"
      }

      chai.request(server)
        .put(`${URL}colaborador/${idColaborador}/${idColaborador}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .send(colaborador)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idColaborador');

          done();
        });
    });

    it.skip(' 1.5 - DELETE: ', function (done) {
      chai.request(server)
        .delete(`${URL}colaborador/${idColaborador}/${idColaborador}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idColaborador');

          done();
        });
    });

  });


  describe(' 2 - API LOJA', function () {

    it(' 2.1 - GET: ', function (done) {
      chai.request(server)
        .get(`${URL}loja/`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('descricao');
          res.body.data[0].should.have.property('codigofilial');
          res.body.data[0].should.have.property('cep');
          res.body.data[0].should.have.property('cidade');
          res.body.data[0].should.have.property('estado');
          done();
        });
    });

    it(' 2.2 - POST: ', function (done) {
      let loja = {
        "descricao": "Loja Test Unit",
        "codigoFilial": 334455,
        "cep": "14401000",
        "cidade": "Franca",
        "estado": "SP"
      }

      chai.request(server)
        .post(`${URL}loja/${idColaborador}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .send(loja)
        .end(function (err, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idLoja');

          idLoja = res.body.data.idLoja;
          done();
        });
    });

    it(' 2.3 - GET ID: ', function (done) {
      chai.request(server)
        .get(`${URL}loja/${idLoja}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('descricao');
          res.body.data[0].should.have.property('codigofilial');
          res.body.data[0].should.have.property('cep');
          res.body.data[0].should.have.property('cidade');
          res.body.data[0].should.have.property('estado');
          done();
        });
    });

    it(' 2.4 - PUT: ', function (done) {
      let loja = {
        "descricao": "Test Unit Update",
        "codigoFilial": 336699,
        "cep": "14400100",
        "cidade": "Franca",
        "estado": "SP",
        "ativo": "S"
      }

      chai.request(server)
        .put(`${URL}loja/${idColaborador}/${idLoja}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .send(loja)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idLoja');

          done();
        });
    });

    it.skip(' 2.5 - DELETE: ', function (done) {
      chai.request(server)
        .delete(`${URL}loja/${idColaborador}/${idLoja}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idLoja');

          done();
        });
    });

  });


  describe(' 3 - API PRODUTO', function () {

    it(' 3.1 - GET: ', function (done) {
      chai.request(server)
        .get(`${URL}produto/`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('descricao');
          res.body.data[0].should.have.property('codigoProduto');
          res.body.data[0].should.have.property('valorVenda');
          res.body.data[0].should.have.property('quantidade');
          res.body.data[0].should.have.property('quantidadeDescricao');
          res.body.data[0].should.have.property('datacadastro');
          done();
        });
    });

    it(' 3.2 - POST: ', function (done) {
      let produto = {
        "descricao": "Produto Test Unit",
        "codigoProduto": 1020,
        "valorVenda": 199.90,
        "quantidade": 1000
      }

      chai.request(server)
        .post(`${URL}produto/${idColaborador}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .send(produto)
        .end(function (err, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idProduto');

          idProduto = res.body.data.idProduto;
          done();
        });
    });

    it(' 3.3 - GET ID: ', function (done) {
      chai.request(server)
        .get(`${URL}produto/${idProduto}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('Array');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('descricao');
          res.body.data[0].should.have.property('codigoProduto');
          res.body.data[0].should.have.property('valorVenda');
          res.body.data[0].should.have.property('quantidade');
          res.body.data[0].should.have.property('quantidadeDescricao');
          res.body.data[0].should.have.property('datacadastro');
          done();
        });
    });

    it(' 3.4 - PUT: ', function (done) {
      let produto = {
        "descricao": "Produto Test Unit Update",
        "codigoProduto": 102030,
        "valorVenda": 1390.80,
        "quantidade": 90,
        "ativo": "S"
      }

      chai.request(server)
        .put(`${URL}produto/${idColaborador}/${idProduto}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')        
        .send(produto)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idProduto');

          done();
        });
    });

    it.skip(' 3.5 - DELETE: ', function (done) {
      chai.request(server)
        .delete(`${URL}loja/${idColaborador}/${idLoja}`)
        .set('Authorization', TOKEN)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('httpCode');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('success');
          res.body.data.should.have.property('message');
          res.body.data.should.have.property('idProduto');

          done();
        });
    });

  });

});

describe('TESTAR: DELETE', function () {

  it(' 3.5 - DELETE: ', function (done) {
    chai.request(server)
      .delete(`${URL}produto/${idColaborador}/${idLoja}`)
      .set('Authorization', TOKEN)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('httpCode');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('success');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('idProduto');

        done();
      });
  });

  it(' 2.5 - DELETE: ', function (done) {
    chai.request(server)
      .delete(`${URL}loja/${idColaborador}/${idLoja}`)
      .set('Authorization', TOKEN)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('httpCode');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('success');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('idLoja');

        done();
      });
  });

  it(' 1.5 - DELETE: ', function (done) {
    chai.request(server)
      .delete(`${URL}colaborador/${idColaborador}/${idColaborador}`)
      .set('Authorization', TOKEN)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('httpCode');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('success');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('idColaborador');

        done();
      });
  });
});