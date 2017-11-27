import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import LojaSearch from './lojaSearch.jsx';
import LojaForm from './lojaForm.jsx';
import LojaList from './lojaList.jsx';

const URL = 'http://localhost:3000/api/loja';


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
        this.adicionarLoja = this.adicionarLoja.bind(this);
        this.removerLoja = this.removerLoja.bind(this);
        this.selecionarLojaId = this.selecionarLojaId.bind(this);
        this.editarLoja = this.editarLoja.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);
        this.pesquisarCep = this.pesquisarCep.bind(this);
        
        this.refresh();
    }

    //Métodos - Funções
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
        const search = pesquisa ? `?q=${pesquisa}` : '';

        // console.log('URL ', `${URL}${search}`);
        axios.get(`${URL}${pesquisa}`)
            .then(res => {
                console.log(res);
                if (res.data.httpCode === 200) {
                    this.setState(
                        {
                            ...this.state,
                            idLoja: '',
                            descricaoLoja: '',
                            codigoLoja: '',
                            cepLoja: '',
                            pesquisar: this.state.pesquisar,
                            listaLojas: res.data.data
                        })
                } else {
                    console.log(res);
                }
            }

            )
    }

    pesquisarLoja() {
        this.refresh(this.state.pesquisar);
    }

    pesquisarCep(){
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
        ).catch(e => console.log(e));
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
            descricaoLoja: this.state.descricaoLoja,
            codigoLoja: this.state.codigoLoja,
            cep: this.state.cepLoja
        }

        axios.post(URL, Loja)
            .then(res => {
                if (res.data.httpCode === 201) {
                    this.refresh(this.state.pesquisar);
                }
            }
            ).catch(e => console.log(e));
    }

    removerLoja(id) {
        axios.delete(`${URL}/${id}`)
            .then(res => this.refresh(this.state.pesquisar))
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
        console.log('ID ' + this.state.idLoja);
        axios.put(`${URL}/${this.state.idLoja}`,
            {
                descricaoLoja: this.state.descricaoLoja,
                codigoLoja: this.state.codigoLoja,
                cepLoja: this.state.cepLoja,
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
            <div>
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
            </div>
        );
    }
}