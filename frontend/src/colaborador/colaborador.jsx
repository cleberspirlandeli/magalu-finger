import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import ColaboradorSearch from './ColaboradorSearch.jsx';
import ColaboradorForm from './ColaboradorForm.jsx';
import ColaboradorList from './ColaboradorList.jsx';

const URL = 'http://localhost:3000/api/colaborador';


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
        this.adicionarColaborador = this.adicionarColaborador.bind(this);
        this.removerColaborador = this.removerColaborador.bind(this);
        this.selecionarColaboradorId = this.selecionarColaboradorId.bind(this);
        this.editarColaborador = this.editarColaborador.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);

        this.refresh();
    }

    //Métodos - Funções
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
        const search = pesquisa ? `?q=${pesquisa}` : '';

        // console.log('URL ', `${URL}${search}`);

        axios.get(`${URL}${pesquisa}`)
            .then(res => {
                if (res.data.httpCode === 200) {
                    this.setState(
                        {
                            ...this.state,
                            idColaborador: '',
                            nomeColaborador: '',
                            tipoColaborador: '',
                            senhaColaborador: '',
                            pesquisar: this.state.pesquisar,
                            listaColaboradores: res.data.data
                        })
                } else {
                    console.log(res);
                }
            }

            )
    }

    pesquisarColaborador() {
        this.refresh(this.state.pesquisar);
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

    adicionarColaborador() {
        // console.log('====== Adicionar Colaborador ======');
        // console.log('Nome Colaborador.......: ' + this.state.nomeColaborador);
        // console.log('Tipo Colaborador.......: ' + this.state.tipoColaborador);
        // console.log('Senha Colaborador......: ' + this.state.senhaColaborador)

        const Colaborador = {
            nomeColaborador: this.state.nomeColaborador,
            tipoColaborador: this.state.tipoColaborador ? this.state.tipoColaborador : 'Vendedor',
            senha: this.state.senhaColaborador
        }

        axios.post(URL, Colaborador)
            .then(res => {
                if (res.data.httpCode === 201) {
                    this.refresh(this.state.pesquisar);
                }
            }
            ).catch(e => console.log(e));
    }

    removerColaborador(id) {
        axios.delete(`${URL}/${id}`)
            .then(res => this.refresh(this.state.pesquisar))
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
        console.log('ID ' + this.state.idColaborador);
        axios.put(`${URL}/${this.state.idColaborador}`,
            {
                nomeColaborador: this.state.nomeColaborador,
                tipoColaborador: this.state.tipoColaborador,
                senhaColaborador: this.state.senhaColaborador,
                ativo: 'S'
            }
        )
            .then(res => {
                console.log(res);
                this.refresh(this.state.pesquisar)
            }
            )
    }

    limparFormulario() {
        this.setState(
            {
                ...this.state,
                idColaborador: '',
                nomeColaborador: '',
                tipoColaborador: '',
                sexoColaborador: '',
                cpfColaborador: '',
                ruaColaborador: '',
                bairroColaborador: '',
                cepColaborador: '',
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