import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import ProdutoSearch from './produtoSearch.jsx';
import ProdutoForm from './produtoForm.jsx';
import ProdutoList from './produtoList.jsx';

const URL = 'http://localhost:3000/api/produto';


export default class Produto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idProduto: '',
            descricaoProduto: '',
            codigoProduto: '',
            valorVendaProduto: '',
            quantidadeProduto: '',
            pesquisar: '',
            editar: false,
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
        this.adicionarProduto = this.adicionarProduto.bind(this);
        this.removerProduto = this.removerProduto.bind(this);
        this.selecionarProdutoId = this.selecionarProdutoId.bind(this);
        this.editarProduto = this.editarProduto.bind(this);
        this.limparFormulario = this.limparFormulario.bind(this);
        
        this.refresh();
    }

    //Métodos - Funções
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
        const search = pesquisa ? `?q=${pesquisa}` : '';

        // console.log('URL ', `${URL}${search}`);
        axios.get(`${URL}${pesquisa}`)
            .then(res => {
                if (res.data.httpCode === 200) {
                    this.setState(
                        {
                            ...this.state,
                            idProduto: '',
                            descricaoProduto: '',
                            codigoProduto: '',
                            valorVendaProduto: '',
                            pesquisar: this.state.pesquisar,
                            listaProdutos: res.data.data
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

    limparCampoPesquisa() {
        this.setState(
            {
                ...this.state,
                pesquisar: ''
            }
        );
        this.refresh();
    }

    adicionarProduto() {
        // console.log('====== Adicionar Loja ======');
        // console.log('Nome Produto.........: ' + this.state.descricaoProduto);
        // console.log('Codigo Produto.......: ' + this.state.codigoProduto);
        // console.log('Valor Venda Produto..: ' + this.state.valorVendaProduto);
        // console.log('Quantidade Produto...: ' + this.state.quantidadeProduto);

        const Loja = {
            descricaoProduto: this.state.descricaoProduto,
            codigoProduto: this.state.codigoProduto,
            valorVenda: this.state.valorVendaProduto,
            quantidade: this.state.quantidadeProduto
        }
        let urlId = `${URL}/idColaborador`;
        axios.post(urlId, Loja)
            .then(res => {
                if (res.data.httpCode === 201) {
                    this.refresh(this.state.pesquisar);
                }
            }
            ).catch(e => console.log(e));
    }

    removerProduto(id) {
        axios.delete(`${URL}/${id}`)
            .then(res => this.refresh(this.state.pesquisar))
    }

    selecionarProdutoId(produto) {
        produto.valorVenda = produto.valorVenda.replace('R$','');
        produto.valorVenda = produto.valorVenda.replace('.','');
        produto.valorVenda = produto.valorVenda.replace(',','.')
        console.log( produto.valorVenda);
        this.setState(
            {
                ...this.state,
                idProduto: produto.id,
                descricaoProduto: produto.descricao,
                codigoProduto: produto.codigoProduto,
                valorVendaProduto: produto.valorVenda.replace('R$','').replace('.',''),
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