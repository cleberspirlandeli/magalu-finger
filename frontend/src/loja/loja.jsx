import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import LojaSearch from './lojaSearch.jsx';
import LojaForm from './lojaForm.jsx';
import LojaList from './lojaList.jsx';

const URL = 'http://localhost:3000/api/loja';
var token = null; // = 'token:7d107054c91c4b2dda6b30cfd40a90d15d1811d9707320b8e2a640866447d7e709af55ee8f910b2a41b1229728eb50e13223e69a1ffa7faf8ba1bfa34e652df99e1d1a7767c71775c388b9d872f0cc73417808f443fd12193b7daa9a825af6f152ab9192795cda4c5d3abebc54f3a11d3cd88baeee2b50543db2c42cac588528a1ed8307a47166e2110a73c276fd0297e69c683ab025e9fa942b1cf15ab224f2a1abafcc2ef6a987fb97fd226718749f8864fad7aba9cf0d3fd0fe5421cac38c1f41aeaa6dd6f1804b730ce29ae816a1b867a2eb6f9921468e0baf4dc6b83fe892e712417d212042d93583ade79f1c05aa5aa7c32c598ae9a02af9f63f3bf1c8cbac46e4b0482e3529acbc58e83e97b1117c939bf83bfec47c0903ffc48db7be';
var session = null;

