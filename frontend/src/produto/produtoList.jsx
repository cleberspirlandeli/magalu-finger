import React from 'react';
import IconButton from './../template/iconButton.jsx';

export default props => {

    const renderRows = () => {
        const listaProdutos = props.listaProdutos || [];
        return (
            listaProdutos.map(produto => (
                <tr key={produto.id}>
                    <td>{produto.descricao}</td>
                    <td>{produto.codigoProduto}</td>
                    <td>{produto.valorVenda}</td>
                    <td>{produto.quantidade}</td>
                    <td>{produto.quantidadeDescricao}</td>
                    <td>{produto.datacadastro}</td>
                    <td>
                        <IconButton
                            style="warning"
                            icon="pencil"
                            onClick={() => props.selecionarProdutoId(produto)}
                        />
                        <IconButton
                            style="danger"
                            icon="trash-o"
                            onClick={() => props.removerProduto(produto.id)}
                        />
                    </td>
                </tr>
            ))
        );
    }

    return (
        <div className="padding-top">
            <hr />
            <table className="table padding-top">
                <thead>
                    <tr>
                        <td><b>Descrição</b></td>
                        <td><b>Código</b></td>
                        <td><b>Preço Venda</b></td>
                        <td><b>Quantidade</b></td>
                        <td><b>Descrição</b></td>
                        <td><b>datacadastro</b></td>
                        <td className="tableActions"><b>Ações</b></td>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>

    );
}