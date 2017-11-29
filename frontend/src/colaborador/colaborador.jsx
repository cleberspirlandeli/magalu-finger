import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import ColaboradorSearch from './ColaboradorSearch.jsx';
import ColaboradorForm from './ColaboradorForm.jsx';
import ColaboradorList from './ColaboradorList.jsx';

const URL = 'http://localhost:3000/api/colaborador';
var token = null; // = 'token:7d107054c91c4b2dda6b30cfd40a90d15d1811d9707320b8e2a640866447d7e709af55ee8f910b2a41b1229728eb50e13223e69a1ffa7faf8ba1bfa34e652df99e1d1a7767c71775c388b9d872f0cc73417808f443fd12193b7daa9a825af6f152ab9192795cda4c5d3abebc54f3a11d3cd88baeee2b50543db2c42cac588528a1ed8307a47166e2110a73c276fd0297e69c683ab025e9fa942b1cf15ab224f2a1abafcc2ef6a987fb97fd226718749f8864fad7aba9cf0d3fd0fe5421cac38c1f41aeaa6dd6f1804b730ce29ae816a1b867a2eb6f9921468e0baf4dc6b83fe892e712417d212042d93583ade79f1c05aa5aa7c32c598ae9a02af9f63f3bf1c8cbac46e4b0482e3529acbc58e83e97b1117c939bf83bfec47c0903ffc48db7be';
var session = null;