export default class Loja extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idLoja: '',
            descricaoLoja: '',
            codigoLoja: '',
            cepLoja: '',
            cidadeLoja: '',
            estadoLoja: '',
            pesquisar: '',
            editar: false,
            alertError: false,
            alertSuccess: false,
            messageError: '',
            messageSuccess: '',
            listaLojas: []
        }

        // CAMPOS INPUT
        this.digitarPesquisa = this.digitarPesquisa.bind(this);
        this.digitarDescricao = this.digitarDescricao.bind(this);
        this.digitarCodigo = this.digitarCodigo.bind(this);
        this.digitarCep = this.digitarCep.bind(this);

        // INPUT PESQUISAR
        this.refresh = this.refresh.bind(this);
        this.pesquisarLoja = this.pesquisarLoja.bind(this);
        this.limparCampoPesquisa = this.limparCampoPesquisa.bind(this);

        // FORMULÁRIO Loja
        this.getToken = this.getToken.bind(this);
        this.timeMessage = this.timeMessage.bind(this);
        this.adicionarLoja = this.adicionarLoja.bind(this);
        this.removerLoja = this.removerLoja.bind(this);
        this.selecionarLojaId = this.selecionarLojaId.bind(this);
        this.editarLoja = this.editarLoja.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);
        this.pesquisarCep = this.pesquisarCep.bind(this);

        this.refresh();
    }

    //Métodos - Funções
    getToken(redirect = null) {
        var tokens = document.cookie.split(';');
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].includes('token=token:')) {
                token = tokens[i].replace("token=", "");
                // console.log('TOKEN: ' + token);
            }
            if (tokens[i].includes('session')) {
                session = tokens[i].replace("session=", "");
                // console.log('SESSAO: ' + session);
            }
        }
        if (token == null || redirect) {
            window.location.href = "http://localhost/#/login"
        }
        return;
    }

    timeMessage(){
        setTimeout(function(){ 
            this.setState({
                ...this.state,
                alertError: false,
                alertSuccess: false,
                messageSuccess: '',
                messageError: ''
            });
        }.bind(this), 5000);
    }

    digitarPesquisa(e) {
        this.setState({ ...this.state, pesquisar: e.target.value });
    }
    digitarDescricao(e) {
        this.setState({ ...this.state, descricaoLoja: e.target.value });
    }
    digitarCodigo(e) {
        this.setState({ ...this.state, codigoLoja: e.target.value });
    }
    digitarCep(e) {
        this.setState({ ...this.state, cepLoja: e.target.value });
    }

    refresh(pesquisa = '') {
        this.getToken();

        let search = pesquisa ? `?q=${pesquisa}` : '';
        console.log(`URL...: ${URL}${search}`)
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.get(
                `${URL}${search}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
                .then(res => {
                    //console.log('Refresh ' + res.data);
                    if (res.data.httpCode === 200) {
                        this.setState(
                            {
                                ...this.state,
                                idLoja: '',
                                descricaoLoja: this.state.descricaoLoja,
                                codigoLoja: this.state.codigoLoja,
                                cepLoja: this.state.cepLoja,
                                pesquisar: this.state.pesquisar,
                                listaLojas: res.data.data
                            })
                    } else {
                        console.log(res.data);
                    }
                }).catch(e => {
                    this.setState({
                        ...this.state,
                        alertError: true,
                        alertSuccess: false,
                        messageSuccess: '',
                        messageError: e.response.data.message
                    });
                    if (e.response.status == 401 || e.response.status == 403) {
                      window.location.href = "http://localhost/#/login"
                    }
                });
        });
    }

    pesquisarLoja() {
        this.refresh(this.state.pesquisar);
    }

    pesquisarCep() {
        var urlCep = `https://viacep.com.br/ws/${this.state.cepLoja}/json/`;
        axios.get(urlCep)
            .then(res => {
                this.setState(
                    {
                        ...this.state,
                        cidadeLoja: res.data.localidade,
                        estadoLoja: res.data.uf
                    }
                );
            }
            ).catch(e => console.log('err pesquisarCep ' + e));
    }

    limparCampoPesquisa() {
        this.setState(
            {
                ...this.state,
                pesquisar: ''
            }
        );
        this.refresh();
    }

    adicionarLoja() {
        // console.log('====== Adicionar Loja ======');
        // console.log('Nome Loja.......: ' + this.state.descricaoLoja);
        // console.log('Tipo Loja.......: ' + this.state.codigoLoja);
        // console.log('CEP Loja........: ' + this.state.cepLoja)

        const Loja = {
            descricao: this.state.descricaoLoja,
            codigoFilial: this.state.codigoLoja,
            cep: this.state.cepLoja,
            cidade: this.state.cidadeLoja,
            estado: this.state.estadoLoja
        }
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.post(
                `${URL}/${session}`,
                Loja,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
                .then(res => {
                    if (res.data.httpCode === 201) {
                        this.setState({
                            ...this.state,
                            alertError: false,
                            alertSuccess: true,
                            messageSuccess: res.data.data.message,
                            messageError: '',
                        });
                        this.refresh(this.state.pesquisar);
                        this.timeMessage();
                    }
                })
                .catch(e => {
                    this.setState({
                        ...this.state,
                        alertError: true,
                        alertSuccess: false,
                        messageSuccess: '',
                        messageError: e.response.data.data.message
                    });
                    this.timeMessage();
                });
        });
    }

    removerLoja(id) {
        // console.log('sessao....: ' ,session);
        // console.log('ID........: ' ,id);
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
                axios.delete(
                    `${URL}/${session}/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    })
                    .then(res => {
                        this.setState({
                            ...this.state,
                            alertError: false,
                            alertSuccess: true,
                            messageSuccess: res.data.data.message,
                            messageError: '',
                        });
                        this.refresh(this.state.pesquisar);
                        this.timeMessage();
                    })
                    .catch(e => {
                        this.setState({
                            ...this.state,
                            alertError: true,
                            alertSuccess: false,
                            messageSuccess: '',
                            messageError: e.response.data.data.message
                        });
                    });
            })
            .catch(e => {
                this.setState({
                    ...this.state,
                    alertError: true,
                    alertSuccess: false,
                    messageSuccess: '',
                    messageError: e.response.data.data.message
                })
                this.timeMessage();
            });
    }

    selecionarLojaId(colaborador) {
        this.setState(
            {
                ...this.state,
                idLoja: colaborador.id,
                descricaoLoja: colaborador.descricao,
                codigoLoja: colaborador.codigofilial,
                cepLoja: colaborador.cep,
                cidadeLoja: colaborador.cidade,
                estadoLoja: colaborador.estado,
                editar: true
            }
        )
    }

    editarLoja() {
        // console.log('====== Editar Loja ======');
        // console.log('Nome Loja.......: ' + this.state.descricaoLoja);
        // console.log('Código Loja.....: ' + this.state.codigoLoja);
        // console.log('CEP Loja........: ' + this.state.cepLoja);
        // console.log('CEP Cidade......: ' + this.state.cidadeLoja);
        // console.log('CEP Estado......: ' + this.state.estadoLoja);

        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
        axios.put(
            `${URL}/${session}/${this.state.idLoja}`,
            {
                descricao: this.state.descricaoLoja,
                codigoFilial: this.state.codigoLoja,
                cep: this.state.cepLoja,
                cidade: this.state.cidadeLoja,
                estado: this.state.estadoLoja,
                ativo: 'S'
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(res => {
                this.refresh(this.state.pesquisar)
                this.setState({
                    ...this.state,
                    alertError: false,
                    alertSuccess: true,
                    editar: false,
                    messageSuccess: res.data.data.message,
                    messageError: '',
                });
                this.timeMessage();
            })
            .catch(e => {
                this.setState({
                    ...this.state,
                    alertError: true,
                    alertSuccess: false,
                    messageSuccess: '',
                    messageError: e.response.data.data.message
                });
                this.timeMessage();
            })
        }).catch(e => {
            this.setState({
                ...this.state,
                alertError: true,
                alertSuccess: false,
                messageSuccess: '',
                messageError: e.response.data.data.message
            });
            this.timeMessage();
        });
    }

    limparFormulario() {
        this.setState(
            {
                ...this.state,
                idLoja: '',
                descricaoLoja: '',
                codigoLoja: '',
                cepLoja: '',
                cidadeLoja: '',
                estadoLoja: '',
                editar: false
            }
        );
    }

    render() {
        return (
            <div >
                <PageHeader
                    name="Loja "
                    small="Descrição"
                />

                <LojaSearch
                    pesquisar={this.state.pesquisar}
                    digitarPesquisa={this.digitarPesquisa}

                    pesquisarLoja={this.pesquisarLoja}
                    limparCampoPesquisa={this.limparCampoPesquisa}
                />

                <LojaForm
                    alertError={this.state.alertError}
                    alertSuccess={this.state.alertSuccess}
                    messageError={this.state.messageError}
                    messageSuccess={this.state.messageSuccess}

                    idLoja={this.state.idLoja}
                    descricaoLoja={this.state.descricaoLoja}
                    codigoLoja={this.state.codigoLoja}
                    cepLoja={this.state.cepLoja}
                    cidadeLoja={this.state.cidadeLoja}
                    estadoLoja={this.state.estadoLoja}
                    editar={this.state.editar}

                    digitarDescricao={this.digitarDescricao}
                    digitarCodigo={this.digitarCodigo}
                    digitarCep={this.digitarCep}

                    adicionarLoja={this.adicionarLoja}
                    editarLoja={this.editarLoja}
                    limparFormulario={this.limparFormulario}
                    pesquisarCep={this.pesquisarCep}
                />

                <LojaList
                    listaLojas={this.state.listaLojas}

                    selecionarLojaId={this.selecionarLojaId}
                    removerLoja={this.removerLoja}
                />
            </div >
        );
    }
}