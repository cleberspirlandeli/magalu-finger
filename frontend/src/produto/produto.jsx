import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import ProdutoSearch from './produtoSearch.jsx';
import ProdutoForm from './produtoForm.jsx';
import ProdutoList from './produtoList.jsx';

const URL = 'http://localhost:3000/api/produto';
var token = null; // = 'token:7d107054c91c4b2dda6b30cfd40a90d15d1811d9707320b8e2a640866447d7e709af55ee8f910b2a41b1229728eb50e13223e69a1ffa7faf8ba1bfa34e652df99e1d1a7767c71775c388b9d872f0cc73417808f443fd12193b7daa9a825af6f152ab9192795cda4c5d3abebc54f3a11d3cd88baeee2b50543db2c42cac588528a1ed8307a47166e2110a73c276fd0297e69c683ab025e9fa942b1cf15ab224f2a1abafcc2ef6a987fb97fd226718749f8864fad7aba9cf0d3fd0fe5421cac38c1f41aeaa6dd6f1804b730ce29ae816a1b867a2eb6f9921468e0baf4dc6b83fe892e712417d212042d93583ade79f1c05aa5aa7c32c598ae9a02af9f63f3bf1c8cbac46e4b0482e3529acbc58e83e97b1117c939bf83bfec47c0903ffc48db7be';
var session = null;

export default class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idProduto: '',
            descricaoProduto: 'Mesa 6 lugares',
            codigoProduto: '123456',
            valorVendaProduto: '',
            quantidadeProduto: '500',
            pesquisar: '',
            editar: false,
            alertError: false,
            alertSuccess: false,
            messageError: '',
            messageSuccess: '',
            listaProdutos: []
        }

        // CAMPOS INPUT
        this.digitarPesquisa = this.digitarPesquisa.bind(this);
        this.digitarDescricao = this.digitarDescricao.bind(this);
        this.digitarCodigo = this.digitarCodigo.bind(this);
        this.digitarValor = this.digitarValor.bind(this);
        this.digitarQuantidade = this.digitarQuantidade.bind(this);

        // INPUT PESQUISAR
        this.refresh = this.refresh.bind(this);
        this.pesquisarLoja = this.pesquisarLoja.bind(this);
        this.limparCampoPesquisa = this.limparCampoPesquisa.bind(this);

        // FORMULÁRIO Loja
        this.getToken = this.getToken.bind(this);
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.removerProduto = this.removerProduto.bind(this);
        this.selecionarProdutoId = this.selecionarProdutoId.bind(this);
        this.editarProduto = this.editarProduto.bind(this);
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
    digitarDescricao(e) {
        this.setState({ ...this.state, descricaoProduto: e.target.value });
    }
    digitarCodigo(e) {
        this.setState({ ...this.state, codigoProduto: e.target.value });
    }
    digitarQuantidade(e) {
        this.setState({ ...this.state, quantidadeProduto: e.target.value });
    }
    digitarValor(e) {
        this.setState({ ...this.state, valorVendaProduto: e.target.value });
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
                            idProduto: '',
                            descricaoProduto: '',
                            codigoProduto: '',
                            valorVendaProduto: '',
                            quantidadeProduto: '',
                            pesquisar: this.state.pesquisar,
                            listaProdutos: res.data.data
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

    pesquisarLoja() {
        this.refresh(this.state.pesquisar);
    }

    limparCampoPesquisa() {
        //this.getToken();
        this.setState(
            {
                ...this.state,
                pesquisar: ''
            }
        );
        this.refresh();
    }

    adicionarProduto() {
        //this.getToken();
        // console.log('====== Adicionar Loja ======');
        // console.log('Nome Produto.........: ' + this.state.descricaoProduto);
        // console.log('Codigo Produto.......: ' + this.state.codigoProduto);
        // console.log('Valor Venda Produto..: ' + this.state.valorVendaProduto);
        // console.log('Quantidade Produto...: ' + this.state.quantidadeProduto);

        const Loja = {
            descricao: this.state.descricaoProduto,
            codigoProduto: this.state.codigoProduto,
            valorVenda: this.state.valorVendaProduto,
            quantidade: this.state.quantidadeProduto
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
                    }
                })
                .catch(e => {
                    console.log(e.response.data.data.message);
                    this.setState({
                        ...this.state,
                        alertError: true,
                        alertSuccess: false,
                        messageSuccess: '',
                        messageError: e.response.data.data.message
                    });
                    // console.log(e.response.data.data.message);
                });
        }).catch(e => {
            this.setState({
                ...this.state,
                alertError: true,
                alertSuccess: false,
                messageSuccess: '',
                messageError: e.response.data.data.message
            });
            // console.log(e.response.data.data.message);
        });
    }

    removerProduto(id) {
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

    selecionarProdutoId(produto) {
        produto.valorVenda = produto.valorVenda.replace('R$', '');
        produto.valorVenda = produto.valorVenda.replace('.', '');
        produto.valorVenda = produto.valorVenda.replace(',', '.')
        //console.log( produto.valorVenda);
        this.setState(
            {
                ...this.state,
                idProduto: produto.id,
                descricaoProduto: produto.descricao,
                codigoProduto: produto.codigoProduto,
                valorVendaProduto: produto.valorVenda.replace('R$', '').replace('.', ''),
                quantidadeProduto: produto.quantidade,
                editar: true
            }
        )
    }

    editarProduto() {
        axios.put(`${URL}/${this.state.idProduto}`,
            {
                descricaoProduto: this.state.descricaoProduto,
                codigoProduto: this.state.codigoProduto,
                valorVendaProduto: this.state.valorVendaProduto,
                ativo: 'S'
            }
        )
            .then(res => {
                this.refresh(this.state.pesquisar)
            }
            )
    }

    limparFormulario() {
        this.setState(
            {
                ...this.state,
                idProduto: '',
                descricaoProduto: '',
                codigoProduto: '',
                valorVendaProduto: '',
                quantidadeProduto: '',
                estadoLoja: '',
                editar: false
            }
        );
    }

    render() {
        return (
            <div>
                <PageHeader
                    name="Produto "
                    small="Descrição"
                />

                <ProdutoSearch
                    pesquisar={this.state.pesquisar}
                    digitarPesquisa={this.digitarPesquisa}

                    pesquisarLoja={this.pesquisarLoja}
                    limparCampoPesquisa={this.limparCampoPesquisa}
                />

                <ProdutoForm
                    alertError={this.state.alertError}
                    alertSuccess={this.state.alertSuccess}
                    messageError={this.state.messageError}
                    messageSuccess={this.state.messageSuccess}

                    idProduto={this.state.idProduto}
                    descricaoProduto={this.state.descricaoProduto}
                    codigoProduto={this.state.codigoProduto}
                    valorVendaProduto={this.state.valorVendaProduto}
                    quantidadeProduto={this.state.quantidadeProduto}
                    editar={this.state.editar}

                    digitarDescricao={this.digitarDescricao}
                    digitarCodigo={this.digitarCodigo}
                    digitarValor={this.digitarValor}
                    digitarQuantidade={this.digitarQuantidade}

                    adicionarProduto={this.adicionarProduto}
                    editarProduto={this.editarProduto}
                    limparFormulario={this.limparFormulario}
                />

                <ProdutoList
                    listaProdutos={this.state.listaProdutos}

                    selecionarProdutoId={this.selecionarProdutoId}
                    removerProduto={this.removerProduto}
                />
            </div>
        );
    }
}