export default class Colaborador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idColaborador: '',
            nomeColaborador: '',
            tipoColaborador: 'Vendedor',
            senhaColaborador: '',
            pesquisar: '',
            editar: false,
            alertError: false,
            alertSuccess: false,
            messageError: '',
            messageSuccess: '',
            listaColaboradores: []
        }

        // CAMPOS INPUT
        this.digitarPesquisa = this.digitarPesquisa.bind(this);
        this.digitarNome = this.digitarNome.bind(this);
        this.digitarTipo = this.digitarTipo.bind(this);
        this.digitarSenha = this.digitarSenha.bind(this);

        // INPUT PESQUISAR
        this.refresh = this.refresh.bind(this);
        this.pesquisarColaborador = this.pesquisarColaborador.bind(this);
        this.limparCampoPesquisa = this.limparCampoPesquisa.bind(this);

        // FORMULÁRIO Colaborador
        this.getToken = this.getToken.bind(this);
        this.adicionarColaborador = this.adicionarColaborador.bind(this);
        this.removerColaborador = this.removerColaborador.bind(this);
        this.selecionarColaboradorId = this.selecionarColaboradorId.bind(this);
        this.editarColaborador = this.editarColaborador.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);

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

    digitarPesquisa(e) {
        this.setState({ ...this.state, pesquisar: e.target.value });
    }
    digitarNome(e) {
        this.setState({ ...this.state, nomeColaborador: e.target.value });
    }
    digitarTipo(e) {
        this.setState({ ...this.state, tipoColaborador: e.target.value });
    }
    digitarSenha(e) {
        this.setState({ ...this.state, senhaColaborador: e.target.value });
    }

    refresh(pesquisa = '') {
        this.getToken();

        let search = pesquisa ? `?q=${pesquisa}` : '';

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
                    if (res.data.httpCode === 200) {
                        this.setState({
                            ...this.state,
                            idColaborador: '',
                            nomeColaborador: '',
                            tipoColaborador: '',
                            senhaColaborador: '',
                            pesquisar: this.state.pesquisar,
                            listaColaboradores: res.data.data
                        });
                    } else {
                        console.log('refresh ELSE ' + res);
                    }
                })
                .catch(e => {
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

    pesquisarColaborador() {
        this.refresh(this.state.pesquisar);
    }

    limparCampoPesquisa() {
        this.setState(
            {
                ...this.state,
                pesquisar: '',
                alertError: false,
                alertSuccess: false,
                messageError: '',
                messageSuccess: ''
            }
        );
        this.refresh();
    }

    adicionarColaborador() {        
        // console.log('====== Adicionar Colaborador ======');
        // console.log('Nome Colaborador.......: ' + this.state.nomeColaborador);
        // console.log('Tipo Colaborador.......: ' + this.state.tipoColaborador);
        // console.log('Senha Colaborador......: ' + this.state.senhaColaborador)

        let Colaborador = {
            nomeColaborador: this.state.nomeColaborador,
            tipoColaborador: this.state.tipoColaborador ? this.state.tipoColaborador : 'Gestor',
            senha: this.state.senhaColaborador
        }

        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.post(
                URL,
                Colaborador,
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
                    // console.log(e.response.data.data.message);
                });
        });
    }

    removerColaborador(id) {        
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.delete(
                `${URL}/${id}/${id}`,
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
                    this.refresh(this.state.pesquisar)
                })
                .catch(e => {
                    this.setState({
                        ...this.state,
                        alertError: true,
                        alertSuccess: false,
                        messageSuccess: '',
                        messageError: e.response.data.data.message
                    });
                })
        }).catch(e => {
            this.setState({
                ...this.state,
                alertError: true,
                alertSuccess: false,
                messageSuccess: '',
                messageError: e.response.data.data.message
            })
        });
    }

    selecionarColaboradorId(colaborador) {
        this.setState(
            {
                ...this.state,
                idColaborador: colaborador.id,
                nomeColaborador: colaborador.nome,
                tipoColaborador: colaborador.tipo,
                senhaColaborador: colaborador.senha,
                editar: true
            }
        )
    }

    editarColaborador() {
        
        // console.log(this.state.nomeColaborador);
        var idAlteracao = session ? session : this.state.idColaborador; // Somente para teste
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.put(
                `${URL}/${idAlteracao}/${this.state.idColaborador}`,
                {
                    nomeColaborador: this.state.nomeColaborador,
                    tipoColaborador: this.state.tipoColaborador ? this.state.tipoColaborador : 'Vendedor',
                    senhaColaborador: this.state.senhaColaborador,
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
                        messageSuccess: res.data.data.message,
                        messageError: '',
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
                })
        }).catch(e => {
            this.setState({
                ...this.state,
                alertError: true,
                alertSuccess: false,
                messageSuccess: '',
                messageError: e.response.data.data.message
            })
        })
    }

    limparFormulario() {
        this.setState(
            {
                ...this.state,
                idColaborador: '',
                nomeColaborador: '',
                tipoColaborador: '',
                senhaColaborador: '',
                editar: false
            }
        );
    }

    render() {
        return (
            <div>
                <PageHeader
                    name="Colaborador "
                    small="Descrição"
                />

                <ColaboradorSearch
                    pesquisar={this.state.pesquisar}
                    digitarPesquisa={this.digitarPesquisa}

                    pesquisarColaborador={this.pesquisarColaborador}
                    limparCampoPesquisa={this.limparCampoPesquisa}
                />

                <ColaboradorForm
                    alertError={this.state.alertError}
                    alertSuccess={this.state.alertSuccess}
                    messageError={this.state.messageError}
                    messageSuccess={this.state.messageSuccess}

                    idColaborador={this.state.idColaborador}
                    nomeColaborador={this.state.nomeColaborador}
                    tipoColaborador={this.state.tipoColaborador}
                    senhaColaborador={this.state.senhaColaborador}
                    editar={this.state.editar}

                    digitarNome={this.digitarNome}
                    digitarTipo={this.digitarTipo}
                    digitarSenha={this.digitarSenha}

                    adicionarColaborador={this.adicionarColaborador}
                    editarColaborador={this.editarColaborador}
                    limparFormulario={this.limparFormulario}
                />

                <ColaboradorList
                    listaColaboradores={this.state.listaColaboradores}

                    selecionarColaboradorId={this.selecionarColaboradorId}
                    removerColaborador={this.removerColaborador}
                />
            </div>
        );
    }
}